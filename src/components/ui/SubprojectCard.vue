<template>
  <!-- =====================================================
    SubprojectCard — displays a subproject (COG/ISAC/DATA)
    with name, subtitle, description and university badge.
  ====================================================== -->
  <article class="subproject-card" :style="{ '--sp-accent': accentColor }">
    <div class="subproject-image-wrap">
      <img
        :src="`/assets/${subproject.name}.png`"
        :alt="subproject.name"
        class="subproject-image"
      />
    </div>
    <p class="subproject-name">{{ subproject.name }}</p>
    <p class="subproject-subtitle">{{ subproject.subtitle }}</p>
    <p class="subproject-desc">{{ subproject.description }}</p>
    <div class="subproject-uni">
      <img
        :src="`/assets/${subproject.logo}`"
        :alt="subproject.university"
        class="subproject-uni-logo"
      />
      <span class="subproject-uni-name">{{ subproject.university }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

/**
 * SubprojectCard — presentational component for a subproject block.
 *
 * Props:
 *  @prop {Object} subproject - Subproject data from i18n locale
 *    { id, name, subtitle, description, university, logo }
 */
const props = defineProps({
  subproject: { type: Object, required: true },
})

/** Accent colour per subproject, matching its lead institution. */
const ACCENTS = {
  cog: 'var(--color-accent)',
  isac: '#4E708A',
  data: 'var(--color-sage)',
}

const accentColor = computed(() => ACCENTS[props.subproject.id] ?? 'var(--color-accent)')
</script>
