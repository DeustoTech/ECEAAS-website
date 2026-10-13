# ECEAAS Website

> **Cognitive Environments for Autonomous, Active and Healthy Aging**  
> (Spanish: *Entornos Cognitivos para el Envejecimiento Autónomo, Activo y Saludable*)

Official website of the ECEAAS project, funded by the Spanish State Plan for Scientific, Technical and Innovation Research (Knowledge Generation Projects 2024).

`PID2024-158490OB-C31 · PID2024-158490OB-C32 · PID2024-158490OB-C33`

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.5 | Main framework (Composition API) |
| [Vite](https://vite.dev/) | ^8 | Build tool + dev server |
| [Vue Router 4](https://router.vuejs.org/) | ^4.6 | SEO-friendly routes with history mode |
| [vue-i18n](https://vue-i18n.intlify.dev/) | ^11 | ES / EN internationalization |
| Vanilla CSS | — | Styling (design tokens, no external frameworks) |
| Docker + nginx | — | Containerized production build |

---

## Project structure

```
web/
├── public/
│   ├── assets/             ← Images (team photos, logos)
│   └── 404.html            ← SPA fallback for static hosting
├── src/
│   ├── assets/styles/
│   │   ├── main.css        ← Design tokens, reset, typography
│   │   ├── components.css  ← Reusable component styles
│   │   └── sections.css    ← Per-view / per-section styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue   ← Fixed header + nav + ES/EN toggle
│   │   │   └── AppFooter.vue   ← Dark footer
│   │   ├── legal/
│   │   │   └── LegalDocument.vue
│   │   ├── ui/
│   │   │   ├── ObjectiveCard.vue
│   │   │   ├── SubprojectCard.vue
│   │   │   ├── SubprojectBlock.vue   ← per-subproject animation
│   │   │   ├── TeamMemberCard.vue
│   │   │   ├── PublicationCard.vue
│   │   │   └── WpMatrix.vue
│   │   ├── decor/                    ← Bubbles, HeroOrbit
│   │   └── sections/
│   │       ├── PageHero.vue
│   │       └── UniversityMarquee.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ProjectView.vue
│   │   ├── TeamView.vue
│   │   ├── PublicationsView.vue   ← reads public/data/publications.json
│   │   ├── LegalNoticeView.vue
│   │   ├── PrivacyPolicyView.vue
│   │   └── CookiePolicyView.vue
│   ├── router/index.js     ← Routes + SEO meta + locale guard
│   ├── i18n/
│   │   ├── index.js        ← vue-i18n setup
│   │   └── locales/
│   │       ├── es.json     ← All Spanish texts
│   │       └── en.json     ← All English texts
│   ├── App.vue
│   └── main.js
├── docs/                   ← publications JSON Schema + sample file
├── scripts/                ← validate-publications.mjs
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── index.html
├── vite.config.js
└── README.md
```

---

## Routes (SEO-friendly)

| URL | View | Language |
|---|---|---|
| `/` | Redirect to `/es/` | — |
| `/es/` | Home | Spanish |
| `/es/proyecto` | Project | Spanish |
| `/es/equipo` | Team | Spanish |
| `/es/publicaciones` | Publications | Spanish |
| `/es/aviso-legal` | Legal notice | Spanish |
| `/es/privacidad` | Privacy policy | Spanish |
| `/es/cookies` | Cookie policy | Spanish |
| `/en/` | Home | English |
| `/en/project` | Project | English |
| `/en/team` | Team | English |
| `/en/publications` | Publications | English |
| `/en/legal-notice` | Legal notice | English |
| `/en/privacy-policy` | Privacy policy | English |
| `/en/cookies` | Cookie policy | English |

---

## Local development

```bash
npm install
npm run dev
```

The app is served at `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

---

## Docker

Run these commands from the `web/` folder.

```bash
# Production (nginx) → http://localhost:8080  (change with WEB_PORT)
docker compose up -d --build

# Development (Vite with hot reload) → http://localhost:5173
docker compose --profile dev up dev
```

The `Dockerfile` has four stages: `deps`, `dev`, `build` and `prod`. `nginx.conf` rewrites unknown paths to `index.html` (SPA history mode) and caches `/assets/` for one year.

---

## Publications — upload protocol

The *Publications* page is generated from **one JSON file**:

```
public/data/publications.json
```

The file is an array in **[CSL-JSON](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html)**
(Citation Style Language), the standard bibliographic exchange format used by Zotero, Mendeley,
EndNote, Crossref, Pandoc and most reference managers. Anything those tools export can be pasted in
as-is. ECEAAS-specific data (subproject, work package, PDF…) goes in the standard `custom` object.

No code change is needed to publish: edit the JSON, validate, commit.

---

### 1. Quick path (recommended): export from Zotero / Mendeley

1. Put the new references in a collection.
2. Export it as **CSL JSON** (Zotero: *right-click collection → Export Collection… → CSL JSON*).
3. Copy the new items into the array in `public/data/publications.json`.
4. Add the `custom` block (section 3) to every new item.
5. Validate (section 5), preview (`npm run dev`) and open a pull request.

If you only have a DOI, you can fetch the CSL-JSON straight from Crossref:

```bash
curl -sLH "Accept: application/vnd.citationstyles.csl+json" https://doi.org/10.1234/example
```

> Reference managers add helper fields (`id` like `http://zotero.org/…`, `key`, `accessed`…). The `id`
> **must** be rewritten as a short unique key, e.g. `casino2026cognitive` (letters, digits, `_ . : -`).

---

### 2. Minimal item

```json
{
  "id": "casino2026cognitive",
  "type": "article-journal",
  "title": "A cognitive framework for ambient assisted living",
  "author": [
    { "family": "Casino", "given": "Fran" },
    { "family": "Martínez-Ballesté", "given": "Antoni" }
  ],
  "issued": { "date-parts": [[2026, 3, 12]] },
  "container-title": "Journal of Example Studies",
  "volume": "12",
  "issue": "3",
  "page": "101-118",
  "DOI": "10.1234/example.2026.0001",
  "custom": { "subproject": ["COG"], "wp": ["WP5"], "openAccess": true }
}
```

More complete examples (journal, conference, thesis) are in
[`publications.example.json`](docs/publications.example.json). Their ids start with `example-`; the
validator rejects those ids in the real file so sample data can never be published by accident.

---

### 3. Fields

#### Required

| Field | Format | Notes |
|---|---|---|
| `id` | string `[A-Za-z0-9_.:-]+` | Unique short key. |
| `type` | see *Types* | Controls the label and the BibTeX type. |
| `title` | string | Plain text, no HTML. |
| `author` | `[{ "family", "given" }]` or `[{ "literal" }]` | At least one (or `editor`). Datasets / software / web pages may omit it. |
| `issued` | `{ "date-parts": [[YYYY, MM?, DD?]] }` | Numbers, not strings. `{ "literal": "2026" }` is accepted as a fallback. |

#### Recommended

| Field | Format | Notes |
|---|---|---|
| `container-title` | string | Journal, proceedings or book title. |
| `event-title`, `event-place` | string | Conferences. |
| `volume`, `issue`, `page` | string | `page` as `101-118`. |
| `publisher`, `publisher-place` | string | Books, theses, reports. |
| `DOI` | `10.xxxx/…` | **Bare DOI**, without `https://doi.org/`. Must be unique. |
| `URL` | https URL | Landing page if there is no DOI. |
| `abstract` | string | Plain text; shown in a collapsible block. |
| `keyword` | string | Comma-separated. Used by the search box. |
| `language` | `en`, `es`… | ISO 639-1. |
| `ISSN`, `ISBN` | string | `1234-5678`. |

#### Types (`type`)

`article-journal`, `paper-conference`, `chapter`, `book`, `thesis`, `report`, `dataset`, `software`,
`webpage`, `article` (preprint), `speech` (talk), `poster`.

#### ECEAAS metadata (`custom`)

| Key | Format | Effect on the website |
|---|---|---|
| `subproject` | `["COG","ISAC","DATA"]` (any of) | Colour badges + subproject filter. |
| `wp` | `["WP1"…"WP7"]` | Reserved for reporting (not displayed yet). |
| `pdf` | `"publications/<file>.pdf"` or https URL | Shows a **PDF** button. |
| `openAccess` | `true` / `false` | Shows the *Open access* badge. |
| `featured` | `true` / `false` | Reserved (home highlights). |
| `links` | `[{ "label": "Code", "url": "https://…" }]` | Extra buttons (dataset, code, video…). |

Unknown fields are ignored by the site and reported as warnings by the validator.

---

### 4. Files (PDFs)

* Only upload PDFs you have the **right to redistribute** (open access, accepted manuscript allowed
  by the publisher's policy, or authors' own work). When in doubt, link the publisher's page via
  `DOI` / `URL` and do not upload the PDF.
* Save the file in `public/publications/` with the item's `id` as the name:
  `public/publications/casino2026cognitive.pdf`, and reference it as
  `"pdf": "publications/casino2026cognitive.pdf"`.
* Keep files under ~10 MB.

---

### 5. Validate and preview

```bash
npm run validate:publications     # checks public/data/publications.json
npm run dev                       # open /es/publicaciones or /en/publications
```

The validator checks: valid JSON array, unique `id` and `DOI`, allowed `type`, required fields,
author shape, numeric dates (`issued`), DOI / ISSN / URL formats, allowed `subproject` / `wp`
values, and that referenced local PDFs exist. **Errors stop `npm run build`** (and therefore the
Docker build), so a broken file can never be deployed; warnings are informative.

Editors that understand JSON Schema (VS Code is preconfigured via `.vscode/settings.json`) give
autocompletion and inline errors using [`publications.schema.json`](docs/publications.schema.json).

To try the page with sample data without touching the real file:

```bash
cp docs/publications.example.json public/data/publications.json   # preview only!
npm run dev
git checkout public/data/publications.json                         # restore
```

---

### 6. Review and publication workflow

1. Create a branch: `git checkout -b publications/<short-description>`.
2. Edit `public/data/publications.json` (+ PDFs). Keep the array **sorted newest first** (the site
   sorts anyway, but it keeps diffs readable).
3. `npm run validate:publications`.
4. Commit in English, e.g. `docs: add publications from <venue> <year>`, and open a pull request.
5. A second team member checks authors, DOI and licence of any PDF.
6. Merge into `main`; the site is rebuilt and deployed.

#### Correcting or removing

Edit or delete the item and follow the same flow. Never change an existing `id` (links and BibTeX
files may reference it); if a record is superseded, replace the content and keep the `id`.

---

### 7. How the website uses the data

* Sorting: year, month, day (newest first) and then title; grouped by year.
* Search box: title, authors, venue, keywords, DOI and abstract.
* Filters: year, type, subproject.
* Per item: badges, authors, venue, collapsible abstract, **DOI**, **PDF**, link, extra links,
  **Copy citation** (APA-like) and **BibTeX** download.
* Language: type labels and UI are translated (ES/EN); bibliographic data is shown as provided.

### 8. Privacy and data protection

Publications contain names of researchers. Only list work that has been published or is publicly
announced, and do not include personal contact details (emails, phone numbers) in any field.

---

## Internationalization (i18n)

All texts live in:
- `src/i18n/locales/es.json` — Spanish
- `src/i18n/locales/en.json` — English

To update texts, edit the JSON files directly. The key structure mirrors the section hierarchy (`home`, `project`, `team`, `publications`, and the legal pages).

### Adding a new team member

1. Add the photo to `public/assets/`.
2. Edit both JSON files: find `team.institutions[n].pis` (PIs with photo) or `team.institutions[n].researchers` (list of names).

---

## Deployment

- **Docker**: see the Docker section above.
- **Netlify / Vercel**: configure a rewrite of all routes to `index.html`.
- **GitHub Pages**: `public/404.html` acts as the SPA fallback.

---

## Participating universities

| Institution | Subproject | Group |
|---|---|---|
| Universitat Rovira i Virgili | ECEAAS-COG | Smart Technologies Research Group |
| Universidad Pública de Navarra | ECEAAS-ISAC | Distributed Systems Group |
| Universidad de Deusto | ECEAAS-DATA | Deusto Smart Mobility |
