# Open questions

What the site still needs from Cristobal, the facts it rests on, and the decisions taken
for him that he may want to reverse. Every dashed "To fill" frame on the site has an
entry here. Written on 6 October 2026 with the first draft.

The repository is public, but GitHub Pages is off, so the site is not served anywhere
yet. Review it locally with `npm run dev`.

## Needed before the site goes live

| What | Where it shows | Why it matters |
| --- | --- | --- |
| The email address to publish (Imperial, personal, or none) | About page; `PERSON.email` in `src/lib/site.ts` | Organisers and collaborators need a way to reach you that does not go through LinkedIn |
| Your research statement. The home page line "I build cohorts of virtual hearts from patient images, and I study how far their predictions can be trusted" and the research page lead about trusting a model are my wording | Home page, Research page | It is the sentence a panel remembers. Rewrite it in your own words or confirm it |
| Current work and what comes next, in two or three sentences | Research page | A fellowship panel judges where you are going, not only where you have been. Work that is not yet public is left out; say which projects can be named |
| Development of others: students supervised or co-supervised and where they went next, teaching, tutorials, mentoring | CV page | R4RI gives this module the same weight as research. Nothing public covers it, so it is the largest gap |
| Funding, fellowships, travel awards and prizes, with your role | CV page | ORCID lists one entry: "Personalised In-Silico Cardiology", European Commission, September 2017 to February 2022. The 2022 correction to your PLoS Computational Biology paper says you were funded by Marie Skłodowska-Curie grant agreement 764738. Is that this entry, and should the CV name it? |
| Other journals you review for, sessions or workshops organised, committees, and group work such as the new CEMRG website | CV page | ORCID records one review, for the Journal of Visualized Experiments |
| A PDF of the full CV | CV page | Many forms and organisers still ask for one |
| A larger photograph (at least 1500 pixels wide) and its credit | About page | The current one is the 500 by 500 pixel CEMRG portrait, too small for a poster. Is it still a good likeness? |
| Public talks, school visits, open days, festivals, patient involvement, press | Engagement page | Only five items are public. Anything with a date, a place and your role counts |

When all of that is settled: switch on Pages (the steps are at the top of
`.github/workflows/site.yml`) and set `NOINDEX_UNTIL_LAUNCH` to `false` in
`src/layouts/SiteLayout.astro`.

## Facts to confirm

- **PhD dates.** ORCID gives the PhD as 2018 to 2022, beside "Research Worker" at King's
  from 2017. The CEMRG biography says you "started his PhD in 2017". The CV page follows
  ORCID. Which is right?
- **Spelling of your name.** ORCID, GitHub and CEMRG use "Cristobal"; OpenAlex, King's and
  several publishers use "Cristóbal". The site uses "Cristobal" everywhere. Is that what
  you want?
- **Pronouns.** The biographies on the About page say "he", taken from your CEMRG and
  King's biographies. Confirm.
- **SMILE-UHURA challenge preprint** (arXiv 2411.09593, 2024, author 25 of 48). OpenAlex
  attributes it to you, but it is not in your ORCID and is about vessel segmentation in
  7T angiograms. It is held back in `src/data/publications-ignore.yml`. Delete that
  entry if it is yours.
- **GABA-edited MRS challenge** (bioRxiv 2023, MAGMA 2024). It is in your ORCID, so it is
  listed, but it sits outside your field. Keep it?
- **Glass hearts.** Was the entry submitted to the WCCM-ECCOMAS 2026 Arts and Science
  competition, and was it selected or shown? The repository withholds the renders until
  the papers are out; the hypertrophic cardiomyopathy paper is now published, so one
  render would make the best image on the engagement page.
- **Heartificial Intelligence.** The Science Gallery page gives "7 May 2023". Was that the
  opening? What did you contribute: data, a heart model, workshops with the ECHO Teens?
- **Imperial profile.** I found no Imperial staff page for you. The King's page is out of
  date (it still says Research Assistant). Do you want either linked?
- **X account.** The King's page lists @TovRodero. Do you want it, or a Bluesky or
  Mastodon account, linked?
- **3D-printed heart slices** (`IC_projects/3D_printing`). If these were made for outreach
  or teaching, they belong on the engagement page.
- **SSM viewer.** `crisrogo.github.io/tred-remit-ssm-viewer` is already public. It would be
  a strong interactive item on the data and code page, but it shows TRED-HF and REMIT
  shapes that I believe are unpublished. Should it be linked, or taken down until the
  paper is out?

## Suggestions outside the site

These cost little and help the same audiences as the site.

1. **Add a licence to the six public code repositories.** None has one, which means
   nobody may legally reuse the code. It undercuts the open-science claim the site
   makes. MIT or BSD-3-Clause would suit code; check the Zenodo records carry CC BY.
2. **Add READMEs to `ISCTs_review` and `MPP`.** Both are linked from the data and code
   page and open on a bare file list.
3. **Bring ORCID up to date.** UKRI and other funders pull publications from ORCID.
   Of the 60 works on the site, 26 are missing from it, including your 2026 first-author
   paper in the Journal of Molecular and Cellular Cardiology, the 2026 npj Digital
   Medicine paper, and 8 of the 10 datasets. ORCID can import them from Crossref and
   DataCite in a few clicks. Adding a short biography, keywords and, once live, this
   site's address would also help.
4. **Consider your own domain**, for example cristobalrodero.com. A GitHub Pages address
   is tied to the account, and a domain survives any change of job or host. Pointing a
   domain at Pages needs two settings: `site` and `base` in `astro.config.mjs`, and the
   custom domain in the repository's Pages settings.
5. **Consider a Spanish version** of the home and engagement pages, if you do outreach or
   apply for funding in Spain. It is one more set of pages, not a redesign.

## Decisions taken for you

All of these are easy to reverse.

- **Colour.** One accent, `#3e4989`, from the viridis colour map, with greys tinted to
  match. It replaces the CEMRG crimson so the site reads as yours. It is one token in
  `src/styles/global.css`. Every text colour passes WCAG AA, checked by calculation.
- **No logo.** Your name is the mark in the header.
- **No citation counts, h-index or journal impact factors.** The publication page links to
  Google Scholar for anyone who wants them. Your most cited paper (EHJ 2020, 936 citations
  in OpenAlex) has you as author 4 of 39, so leading with numbers would overstate your
  role in it.
- **Author lists are shortened around your name**, so your position is always visible:
  the first three authors, you, and the last author.
- **Figures** come from three of your open-access papers, credited in each caption and
  reused under CC BY 4.0: Rodero et al. 2021 (PLoS Computational Biology, figure 2, also
  cropped to one row for the home page), Rodero et al. 2022 (Annals of Biomedical
  Engineering, figure 1) and Rodero et al. 2026 (Journal of Molecular and Cellular
  Cardiology, figure 1).
- **Frontiers for Young Minds** articles are left out of "first-author articles" and shown
  under engagement; they stay in the full list.
- **Meeting abstracts** are listed apart from papers, and errata and posters are dropped.
- **The CEIG 2016 paper** is filed as a conference paper; OpenAlex calls it a journal
  article. The correction is in `src/data/publications-extra.yml`.
- **Biographies are in the third person**, so they can be pasted into a programme. The
  rest of the site is in the first person, as R4RI asks.
- **The CV narrative follows the four R4RI modules.** The counts in it are computed from
  the publication list, so they cannot drift.
- **One claim not yet made:** all seven of your first-author research papers since 2021
  are open access, six of them under CC BY. That is worth a line on the data and code
  page if you want it.

## Where each fact comes from

| Fact | Source |
| --- | --- |
| Positions, education, the 2017 to 2022 funding entry, the JoVE review | ORCID 0000-0001-7921-7840, read 6 October 2026 |
| Publications and datasets | OpenAlex author A5011859160, through `scripts/fetch-publications.mjs` |
| Supervisors, the joint MSc, the PhD topic | Your CEMRG biography, `cemrg-website-2026/src/content/members/cristobal-rodero.md` |
| Every number on the research pages | The abstracts of the papers cited on each page |
| Heartificial Intelligence | Science Gallery London exhibit page; King's College London news, 21 July 2023 |
| The quotation about trust in computational medicine | Imperial College London news, 30 June 2023 |
| Glass hearts | The README of `crisrogo/cardiac-blender-art` |
| Open-access status and licences | OpenAlex, checked for each first-author paper |
