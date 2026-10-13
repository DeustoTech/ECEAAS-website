<template>
  <!-- =====================================================
    ProjectView — Project page
    Sections: Hero → Coordinated project → Subprojects
              → Work Packages → WP Distribution
  ====================================================== -->
  <main>
    <HeroSection />

    <!-- Coordinated project overview -->
    <section class="section" aria-labelledby="coordinated-title">
      <div class="container">
        <h2 class="section-title" id="coordinated-title">{{ $t('project.coordinatedTitle') }}</h2>
        <p class="section-lead">{{ $t('project.coordinatedText') }}</p>

        <!-- Subproject cards grid -->
        <div class="subprojects-grid">
          <SubprojectCard
            v-for="sp in subprojects"
            :key="sp.id"
            :subproject="sp"
          />
        </div>
      </div>
    </section>

    <!-- Work Packages list -->
    <section class="wp-section section-alt section" aria-labelledby="wp-title">
      <div class="container">
        <h2 class="section-title" id="wp-title">{{ $t('project.wpTitle') }}</h2>
        <p class="section-lead">{{ $t('project.wpIntro') }}</p>
        <ul class="wp-list" role="list">
          <WorkPackageItem
            v-for="(wp, i) in workPackages"
            :key="i"
            :label="wp"
          />
        </ul>
      </div>
    </section>

    <!-- WP Distribution image -->
    <section class="wp-dist-section" aria-labelledby="wp-dist-title">
      <div class="container">
        <h2 class="section-title" id="wp-dist-title">{{ $t('project.wpDistTitle') }}</h2>
        <p class="section-lead">{{ $t('project.wpDistText') }}</p>
        <div class="wp-dist-image-wrap">
          <img
            src="/assets/DistribucionWP.png"
            alt="WP distribution diagram"
            class="wp-dist-image"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * ProjectView — project structure page.
 * Renders subproject cards (COG/ISAC/DATA), work packages list,
 * and the WP distribution diagram image.
 * All text comes from i18n messages.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection      from '@/components/sections/HeroSection.vue'
import SubprojectCard   from '@/components/ui/SubprojectCard.vue'
import WorkPackageItem  from '@/components/ui/WorkPackageItem.vue'

const { tm } = useI18n()

const subprojects   = computed(() => tm('project.subprojects'))
const workPackages  = computed(() => tm('project.workPackages'))
</script>
