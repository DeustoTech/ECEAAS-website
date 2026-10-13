<template>
  <!-- =====================================================
    ObjectiveCard — displays a single project objective
    with an emoji icon and description text.
  ====================================================== -->
  <article class="objective-card">
    <span class="objective-icon" aria-hidden="true">{{ icon }}</span>
    <p class="objective-text">{{ text }}</p>
  </article>
</template>

<script setup>
/**
 * ObjectiveCard — presentational component.
 *
 * Props:
 *  @prop {string} icon - Emoji icon representing the objective
 *  @prop {string} text - Objective description text
 */
defineProps({
  icon: { type: String, required: true },
  text: { type: String, required: true },
})
</script>
