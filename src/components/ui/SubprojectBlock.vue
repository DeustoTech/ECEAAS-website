<template>
  <article class="sp-block" :class="{ 'sp-block--flip': flip }">
    <div class="sp-side" :style="{ '--panel-bg': sp.panel }">
      <!-- Each subproject has its own animation -->
      <svg class="sp-anim" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
        <!-- COG: orbiting cognitive core -->
        <template v-if="subproject.id === 'cog'">
          <circle cx="290" cy="280" r="58" fill="none" stroke="#fff" stroke-opacity=".5" />
          <circle class="flow" cx="290" cy="280" r="108" fill="none" stroke="#fff" stroke-opacity=".6" />
          <circle cx="290" cy="280" r="158" fill="none" stroke="#fff" stroke-opacity=".3" />
          <circle cx="290" cy="280" r="14" fill="#fff" fill-opacity=".9" />
          <g class="spin" style="animation-duration: 22s">
            <circle cx="290" cy="172" r="7" fill="#fff" />
            <circle cx="384" cy="334" r="5" fill="#fff" fill-opacity=".8" />
            <circle cx="196" cy="334" r="5" fill="#fff" fill-opacity=".8" />
          </g>
          <g class="spin-r" style="animation-duration: 36s">
            <circle cx="290" cy="122" r="6" fill="#fff" fill-opacity=".7" />
            <circle cx="448" cy="280" r="5" fill="#fff" fill-opacity=".7" />
          </g>
        </template>
        <!-- ISAC: radiating wireless signal -->
        <template v-else-if="subproject.id === 'isac'">
          <circle class="wave-ring" cx="290" cy="280" r="190" fill="none" stroke="#fff" stroke-width="2" />
          <circle class="wave-ring" cx="290" cy="280" r="190" fill="none" stroke="#fff" stroke-width="2" style="animation-delay: 1.2s" />
          <circle class="wave-ring" cx="290" cy="280" r="190" fill="none" stroke="#fff" stroke-width="2" style="animation-delay: 2.4s" />
          <path d="M290 280 V236 M270 262 L290 236 L310 262" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <circle cx="290" cy="288" r="9" fill="#fff" />
        </template>
        <!-- DATA: data network with moving packets -->
        <template v-else>
          <g stroke="#fff" stroke-opacity=".55" stroke-width="1.5" fill="none">
            <path class="flow" d="M200 190 L290 150 L370 220 L320 320 L210 300 Z" />
            <path class="flow" d="M290 150 L320 320 M200 190 L370 220 M210 300 L370 220" style="animation-duration: 3.4s" />
          </g>
          <circle class="dot" cx="200" cy="190" r="7" fill="#fff" />
          <circle class="dot" cx="290" cy="150" r="9" fill="#fff" style="animation-delay: .6s" />
          <circle class="dot" cx="370" cy="220" r="7" fill="#fff" style="animation-delay: 1.2s" />
          <circle class="dot" cx="320" cy="320" r="9" fill="#fff" style="animation-delay: 1.8s" />
          <circle class="dot" cx="210" cy="300" r="7" fill="#fff" style="animation-delay: 2.4s" />
          <circle r="4" fill="#fff"><animateMotion dur="4s" repeatCount="indefinite" path="M200 190 L290 150 L370 220 L320 320" /></circle>
          <circle r="4" fill="#fff"><animateMotion dur="5s" repeatCount="indefinite" begin="1.2s" path="M210 300 L370 220 L290 150" /></circle>
        </template>
      </svg>
      <span class="sp-name">{{ subproject.name }}</span>
      <span class="sp-logo"><img :src="`/assets/${subproject.logo}`" :alt="subproject.university" /></span>
      <span class="sp-uni">{{ subproject.university }}</span>
      <span class="sp-group">{{ group }}</span>
    </div>
    <div class="sp-main">
      <h3>{{ subproject.subtitle }}</h3>
      <p>{{ subproject.description }}</p>
    </div>
  </article>
</template>

<script setup>
/**
 * SubprojectBlock — full description of a subproject, with a distinct
 * looping animation per subproject (orbits / signal waves / data network).
 * @prop {Object} subproject - { id, name, subtitle, description, university, logo }
 * @prop {string} group - research group name shown at the bottom of the side panel
 * @prop {boolean} flip - mirror the layout (side panel on the right)
 */
import { computed } from 'vue'
import { SUBPROJECTS } from '@/data/subprojects'

const props = defineProps({
  subproject: { type: Object, required: true },
  group: { type: String, default: '' },
  flip: { type: Boolean, default: false },
})
const sp = computed(() => SUBPROJECTS[props.subproject.id])
</script>
