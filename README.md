# Personal website

The research website of Cristobal Rodero, Research Associate at the National Heart and
Lung Institute, Imperial College London. It is a draft: GitHub Pages is off until the
content is approved, and `OPEN_QUESTIONS.md` lists what is still missing.

The design follows the new CEMRG group site (Astro,
Archivo and Azeret Mono, rules and space in place of cards) with its own colour and no
chart-paper grid.

## Running it

Node 24 is required; the version is pinned in `.nvmrc`.

```
nvm use
npm install
npm run dev        # http://localhost:4321/personal-website/
npm run build      # writes the site to dist/
npm run check      # type-checks every page and content file
```

## Updating the publication list

```
npm run publications          # fetch from OpenAlex and rewrite src/data/publications.json
npm run publications -- --dry # print the report only
```

Run it after each new paper or dataset and read the report it prints. Never edit
`publications.json` by hand, because the next run overwrites it. Instead:

- a wrong attribution goes in `src/data/publications-ignore.yml`, with a reason;
- a missing work, or a correction to a fetched one (a category, say), goes in
  `src/data/publications-extra.yml`.

## Where things are

```
src/content/research/    one Markdown file per line of research
src/content/engagement/  one Markdown file per outreach, media or art item
src/data/                publications (generated), code.ts, cv.ts
src/lib/site.ts          name, role, profile links, navigation
src/styles/global.css    every colour, size and font, as tokens
src/assets/figures/      figures from the papers, each credited in its caption
scripts/                 the publication fetcher
```

A research page lists papers and datasets by DOI in its front matter. A DOI that is not
in `publications.json` stops the build, so a paper cannot silently drop off a page.

## Deploying

`.github/workflows/site.yml` builds the site on every push to `main`. Deploying is
manual for now; the steps to switch GitHub Pages on are at the top of that file. The
site is served under `/personal-website/`. For a custom domain, change `site` and
`base` in `astro.config.mjs`.

Every page carries `noindex` until launch, set by `NOINDEX_UNTIL_LAUNCH` in
`src/layouts/SiteLayout.astro`.
