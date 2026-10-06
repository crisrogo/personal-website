#!/usr/bin/env node
/**
 * Build src/data/publications.json from OpenAlex.
 *
 * Run it by hand whenever a paper or dataset comes out:
 *
 *     nvm use
 *     npm run publications            # same as: node scripts/fetch-publications.mjs
 *     npm run publications -- --dry   # print the report, write nothing
 *
 * What it does, in order:
 *   1. Fetches every work OpenAlex attributes to the author records below.
 *   2. Drops anything listed in src/data/publications-ignore.yml.
 *   3. Sorts each work into one category (article, conference, preprint,
 *      abstract, dataset, thesis), and drops errata and posters.
 *   4. Removes duplicates: a preprint whose title matches a published paper,
 *      and the second DOI of each Zenodo record (every Zenodo upload has one
 *      DOI for "all versions" and one for the current version), and asks
 *      Zenodo for the "all versions" DOI of each dataset.
 *   5. Adds anything in src/data/publications-extra.yml, which always wins.
 *   6. Writes the result, newest first, and prints a report.
 *
 * OpenAlex sometimes attributes another person's paper to an author record.
 * Check the report after every run, and add a wrong work to the ignore file
 * rather than editing the JSON, which the next run would overwrite.
 *
 * Set OPENALEX_MAILTO in the environment to join OpenAlex's "polite pool" with
 * a contact address. It is optional and nothing is sent when it is unset.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { load as loadYaml } from 'js-yaml';

// ---- Settings you might change --------------------------------------------

// The OpenAlex author records that are Cristobal. A second record,
// A5109717156, was merged into this one and now returns 404.
const AUTHOR_IDS = ['A5011859160'];

// How the site prints your own name in author lists, whatever spelling the
// publisher used.
const MY_NAME = 'Cristobal Rodero';

const OUT_FILE = new URL('../src/data/publications.json', import.meta.url);
const IGNORE_FILE = new URL('../src/data/publications-ignore.yml', import.meta.url);
const EXTRA_FILE = new URL('../src/data/publications-extra.yml', import.meta.url);

// OpenAlex work types that never appear on the site.
// Milliseconds between requests to Zenodo, which can refuse quick bursts.
const ZENODO_PAUSE_MS = 1000;

const DROPPED_TYPES = new Set(['erratum', 'other', 'paratext', 'retraction', 'peer-review']);

// Acronyms restored after an all-capitals abstract title is put in sentence case.
const ACRONYMS = ['AF', 'ATP', 'CRT', 'ECG', 'MRI', 'CT', 'LV', 'RV', 'HCM'];

// ---- Helpers ----------------------------------------------------------------

const dryRun = process.argv.includes('--dry');

const normalise = (title) =>
	title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();

const stripTags = (text) => text.replace(/<[^>]+>/g, '');

/** Meeting abstracts arrive in capitals with a poster code ("PO-05-017 A CONSENSUS ..."). */
function tidyTitle(raw) {
	let title = stripTags(raw).replace(/^PO-[\d-]+\s+/, '').trim();
	const letters = title.replace(/[^A-Za-z]/g, '');
	const upper = letters.replace(/[^A-Z]/g, '');
	if (letters.length > 0 && upper.length / letters.length > 0.8) {
		title = title.toLowerCase();
		title = title.charAt(0).toUpperCase() + title.slice(1);
		for (const acronym of ACRONYMS) {
			title = title.replace(new RegExp(`\\b${acronym.toLowerCase()}\\b`, 'g'), acronym);
		}
	}
	return title;
}

/**
 * A conference abstract published in a journal supplement. Two signatures:
 * a Heart Rhythm poster code in the title, and the Oxford supplement DOIs
 * (euac053.402, ehae666.579), which carry a dot after the issue code.
 */
function isAbstract(work, doi) {
	if (/^PO-[\d-]+\s/.test(work.title ?? '')) return true;
	if (/^10\.1093\/[a-z]+\/[a-z]+\d+\.\d+$/.test(doi)) return true;
	return false;
}

function categorise(work, doi) {
	if (work.type === 'dataset') return 'dataset';
	if (work.type === 'dissertation') return 'thesis';
	if (work.type === 'preprint') return 'preprint';
	if (isAbstract(work, doi)) return 'abstract';
	if (work.type === 'conference-paper' || work.type === 'book-chapter') return 'conference';
	return 'article';
}

// Zenodo refuses requests that carry Node's default user agent.
const USER_AGENT = 'personal-website-publications/1.0 (+https://github.com/crisrogo/personal-website)';

async function fetchJson(url) {
	const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
	if (!response.ok) throw new Error(`${new URL(url).host} answered ${response.status} for ${url}`);
	return response.json();
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Space out the requests to Zenodo and retry once, in case it turns one away. */
async function fetchZenodoRecord(record) {
	for (let attempt = 1; attempt <= 2; attempt++) {
		await pause(ZENODO_PAUSE_MS * attempt);
		try {
			return await fetchJson(`https://zenodo.org/api/records/${record}`);
		} catch (error) {
			if (attempt === 2) throw error;
		}
	}
}

async function fetchWorks(authorId) {
	const works = [];
	let cursor = '*';
	const mailto = process.env.OPENALEX_MAILTO ? `&mailto=${encodeURIComponent(process.env.OPENALEX_MAILTO)}` : '';
	while (cursor) {
		const url = `https://api.openalex.org/works?filter=authorships.author.id:${authorId}&per-page=200&cursor=${encodeURIComponent(cursor)}${mailto}`;
		const page = await fetchJson(url);
		works.push(...page.results);
		cursor = page.meta.next_cursor;
	}
	return works;
}

async function readYaml(fileUrl) {
	if (!existsSync(fileUrl)) return [];
	return loadYaml(await readFile(fileUrl, 'utf8')) ?? [];
}

// ---- Main -------------------------------------------------------------------

async function main() {
	console.log('='.repeat(60));
	console.log(`Fetching works for ${AUTHOR_IDS.join(', ')} from OpenAlex`);
	console.log('='.repeat(60));

	const raw = (await Promise.all(AUTHOR_IDS.map(fetchWorks))).flat();
	console.log(`OpenAlex returned ${raw.length} works`);

	const ignore = await readYaml(IGNORE_FILE);
	const ignoredDois = new Set(ignore.map((entry) => entry.doi.toLowerCase()));
	const extra = await readYaml(EXTRA_FILE);

	const report = { ignored: [], droppedType: [], preprintsPublished: [], zenodoDuplicates: [], zenodoUnresolved: [] };
	let items = [];

	for (const work of raw) {
		const doi = (work.doi ?? '').replace('https://doi.org/', '').toLowerCase();
		if (doi && ignoredDois.has(doi)) {
			report.ignored.push(work.title);
			continue;
		}
		if (DROPPED_TYPES.has(work.type)) {
			report.droppedType.push(`${work.type}: ${work.title}`);
			continue;
		}

		const authors = work.authorships.map((a) => {
			const me = AUTHOR_IDS.some((id) => (a.author.id ?? '').endsWith(id));
			return { name: me ? MY_NAME : a.author.display_name, ...(me && { me: true }) };
		});
		const position = authors.findIndex((a) => a.me) + 1;
		const source = work.primary_location?.source;
		// A Zenodo DOI is a Zenodo record, whichever repository OpenAlex found it through.
		const venue = doi.includes('zenodo') ? 'Zenodo' : source?.display_name ?? null;

		items.push({
			title: tidyTitle(work.title ?? ''),
			authors,
			position,
			year: work.publication_year,
			date: work.publication_date,
			venue,
			doi: doi || null,
			url: doi ? `https://doi.org/${doi}` : work.primary_location?.landing_page_url ?? work.id,
			category: categorise(work, doi),
			openAccess: Boolean(work.open_access?.is_oa),
			license: work.best_oa_location?.license ?? null,
		});
	}

	// A preprint is shown only until the paper it became is out.
	const publishedTitles = new Set(items.filter((i) => i.category !== 'preprint').map((i) => normalise(i.title)));
	items = items.filter((item) => {
		if (item.category === 'preprint' && publishedTitles.has(normalise(item.title))) {
			report.preprintsPublished.push(item.title);
			return false;
		}
		return true;
	});

	// Zenodo gives each upload a concept DOI (all versions) and a version DOI,
	// and OpenAlex may list either or both. The same pair can also arrive
	// through a university repository, so the title is the key. Keep one entry
	// per title, remember every DOI seen for it (so a page can cite any of
	// them), then ask Zenodo for the concept DOI, which always resolves to the
	// newest version. If Zenodo cannot be reached, the lowest record number is
	// kept, which is the concept DOI whenever OpenAlex listed both.
	const recordNumber = (doi) => Number((doi ?? '').match(/zenodo\.(\d+)/)?.[1] ?? Infinity);
	const datasets = new Map();
	for (const item of items.filter((i) => i.category === 'dataset')) {
		const key = normalise(item.title);
		const kept = datasets.get(key);
		if (!kept) {
			datasets.set(key, { ...item, altDois: [item.doi].filter(Boolean) });
			continue;
		}
		report.zenodoDuplicates.push(item.title);
		if (item.doi) kept.altDois.push(item.doi);
		if (recordNumber(item.doi) < recordNumber(kept.doi)) {
			kept.doi = item.doi;
			kept.url = item.url;
		}
	}
	for (const item of datasets.values()) {
		const record = (item.doi ?? '').match(/zenodo\.(\d+)/)?.[1];
		if (!record) continue;
		try {
			const zenodo = await fetchZenodoRecord(record);
			if (zenodo.conceptdoi) {
				const concept = zenodo.conceptdoi.toLowerCase();
				if (!item.altDois.includes(concept)) item.altDois.push(concept);
				item.doi = concept;
				item.url = `https://doi.org/${concept}`;
			}
		} catch (error) {
			report.zenodoUnresolved.push(`${item.title} (${error.message})`);
		}
	}
	items = [...items.filter((i) => i.category !== 'dataset'), ...datasets.values()];

	// Hand-entered works win. An entry whose DOI matches a fetched work only
	// changes the fields it gives (a category, say); any other entry is added
	// as a new work.
	for (const entry of extra) {
		const doi = (entry.doi ?? '').toLowerCase();
		const fetched = doi && items.find((i) => i.doi === doi);
		if (fetched) {
			Object.assign(fetched, entry, { doi });
		} else {
			items.push({ openAccess: false, license: null, position: 0, ...entry, doi: doi || null });
		}
	}

	items.sort((a, b) => (b.date ?? `${b.year}`).localeCompare(a.date ?? `${a.year}`));

	// Report
	const counts = {};
	for (const item of items) counts[item.category] = (counts[item.category] ?? 0) + 1;
	console.log('\nKept, by category:');
	for (const [category, count] of Object.entries(counts)) console.log(`  ${category.padEnd(12)} ${count}`);
	console.log(`  ${'total'.padEnd(12)} ${items.length}`);
	console.log(`\nFirst author on ${items.filter((i) => i.position === 1 && i.category === 'article').length} journal articles`);

	const section = (label, list) => {
		if (!list.length) return;
		console.log(`\n${label} (${list.length}):`);
		for (const line of list) console.log(`  - ${line}`);
	};
	section('Ignored by publications-ignore.yml', report.ignored);
	section('Dropped by type', report.droppedType);
	section('Preprints replaced by their published paper', report.preprintsPublished);
	section('Second DOI of a Zenodo record', report.zenodoDuplicates);
	section('Zenodo records whose concept DOI could not be fetched', report.zenodoUnresolved);
	section('Added or corrected by hand in publications-extra.yml', extra.map((e) => e.title ?? `${e.doi}, fields changed: ${Object.keys(e).filter((k) => k !== 'doi').join(', ')}`));

	if (dryRun) {
		console.log('\n--dry given, nothing written.');
		return;
	}
	await writeFile(OUT_FILE, `${JSON.stringify(items, null, '\t')}\n`);
	console.log(`\nWrote ${items.length} works to src/data/publications.json`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
