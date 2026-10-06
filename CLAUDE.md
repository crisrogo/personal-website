# Notes for working on this site

Read `OPEN_QUESTIONS.md` before adding content. It lists what is missing, what is
deliberately left blank, and the source of every fact on the site.

- **Node 24** (`nvm use`). The machine's default Node is 20, which breaks Astro.
- **British spelling, no em dashes**, in prose, page titles and code comments.
- **Never invent content.** If a fact is missing, use the `Placeholder` component and
  add the gap to `OPEN_QUESTIONS.md`. Every number in the research text must trace to
  the abstract of the paper cited beside it.
- **Publications are generated.** Never edit `src/data/publications.json`; run
  `npm run publications` and use the ignore and extra YAML files.
- **Internal links go through `link()`** in `src/lib/site.ts`, because the site lives
  under `/personal-website/` on GitHub Pages.
- **Figures from papers** must be under an open licence, and the caption must credit the
  paper and the licence.
- **No cards with shadows, no stat rows, no citation metrics, no gradient text, no
  decorative accent bars.** Rules and space carry the structure, as on the CEMRG site.
- `compressHTML` is off in `astro.config.mjs`, so a line break inside inline markup
  prints as a space. Keep comma-separated lists, like author lists, on one line.
