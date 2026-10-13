<template>
  <section class="marquee-section" :aria-label="label">
    <p class="marquee-label">{{ label }}</p>
    <div class="marquee-mask">
      <div class="marquee">
        <img
          v-for="(u, i) in loop"
          :key="i"
          :src="`/assets/${u.logo}`"
          :alt="i < universities.length ? u.name : ''"
          :aria-hidden="i >= universities.length ? 'true' : undefined"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * UniversityMarquee — endlessly scrolling strip with the partner logos.
 * The list is repeated four times so the -50% translate loops seamlessly.
 */
import { computed } from 'vue'

defineProps({ label: { type: String, required: true } })

const universities = [
  { name: 'Universitat Rovira i Virgili', logo: 'urv.png' },
  { name: 'Universidad Pública de Navarra', logo: 'upna.png' },
  { name: 'Universidad de Deusto', logo: 'deusto.png' },
]
const loop = computed(() => [...universities, ...universities, ...universities, ...universities])
</script>
