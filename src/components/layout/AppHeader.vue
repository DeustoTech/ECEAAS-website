<template>
  <!-- =====================================================
    AppHeader — Fixed navigation bar
    Shows: ECEAAS logo + brand, nav links, ES/EN toggle.
    On mobile: hamburger menu.
  ====================================================== -->
  <header class="app-header" role="banner">
    <div class="container header-inner">

      <!-- Brand / Logo -->
      <router-link :to="homePath" class="header-brand" :aria-label="$t('hero.acronym')">
        <img
          src="/assets/LogoECEAAS.png"
          :alt="$t('hero.acronym') + ' logo'"
          class="header-logo"
          width="44"
          height="44"
        />
        <div class="header-brand-text">
          <span class="header-brand-acronym">{{ $t('hero.acronym') }}</span>
          <span class="header-brand-subtitle">{{ $t('hero.title') }}</span>
        </div>
      </router-link>

      <!-- Desktop navigation -->
      <nav class="header-nav" role="navigation" :aria-label="$t('nav.home')">
        <router-link :to="localePath('home')"    class="nav-link" id="nav-home">{{ $t('nav.home') }}</router-link>
        <router-link :to="localePath('project')" class="nav-link" id="nav-project">{{ $t('nav.project') }}</router-link>
        <router-link :to="localePath('team')"    class="nav-link" id="nav-team">{{ $t('nav.team') }}</router-link>
        <span class="nav-link disabled" id="nav-publications" aria-disabled="true">{{ $t('nav.publications') }}</span>
      </nav>

      <!-- Language toggle -->
      <div class="lang-toggle" role="navigation" aria-label="Language selector">
        <router-link :to="switchLangPath('es')" class="lang-btn" :class="{ active: locale === 'es' }" id="lang-es">
          <span class="lang-flag">🇪🇸</span> ES
        </router-link>
        <router-link :to="switchLangPath('en')" class="lang-btn" :class="{ active: locale === 'en' }" id="lang-en">
          <span class="lang-flag">🇬🇧</span> EN
        </router-link>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        id="hamburger-btn"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }" role="navigation">
      <router-link :to="localePath('home')"    class="nav-link" @click="menuOpen = false">{{ $t('nav.home') }}</router-link>
      <router-link :to="localePath('project')" class="nav-link" @click="menuOpen = false">{{ $t('nav.project') }}</router-link>
      <router-link :to="localePath('team')"    class="nav-link" @click="menuOpen = false">{{ $t('nav.team') }}</router-link>
      <span class="nav-link disabled" aria-disabled="true">{{ $t('nav.publications') }}</span>
      <div class="mobile-lang">
        <router-link :to="switchLangPath('es')" class="lang-btn" :class="{ active: locale === 'es' }" @click="menuOpen = false">🇪🇸 ES</router-link>
        <router-link :to="switchLangPath('en')" class="lang-btn" :class="{ active: locale === 'en' }" @click="menuOpen = false">🇬🇧 EN</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
/**
 * AppHeader — fixed navigation bar.
 *
 * Responsibilities:
 *  - Display ECEAAS logo and brand name
 *  - Render locale-aware nav links via localePath()
 *  - Language switcher that preserves the current page
 *  - Responsive hamburger menu for mobile
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route      = useRoute()
const menuOpen   = ref(false)

/** Home path for the brand logo link */
const homePath = computed(() => (locale.value === 'es' ? '/es/' : '/en/'))

/**
 * Returns the localised path for a given page key.
 * Key mapping: home | project | team | publications
 */
const PAGE_PATHS = {
  es: { home: '/es/', project: '/es/proyecto',       team: '/es/equipo',  publications: '/es/publicaciones' },
  en: { home: '/en/', project: '/en/project',        team: '/en/team',    publications: '/en/publications'  },
}

function localePath(key) {
  return PAGE_PATHS[locale.value]?.[key] ?? '/es/'
}

/**
 * Returns the equivalent path in the target locale,
 * preserving the current section when possible.
 */
function switchLangPath(targetLang) {
  // Determine current section from route name (e.g. 'project-es' → 'project')
  const name = route.name ?? ''
  const section = name.replace(/-es$|-en$/, '')  // strip locale suffix
  const validSections = ['home', 'project', 'team', 'publications']
  const key = validSections.includes(section) ? section : 'home'
  return PAGE_PATHS[targetLang]?.[key] ?? (targetLang === 'es' ? '/es/' : '/en/')
}
</script>
