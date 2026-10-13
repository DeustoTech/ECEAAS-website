<template>
  <!-- =====================================================
    HeroSection — Page hero: logo + tagline + PID strip
  ====================================================== -->
  <section class="hero" aria-label="Project header">
    <div class="container hero-inner">
      <!-- Project logo -->
      <div class="hero-image-wrap">
        <img
          src="/assets/LogoECEAAS.png"
          :alt="$t('hero.acronym') + ' — ' + $t('hero.title')"
          class="hero-image"
        />
      </div>

      <!-- Tagline -->
      <div class="hero-content">
        <h1 class="hero-title">
          {{ $t('hero.title') }}
          (<span>{{ $t('hero.acronym') }}</span>)
        </h1>
      </div>
    </div>
  </section>

  <!-- Reference strip -->
  <div class="ref-strip">
    <div class="container">
      <p class="ref-strip-pids">{{ $t('hero.pids') }}</p>
      <p class="ref-strip-funding">{{ $t('hero.funding') }}</p>
    </div>
  </div>
</template>

<script setup>
/**
 * HeroSection — displays the ECEAAS logo, project tagline,
 * and the PID reference strip below the hero image.
 * Texts are fully i18n-driven via $t() in template.
 * No script-level imports needed.
 */
</script>
