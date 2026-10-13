<template>
  <!-- =====================================================
    WorkPackageItem — a single work package list entry,
    numbered editorial-style (01, 02, ...).
  ====================================================== -->
  <li class="wp-item" :data-index="String(index + 1).padStart(2, '0')">{{ label }}</li>
</template>

<script setup>
/**
 * WorkPackageItem — presentational component for a WP list entry.
 *
 * Props:
 *  @prop {number} index - Zero-based position, rendered as 01, 02, ...
 *  @prop {string} label - Work package label (e.g. "WP1. Gestión...")
 */
defineProps({
  index: { type: Number, required: true },
  label: { type: String, required: true },
})
</script>
