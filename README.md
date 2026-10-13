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
| Vanilla CSS | — | Styling (no external frameworks) |
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
│   │   │   ├── TeamMemberCard.vue
│   │   │   ├── WorkPackageItem.vue
│   │   │   └── WpDistributionTable.vue
│   │   └── sections/
│   │       ├── HeroSection.vue
│   │       └── UniversityLogos.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ProjectView.vue
│   │   ├── TeamView.vue
│   │   ├── PublicationsView.vue   ← "Coming soon"
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
| `/es/publicaciones` | Publications (coming soon) | Spanish |
| `/es/aviso-legal` | Legal notice | Spanish |
| `/es/privacidad` | Privacy policy | Spanish |
| `/es/cookies` | Cookie policy | Spanish |
| `/en/` | Home | English |
| `/en/project` | Project | English |
| `/en/team` | Team | English |
| `/en/publications` | Publications (coming soon) | English |
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
