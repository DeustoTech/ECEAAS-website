<template>
  <router-link :to="to" class="subproject-card lift" :style="{ '--sp': sp.onDark }">
    <span class="subproject-head">
      <span class="subproject-name">{{ subproject.name }}</span>
      <span class="subproject-logo"><img :src="`/assets/${subproject.logo}`" :alt="subproject.university" /></span>
    </span>
    <span class="subproject-subtitle">{{ subproject.subtitle }}</span>
    <span class="subproject-foot">
      <span>{{ subproject.university }}</span>
      <b>{{ $t('home.subprojects.more') }}</b>
    </span>
  </router-link>
</template>

<script setup>
/**
 * SubprojectCard — compact dark card used on the home page.
 * @prop {Object} subproject - { id, name, subtitle, university, logo }
 * @prop {string} to - target route
 */
import { computed } from 'vue'
import { SUBPROJECTS } from '@/data/subprojects'

const props = defineProps({
  subproject: { type: Object, required: true },
  to: { type: String, required: true },
})
const sp = computed(() => SUBPROJECTS[props.subproject.id])
</script>
