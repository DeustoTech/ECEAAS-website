<template>
  <!-- Animated "cognitive environment" visual: logo core, spinning rings,
       pulsing dots and floating chips. -->
  <div class="orbit" :style="{ '--orbit-size': size + 'px' }" aria-hidden="true">
    <svg viewBox="0 0 460 460">
      <circle cx="230" cy="230" r="92" fill="none" stroke="rgba(255,255,255,.18)" />
      <circle class="flow" cx="230" cy="230" r="150" fill="none" stroke="rgba(124,192,255,.5)" />
      <circle cx="230" cy="230" r="212" fill="none" stroke="rgba(255,255,255,.12)" />
      <g class="spin">
        <circle cx="230" cy="78" r="6" fill="#7cc0ff" />
        <circle cx="361" cy="305" r="5" fill="#9bd15b" />
        <circle cx="99" cy="305" r="5" fill="#4fd1e0" />
      </g>
      <g class="spin-r">
        <circle cx="230" cy="18" r="6" fill="#9bd15b" />
        <circle cx="430" cy="230" r="5" fill="#7cc0ff" />
        <circle cx="50" cy="330" r="4" fill="#fff" />
      </g>
      <circle class="dot" cx="132" cy="120" r="3.5" fill="#fff" />
      <circle class="dot" cx="338" cy="96" r="3.5" fill="#fff" style="animation-delay: 1s" />
      <circle class="dot" cx="372" cy="380" r="3.5" fill="#fff" style="animation-delay: 2s" />
    </svg>
    <div class="orbit-core"><img src="/assets/LogoECEAAS.png" alt="" /></div>
    <span
      v-for="(chip, i) in chips"
      :key="chip.label"
      class="chip"
      :style="{ ...POSITIONS[i % POSITIONS.length], animationDelay: `${i * 0.7}s` }"
    >
      <i :style="{ background: COLORS[i % COLORS.length] }"></i>{{ chip.label }}
    </span>
  </div>
</template>

<script setup>
/**
 * HeroOrbit — decorative hero visual.
 * @prop {{label:string}[]} chips - up to four floating labels
 * @prop {number} size - rendered size in px (max)
 */
defineProps({
  chips: { type: Array, default: () => [] },
  size: { type: Number, default: 460 },
})

const POSITIONS = [
  { left: '-4%', top: '16%' },
  { right: '-2%', top: '8%' },
  { right: '-6%', bottom: '22%' },
  { left: '2%', bottom: '8%' },
]
const COLORS = ['#7cc0ff', '#9bd15b', '#4fd1e0', '#ffffff']
</script>
