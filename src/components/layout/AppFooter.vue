<template>
  <footer class="app-footer" role="contentinfo">
    <div class="container footer-top">
      <div class="footer-brand">
        <div class="footer-brand-row">
          <span class="footer-logo"><img src="/assets/LogoECEAAS.png" alt="" /></span>
          <span class="footer-title">{{ $t('hero.acronym') }}</span>
        </div>
        <p class="footer-desc">{{ $t('footer.tagline') }}</p>
        <p class="footer-funding">{{ $t('footer.fundedBy') }} {{ $t('footer.agency') }} · {{ $t('hero.pids') }}</p>
      </div>
      <nav class="footer-col" :aria-label="$t('footer.pages')">
        <router-link :to="paths.project">{{ $t('nav.project') }}</router-link>
        <router-link :to="paths.team">{{ $t('nav.team') }}</router-link>
        <router-link :to="paths.publications">{{ $t('nav.publications') }}</router-link>
      </nav>
      <nav class="footer-col" :aria-label="$t('footer.legal')">
        <router-link :to="paths.legalNotice">{{ $t('footer.legalLinks.legalNotice') }}</router-link>
        <router-link :to="paths.privacyPolicy">{{ $t('footer.legalLinks.privacyPolicy') }}</router-link>
        <router-link :to="paths.cookiePolicy">{{ $t('footer.legalLinks.cookiePolicy') }}</router-link>
      </nav>
    </div>
    <div class="footer-bottom">
      <p class="container footer-copy">© {{ currentYear }} {{ $t('footer.rights') }} · Universitat Rovira i Virgili · Universidad Pública de Navarra · Universidad de Deusto</p>
    </div>
  </footer>
</template>

<script setup>
/** AppFooter — dark footer with project info and locale-aware links. */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const currentYear = new Date().getFullYear()
const { locale } = useI18n()

const PATHS = {
  es: { project: '/es/proyecto', team: '/es/equipo', publications: '/es/publicaciones', legalNotice: '/es/aviso-legal', privacyPolicy: '/es/privacidad', cookiePolicy: '/es/cookies' },
  en: { project: '/en/project', team: '/en/team', publications: '/en/publications', legalNotice: '/en/legal-notice', privacyPolicy: '/en/privacy-policy', cookiePolicy: '/en/cookies' },
}
const paths = computed(() => PATHS[locale.value] ?? PATHS.es)
</script>
