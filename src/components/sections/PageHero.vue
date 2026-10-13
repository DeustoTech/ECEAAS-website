<template>
  <!-- Dark animated hero shared by the inner pages. The optional `visual`
       slot is rendered on the right (hidden on narrow screens). -->
  <section class="dark-surface">
    <div class="orb orb--blue" style="width: 460px; height: 460px; left: -120px; top: -120px"></div>
    <div class="orb orb--teal" style="width: 380px; height: 380px; right: -80px; top: 20px"></div>
    <div class="gridbg"></div>
    <Bubbles variant="b" />
    <div class="container page-hero-inner">
      <div class="page-hero-copy">
        <p class="eyebrow eyebrow--light rise">{{ eyebrow }}</p>
        <h1 class="page-hero-title rise" style="animation-delay: 0.1s">{{ title }}</h1>
        <p v-if="lead" class="page-hero-lead rise" style="animation-delay: 0.2s">{{ lead }}</p>
      </div>
      <div v-if="$slots.visual" class="page-hero-visual page-hero-visual--hide rise" style="animation-delay: 0.25s">
        <slot name="visual" />
      </div>
    </div>
    <svg class="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 C 240 90, 480 0, 720 30 S 1200 80, 1440 20 L1440 70 L0 70 Z" fill="#fff" />
    </svg>
  </section>
</template>

<script setup>
import Bubbles from '@/components/decor/Bubbles.vue'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>
