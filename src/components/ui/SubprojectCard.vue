<template>
  <!-- =====================================================
    SubprojectCard — displays a subproject (COG/ISAC/DATA)
    with name, subtitle, description and university badge.
  ====================================================== -->
  <article class="subproject-card">
    <p class="subproject-name">{{ subproject.name }}</p>
    <p class="subproject-subtitle">{{ subproject.subtitle }}</p>
    <p class="subproject-desc">{{ subproject.description }}</p>
    <div class="subproject-uni">
      <img
        :src="`/assets/${subproject.logo}`"
        :alt="subproject.university"
        class="subproject-uni-logo"
        height="28"
      />
      <span class="subproject-uni-name">{{ subproject.university }}</span>
    </div>
  </article>
</template>

<script setup>
/**
 * SubprojectCard — presentational component for a subproject block.
 *
 * Props:
 *  @prop {Object} subproject - Subproject data from i18n locale
 *    { name, subtitle, description, university, logo }
 */
defineProps({
  subproject: { type: Object, required: true },
})
</script>
