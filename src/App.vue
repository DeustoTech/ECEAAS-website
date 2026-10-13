<template>
  <AppHeader />

  <div class="page-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <AppFooter />
</template>

<script setup>
/**
 * App.vue — root component: sticky header, routed page with a fade
 * transition, and footer.
 */
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
