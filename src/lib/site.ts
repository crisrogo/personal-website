/**
 * Facts about Cristobal that more than one page prints, kept in one place.
 *
 * Every value here is sourced (see OPEN_QUESTIONS.md). Anything not yet known
 * is null, and the pages show a visible placeholder for it, never a guess.
 */

export const PERSON = {
	name: 'Cristobal Rodero',
	// From the ORCID employment record, current since 2023.
	role: 'Research Associate',
	department: 'National Heart and Lung Institute',
	institution: 'Imperial College London',
	group: { name: 'Cardiac Electro-Mechanics Research Group (CEMRG)', url: 'https://cemrg.co.uk' },
	// Which address to publish is undecided. See OPEN_QUESTIONS.md.
	email: null as string | null,
};

/** Profiles, in the order they are listed. Each one is public already. */
export const PROFILES = [
	{ label: 'ORCID', href: 'https://orcid.org/0000-0001-7921-7840' },
	{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=szemL4kAAAAJ' },
	{ label: 'GitHub', href: 'https://github.com/crisrogo' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/cristobalrodero/' },
];

export const NAV = [
	{ label: 'Research', href: '/research/' },
	{ label: 'Publications', href: '/publications/' },
	{ label: 'Data and code', href: '/data-and-code/' },
	{ label: 'Engagement', href: '/engagement/' },
	{ label: 'CV', href: '/cv/' },
	{ label: 'About', href: '/about/' },
];

/**
 * Prefix a site path with the base the site is served under. On GitHub Pages
 * that is /personal-website; on a custom domain it would be /. Set it once, in
 * astro.config.mjs, and every link follows.
 */
export function link(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path}`;
}
