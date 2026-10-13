<template>
  <main>
    <!-- =====================================================
      PublicationsView — placeholder "Coming soon" page
    ====================================================== -->
    <HeroSection />

    <section class="publications-section" aria-labelledby="pub-title">
      <div class="container publications-inner">
        <span class="publications-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </span>
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
