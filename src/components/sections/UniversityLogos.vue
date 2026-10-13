<template>
  <!-- =====================================================
    UniversityLogos — Strip with the three university logos
  ====================================================== -->
  <section class="university-logos" aria-label="Partner universities">
    <div class="container">
      <div class="logos-inner">
        <div v-for="uni in universities" :key="uni.id" class="uni-logo-item">
          <img
            :src="`/assets/${uni.logo}`"
            :alt="uni.name"
            class="uni-logo-img"
            :width="uni.width"
            :height="52"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * UniversityLogos — renders the three partner university logos
 * (URV, UPNA, Deusto) in a centred horizontal strip.
 */
const universities = [
  { id: 'urv',    name: 'Universitat Rovira i Virgili',   logo: 'urv.png',    width: 140 },
  { id: 'upna',   name: 'Universidad Pública de Navarra', logo: 'upna.png',   width: 120 },
  { id: 'deusto', name: 'Universidad de Deusto',          logo: 'deusto.png', width: 120 },
]
</script>
