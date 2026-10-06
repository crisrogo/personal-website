import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/*
 * Two collections, both Markdown with typed front matter. A malformed entry
 * stops the build with a named error, which is better than a page that
 * quietly renders wrong.
 */

// One page per line of research.
const research = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// One sentence, shown on the home page and the research index.
			summary: z.string(),
			order: z.number(),
			figure: image().optional(),
			figureAlt: z.string().optional(),
			// The caption must credit the source and its licence.
			figureCaption: z.string().optional(),
			// DOIs of the papers and datasets this line rests on. The page looks
			// each one up in publications.json, so a DOI missing there fails the
			// build and cannot silently drop off the page.
			works: z.array(z.string()).default([]),
		}),
});

// Public engagement, outreach, media and art.
const engagement = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/engagement' }),
	schema: () =>
		z.object({
			title: z.string(),
			date: z.date(),
			// Shown when the exact date is not known, e.g. "2023".
			dateLabel: z.string().optional(),
			kind: z.enum(['writing', 'exhibition', 'media', 'art', 'talk', 'schools']),
			venue: z.string(),
			role: z.string(),
			links: z.array(z.object({ url: z.url(), text: z.string() })).default([]),
			// A draft is built but never listed, for entries waiting on a fact.
			draft: z.boolean().default(false),
		}),
});

export const collections = { research, engagement };
