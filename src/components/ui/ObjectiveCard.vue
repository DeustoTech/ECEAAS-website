<template>
  <!-- =====================================================
    ObjectiveCard — displays a single project objective
    with an inline SVG icon and description text.
  ====================================================== -->
  <article class="objective-card">
    <svg class="objective-icon" v-html="ICONS[index % ICONS.length]" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></svg>
    <p class="objective-text">{{ text }}</p>
  </article>
</template>

<script setup>
/**
 * ObjectiveCard — presentational component.
 *
 * Props:
 *  @prop {number} index - Position in the objectives list (selects the icon)
 *  @prop {string} text  - Objective description text
 */
defineProps({
  index: { type: Number, required: true },
  text: { type: String, required: true },
})

/** Inline SVG path markup, one per objective (order matches home.objectives). */
const ICONS = [
  '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1.3" fill="currentColor" stroke="none"/>',
  '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.2 7.3 10.5 16M15.8 7.3 13.5 16M8.5 6h7"/>',
  '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2"/>',
  '<path d="M4 5h16v11H8l-4 4V5z"/>',
  '<path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  '<path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/>',
  '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M8.3 12.3l2.4 2.4 5-5"/>',
]
</script>
