<template>
  <!--
    App.vue — Root application component.
    Mounts the fixed header, animated router-view and footer.
    The <div class="page-content"> provides top padding
    that offsets the fixed header height (--header-height).
  -->
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
 * App.vue — root component.
 * Provides: fixed AppHeader, animated page transitions via
 * <transition name="fade">, and AppFooter.
 */
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
