/**
 * i18n configuration for ECEAAS website.
 * Uses vue-i18n v11 with legacy: false (Composition API mode).
 * Locale is driven by the URL prefix (/es/ or /en/).
 */
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,          // Use Composition API (useI18n)
  locale: 'es',          // Default locale
  fallbackLocale: 'es',
  messages: { es, en },
})

export default i18n
