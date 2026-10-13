/**
 * Vue Router configuration for ECEAAS.
 *
 * Route structure (SEO-friendly, locale-prefixed):
 *   /           → redirect to /es/
 *   /es/        → HomeView  (ES)
 *   /es/proyecto    → ProjectView (ES)
 *   /es/equipo      → TeamView (ES)
 *   /es/publicaciones → PublicationsView (ES)
 *   /en/        → HomeView  (EN)
 *   /en/project     → ProjectView (EN)
 *   /en/team        → TeamView (EN)
 *   /en/publications → PublicationsView (EN)
 *
 * Each route carries meta.locale and meta.seoKey so that
 * App.vue can update <title> and <meta name="description"> on navigation.
 */
import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

// Lazy-loaded views for code splitting
const HomeView          = () => import('@/views/HomeView.vue')
const ProjectView       = () => import('@/views/ProjectView.vue')
const TeamView          = () => import('@/views/TeamView.vue')
const PublicationsView  = () => import('@/views/PublicationsView.vue')
const LegalNoticeView   = () => import('@/views/LegalNoticeView.vue')
const PrivacyPolicyView = () => import('@/views/PrivacyPolicyView.vue')
const CookiePolicyView  = () => import('@/views/CookiePolicyView.vue')

const routes = [
  // Root redirect
  { path: '/', redirect: '/es/' },

  // ── Spanish routes ─────────────────────────────────────────
  {
    path: '/es/',
    name: 'home-es',
    component: HomeView,
    meta: { locale: 'es', seoKey: 'home' },
  },
  {
    path: '/es/proyecto',
    name: 'project-es',
    component: ProjectView,
    meta: { locale: 'es', seoKey: 'project' },
  },
  {
    path: '/es/equipo',
    name: 'team-es',
    component: TeamView,
    meta: { locale: 'es', seoKey: 'team' },
  },
  {
    path: '/es/publicaciones',
    name: 'publications-es',
    component: PublicationsView,
    meta: { locale: 'es', seoKey: 'publications' },
  },
  {
    path: '/es/aviso-legal',
    name: 'legal-notice-es',
    component: LegalNoticeView,
    meta: { locale: 'es', seoKey: 'legalNotice' },
  },
  {
    path: '/es/privacidad',
    name: 'privacy-policy-es',
    component: PrivacyPolicyView,
    meta: { locale: 'es', seoKey: 'privacyPolicy' },
  },
  {
    path: '/es/cookies',
    name: 'cookie-policy-es',
    component: CookiePolicyView,
    meta: { locale: 'es', seoKey: 'cookiePolicy' },
  },

  // ── English routes ──────────────────────────────────────────
  {
    path: '/en/',
    name: 'home-en',
    component: HomeView,
    meta: { locale: 'en', seoKey: 'home' },
  },
  {
    path: '/en/project',
    name: 'project-en',
    component: ProjectView,
    meta: { locale: 'en', seoKey: 'project' },
  },
  {
    path: '/en/team',
    name: 'team-en',
    component: TeamView,
    meta: { locale: 'en', seoKey: 'team' },
  },
  {
    path: '/en/publications',
    name: 'publications-en',
    component: PublicationsView,
    meta: { locale: 'en', seoKey: 'publications' },
  },
  {
    path: '/en/legal-notice',
    name: 'legal-notice-en',
    component: LegalNoticeView,
    meta: { locale: 'en', seoKey: 'legalNotice' },
  },
  {
    path: '/en/privacy-policy',
    name: 'privacy-policy-en',
    component: PrivacyPolicyView,
    meta: { locale: 'en', seoKey: 'privacyPolicy' },
  },
  {
    path: '/en/cookies',
    name: 'cookie-policy-en',
    component: CookiePolicyView,
    meta: { locale: 'en', seoKey: 'cookiePolicy' },
  },

  // Catch-all fallback
  { path: '/:pathMatch(.*)*', redirect: '/es/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Smooth scroll-to-top on route change
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

// ── Navigation guard: sync locale + update SEO meta ───────────
router.beforeEach((to) => {
  const locale = to.meta.locale || 'es'
  // Set vue-i18n locale
  i18n.global.locale.value = locale

  // Update <html lang="..."> attribute
  document.documentElement.lang = locale

  // Update <title> and <meta name="description">
  const seoKey = to.meta.seoKey
  if (seoKey) {
    const messages = i18n.global.messages.value[locale]
    const seo = messages?.[seoKey]?.seo
    if (seo) {
      document.title = seo.title
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', seo.description)
    }
  }
})

export default router
