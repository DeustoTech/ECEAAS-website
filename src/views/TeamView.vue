<template>
  <!-- =====================================================
    TeamView — Team page
    One institution block per university, each with:
      - Logo + group name + description
      - PI cards (photo + bio)
      - Researchers list
  ====================================================== -->
  <main>
    <HeroSection />

    <section class="team-section" aria-labelledby="team-title">
      <div class="container">
        <h2 class="team-section-title" id="team-title">{{ $t('team.title') }}</h2>

        <div
          v-for="(inst, idx) in institutions"
          :key="inst.id"
        >
          <!-- Institution block -->
          <article class="institution-block" :id="`institution-${inst.id}`">

            <!-- Header: logo + name + group + description -->
            <header class="institution-header">
              <img
                :src="`/assets/${inst.logo}`"
                :alt="inst.name"
                class="institution-logo-img"
                height="60"
              />
              <h3 class="institution-name">{{ inst.name }}</h3>
              <p class="institution-group">{{ inst.groupName }}</p>
              <p class="institution-desc">{{ inst.description }}</p>
            </header>

            <!-- PI cards + researchers list -->
            <div class="institution-grid">
              <!-- PI photo cards -->
              <TeamMemberCard
                v-for="pi in inst.pis"
                :key="pi.name"
                :member="pi"
              />

              <!-- Researchers list box -->
              <aside class="researchers-box" :aria-label="$t('team.researchersLabel')">
                <p class="researchers-title">{{ $t('team.researchersLabel') }}</p>
                <ul class="researchers-list" role="list">
                  <li v-for="r in inst.researchers" :key="r">{{ r }}</li>
                </ul>
              </aside>
            </div>
          </article>

          <!-- Separator between institutions -->
          <hr v-if="idx < institutions.length - 1" class="institution-separator" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * TeamView — team page.
 * Iterates over the institutions array from i18n messages,
 * rendering a block per institution with PI cards and researcher list.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection    from '@/components/sections/HeroSection.vue'
import TeamMemberCard from '@/components/ui/TeamMemberCard.vue'

const { tm } = useI18n()

const institutions = computed(() => tm('team.institutions'))
</script>
