<template>
  <header class="app-header" role="banner">
    <div class="container header-inner">
      <router-link :to="paths.home" class="header-brand" :aria-label="$t('hero.acronym')">
        <span class="header-logo-wrap">
          <img src="/assets/LogoECEAAS.png" :alt="$t('hero.acronym') + ' logo'" class="header-logo" width="40" height="40" />
        </span>
        <span class="header-brand-acronym">{{ $t('hero.acronym') }}</span>
      </router-link>

      <nav class="header-nav" :aria-label="$t('footer.pages')">
        <router-link :to="paths.home" class="nav-link" id="nav-home">{{ $t('nav.home') }}</router-link>
        <router-link :to="paths.project" class="nav-link" id="nav-project">{{ $t('nav.project') }}</router-link>
        <router-link :to="paths.team" class="nav-link" id="nav-team">{{ $t('nav.team') }}</router-link>
        <router-link :to="paths.publications" class="nav-link" id="nav-publications">{{ $t('nav.publications') }}</router-link>
      </nav>

      <div class="lang-toggle" role="group" aria-label="Language">
        <router-link :to="switchLangPath('es')" class="lang-btn" :class="{ active: locale === 'es' }" id="lang-es" hreflang="es">ES</router-link>
        <router-link :to="switchLangPath('en')" class="lang-btn" :class="{ active: locale === 'en' }" id="lang-en" hreflang="en">EN</router-link>
      </div>

      <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu" id="hamburger-btn">
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav class="mobile-menu" :class="{ open: menuOpen }" :aria-label="$t('footer.pages')">
      <router-link :to="paths.home" class="nav-link" @click="menuOpen = false">{{ $t('nav.home') }}</router-link>
      <router-link :to="paths.project" class="nav-link" @click="menuOpen = false">{{ $t('nav.project') }}</router-link>
      <router-link :to="paths.team" class="nav-link" @click="menuOpen = false">{{ $t('nav.team') }}</router-link>
      <router-link :to="paths.publications" class="nav-link" @click="menuOpen = false">{{ $t('nav.publications') }}</router-link>
      <div class="mobile-lang">
        <router-link :to="switchLangPath('es')" class="lang-btn" :class="{ active: locale === 'es' }" @click="menuOpen = false">ES</router-link>
        <router-link :to="switchLangPath('en')" class="lang-btn" :class="{ active: locale === 'en' }" @click="menuOpen = false">EN</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
/**
 * AppHeader — sticky dark navigation bar with locale-aware links,
 * a language switcher that keeps the current page, and a mobile menu.
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()
const menuOpen = ref(false)

const PAGE_PATHS = {
  es: { home: '/es/', project: '/es/proyecto', team: '/es/equipo', publications: '/es/publicaciones', 'legal-notice': '/es/aviso-legal', 'privacy-policy': '/es/privacidad', 'cookie-policy': '/es/cookies' },
  en: { home: '/en/', project: '/en/project', team: '/en/team', publications: '/en/publications', 'legal-notice': '/en/legal-notice', 'privacy-policy': '/en/privacy-policy', 'cookie-policy': '/en/cookies' },
}

const paths = computed(() => PAGE_PATHS[locale.value] ?? PAGE_PATHS.es)

/** Equivalent path in the target locale for the current page. */
function switchLangPath(target) {
  const section = String(route.name ?? '').replace(/-es$|-en$/, '')
  return PAGE_PATHS[target][section] ?? PAGE_PATHS[target].home
}
</script>
