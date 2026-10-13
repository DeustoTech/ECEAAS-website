<template>
  <!-- Floating bubbles: purely decorative, placed absolutely inside a
       `.has-bubbles` (position:relative; overflow:hidden) section. -->
  <div :class="`bubbles bubbles--${variant}`" aria-hidden="true">
    <span class="bubble b1"></span>
    <span class="bubble b2"></span>
    <span class="bubble b3"></span>
    <span class="bubble b4"></span>
  </div>
</template>

<script setup>
/**
 * @prop {'a'|'b'|'c'} variant - position/colour preset (see components.css)
 */
defineProps({
  variant: { type: String, default: 'a' },
})
</script>
