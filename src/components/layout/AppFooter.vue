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
      <p class="footer-copy">© {{ currentYear }} {{ $t('footer.rights') }}</p>
    </div>
  </footer>
</template>

<script setup>
/**
 * AppFooter — dark footer displaying project reference info.
 */
const currentYear = new Date().getFullYear()
</script>
