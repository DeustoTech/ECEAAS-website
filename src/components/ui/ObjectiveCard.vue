<template>
  <article class="objective-card lift" :style="{ '--tint': tint }">
    <span class="objective-num" aria-hidden="true">{{ number }}</span>
    <h4 class="objective-title">{{ title }}</h4>
    <p class="objective-text">{{ text }}</p>
  </article>
</template>

<script setup>
/**
 * ObjectiveCard — one project objective.
 * @prop {string} number - zero-padded index ("01")
 * @prop {string} title  - short title
 * @prop {string} text   - full objective text
 * @prop {string} tint   - colour of the big number
 */
defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tint: { type: String, default: 'var(--blue-soft)' },
})
</script>
