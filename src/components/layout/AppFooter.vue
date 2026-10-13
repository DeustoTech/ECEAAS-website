<template>
  <!-- =====================================================
    AppFooter — dark footer with project info
  ====================================================== -->
  <footer class="app-footer" role="contentinfo">
    <div class="container footer-inner">
      <p class="footer-title">{{ $t('footer.rights') }}</p>
      <div class="footer-divider"></div>
      <p class="footer-pids">{{ $t('hero.pids') }}</p>
      <p class="footer-funding">{{ $t('hero.funding') }}</p>
      <div class="footer-divider"></div>
      <nav class="footer-legal-nav" aria-label="Legal">
        <router-link :to="paths.legalNotice">{{ $t('footer.legalLinks.legalNotice') }}</router-link>
        <span class="footer-legal-sep" aria-hidden="true">·</span>
        <router-link :to="paths.privacyPolicy">{{ $t('footer.legalLinks.privacyPolicy') }}</router-link>
        <span class="footer-legal-sep" aria-hidden="true">·</span>
        <router-link :to="paths.cookiePolicy">{{ $t('footer.legalLinks.cookiePolicy') }}</router-link>
      </nav>
      <p class="footer-copy">© {{ currentYear }} {{ $t('footer.rights') }}</p>
    </div>
  </footer>
</template>

<script setup>
/**
 * AppFooter — dark footer displaying project reference info
 * and locale-aware links to the legal pages.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const currentYear = new Date().getFullYear()
const { locale } = useI18n()

const LEGAL_PATHS = {
  es: { legalNotice: '/es/aviso-legal', privacyPolicy: '/es/privacidad', cookiePolicy: '/es/cookies' },
  en: { legalNotice: '/en/legal-notice', privacyPolicy: '/en/privacy-policy', cookiePolicy: '/en/cookies' },
}

const paths = computed(() => LEGAL_PATHS[locale.value] ?? LEGAL_PATHS.es)
</script>
