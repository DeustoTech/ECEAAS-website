# ECEAAS Website

> **Entornos Cognitivos para el Envejecimiento Autónomo, Activo y Saludable**  
> Cognitive Environments for healthy, autonomous, and active aging

Sitio web oficial del proyecto ECEAAS — financiado por el Plan Estatal de Investigación Científica, Técnica y de Innovación (Proyectos de Generación de Conocimiento 2024).

`PID2024-158490OB-C31 · PID2024-158490OB-C32 · PID2024-158490OB-C33`

---

## Stack técnico

| Herramienta | Versión | Propósito |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.4 | Framework principal (Composition API) |
| [Vite](https://vite.dev/) | ^5 | Build tool + dev server |
| [Vue Router 4](https://router.vuejs.org/) | ^4 | Rutas SEO-friendly con history mode |
| [vue-i18n](https://vue-i18n.intlify.dev/) | ^11 | Internacionalización ES / EN |
| Vanilla CSS | — | Estilos (sin frameworks externos) |

---

## Estructura del proyecto

```
web/
├── public/
│   ├── assets/             ← Imágenes (fotos equipo, logos)
│   └── 404.html            ← Fallback SPA para hosting estático
├── src/
│   ├── assets/styles/
│   │   ├── main.css        ← Design tokens, reset, tipografía
│   │   ├── components.css  ← Estilos componentes reutilizables
│   │   └── sections.css    ← Estilos por vista/sección
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue   ← Header fijo + nav + toggle ES/EN
│   │   │   └── AppFooter.vue   ← Footer oscuro
│   │   ├── ui/
│   │   │   ├── ObjectiveCard.vue
│   │   │   ├── SubprojectCard.vue
│   │   │   ├── TeamMemberCard.vue
│   │   │   └── WorkPackageItem.vue
│   │   └── sections/
│   │       ├── HeroSection.vue
│   │       └── UniversityLogos.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ProjectView.vue
│   │   ├── TeamView.vue
│   │   └── PublicationsView.vue  ← "Próximamente"
│   ├── router/index.js     ← Rutas + meta SEO + guard locale
│   ├── i18n/
│   │   ├── index.js        ← Setup vue-i18n
│   │   └── locales/
│   │       ├── es.json     ← Todos los textos en español
│   │       └── en.json     ← Todos los textos en inglés
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── README.md
```

---

## Rutas (SEO-friendly)

| URL | Vista | Idioma |
|---|---|---|
| `/` | Redirect a `/es/` | — |
| `/es/` | Inicio | Español |
| `/es/proyecto` | Proyecto | Español |
| `/es/equipo` | Equipo | Español |
| `/es/publicaciones` | Publicaciones (proximamente) | Español |
| `/en/` | Home | English |
| `/en/project` | Project | English |
| `/en/team` | Team | English |
| `/en/publications` | Publications (coming soon) | English |

---

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación se sirve en `http://localhost:5173/`.

## Build de producción

```bash
npm run build
npm run preview
```

---

## Internacionalización (i18n)

Todos los textos están en:
- `src/i18n/locales/es.json` — Español
- `src/i18n/locales/en.json` — English

Para actualizar textos: edita directamente los JSON. La estructura de claves refleja la jerarquía de secciones (`home`, `project`, `team`, `publications`).

### Agregar un nuevo miembro al equipo

1. Añadir la foto en `public/assets/`
2. Editar ambos JSON: localiza `team.institutions[n].pis` (IPs con foto) o `team.institutions[n].researchers` (lista de nombres)

---

## Despliegue

- **Netlify / Vercel**: configura reescritura de todas las rutas a `index.html`
- **GitHub Pages**: el archivo `public/404.html` actúa como fallback SPA

---

## Universidades participantes

| Institución | Subproyecto | Grupo |
|---|---|---|
| Universitat Rovira i Virgili | ECEAAS-COG | Smart Technologies Research Group |
| Universidad Pública de Navarra | ECEAAS-ISAC | Distributed Systems Group |
| Universidad de Deusto | ECEAAS-DATA | Deusto Smart Mobility |
