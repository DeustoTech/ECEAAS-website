<template>
  <main>
    <!-- =====================================================
      HomeView — Landing page
      Sections: Hero → University logos → About → Objectives
    ====================================================== -->
    <HeroSection />
    <UniversityLogos />

    <!-- About the project -->
    <section class="about-section section" aria-labelledby="about-title">
      <div class="container">
        <h2 class="section-title" id="about-title">{{ $t('home.aboutTitle') }}</h2>
        <div class="about-text">
          <p>{{ $t('home.about1') }}</p>
          <p>{{ $t('home.about2') }}</p>
        </div>
      </div>
    </section>

    <!-- Objectives grid -->
    <section class="objectives-section" aria-labelledby="objectives-title">
      <div class="container">
        <h2 class="section-title" id="objectives-title">{{ $t('home.objectivesTitle') }}</h2>
        <div class="objectives-grid">
          <ObjectiveCard
            v-for="(obj, i) in objectives"
            :key="i"
            :index="i"
            :text="obj"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * HomeView — landing page.
 * Renders the hero section, university logos strip,
 * "About the project" text, and objectives grid.
 * All content is loaded from i18n locale messages.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection     from '@/components/sections/HeroSection.vue'
import UniversityLogos from '@/components/sections/UniversityLogos.vue'
import ObjectiveCard   from '@/components/ui/ObjectiveCard.vue'

const { tm } = useI18n()

/** Reactive list of objective texts from i18n */
const objectives = computed(() => tm('home.objectives'))
</script>
