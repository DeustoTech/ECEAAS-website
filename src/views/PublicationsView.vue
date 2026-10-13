<template>
  <main>
    <!-- =====================================================
      PublicationsView — placeholder "Coming soon" page
    ====================================================== -->
    <HeroSection />

    <section class="publications-section" aria-labelledby="pub-title">
      <div class="container publications-inner">
        <span class="publications-icon" aria-hidden="true">📄</span>
        <h2 class="publications-coming-soon" id="pub-title">
          {{ $t('publications.comingSoon') }}
        </h2>
        <p class="publications-message">
          {{ $t('publications.message') }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * PublicationsView — temporary placeholder.
 * Displays a "coming soon" message until publications are available.
 */
import HeroSection from '@/components/sections/HeroSection.vue'
</script>
