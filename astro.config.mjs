// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The site is served from GitHub Pages as a project site, so every page lives
// under /personal-website/. With a custom domain, set `site` to the domain and
// `base` to '/'. Every internal link goes through link() in src/lib/site.ts,
// so nothing else needs to change.
export default defineConfig({
	site: 'https://crisrogo.github.io',
	base: '/personal-website',
	trailingSlash: 'always',
	output: 'static',
	// Astro's HTML compression drops the space where a line of text in a
	// template ends before a link or an expression ("on GitHub" became
	// "onGitHub"). The pages are small, so keep the whitespace as written.
	compressHTML: false,
	vite: {
		plugins: [tailwindcss()],
	},
});
