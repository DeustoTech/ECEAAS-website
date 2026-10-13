<template>
  <article class="member-card" :style="{ '--c': color }">
    <div class="member-head">
      <span class="avatar"><img :src="`/assets/${member.photo}`" :alt="member.name" loading="lazy" /></span>
      <div>
        <h3 class="member-name">{{ member.name }}</h3>
        <p class="member-role">{{ member.role }}</p>
      </div>
    </div>
    <details class="member-bio">
      <summary>
        <span class="more">{{ $t('team.viewBio') }}</span>
        <span class="less">{{ $t('team.hideBio') }}</span>
      </summary>
      <p>{{ member.bio }}</p>
    </details>
  </article>
</template>

<script setup>
/**
 * TeamMemberCard — principal investigator with photo, role and a
 * collapsible biography.
 * @prop {Object} member - { name, role, photo, bio }
 * @prop {string} color - accent colour of the institution
 */
defineProps({
  member: { type: Object, required: true },
  color: { type: String, default: 'var(--blue)' },
})
</script>
