<template>
  <!-- =====================================================
    WorkPackageItem — a single work package list entry
  ====================================================== -->
  <li class="wp-item">{{ label }}</li>
</template>

<script setup>
/**
 * WorkPackageItem — presentational component for a WP list entry.
 *
 * Props:
 *  @prop {string} label - Work package label (e.g. "WP1. Gestión...")
 */
defineProps({
  label: { type: String, required: true },
})
</script>
