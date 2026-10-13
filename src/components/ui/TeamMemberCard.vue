<template>
  <!-- =====================================================
    TeamMemberCard — photo + name + role + bio snippet
  ====================================================== -->
  <article class="team-member-card">
    <div class="member-photo-wrap">
      <img
        :src="`/assets/${member.photo}`"
        :alt="member.name"
        class="member-photo"
        loading="lazy"
      />
    </div>
    <div class="member-info">
      <h3 class="member-name">{{ member.name }}</h3>
      <p class="member-role">{{ member.role }}</p>
      <p class="member-bio">{{ member.bio }}</p>
    </div>
  </article>
</template>

<script setup>
/**
 * TeamMemberCard — displays a team member's photo, name, role and bio.
 *
 * Props:
 *  @prop {Object} member - Member data from i18n locale
 *    { name, role, photo, bio }
 */
defineProps({
  member: { type: Object, required: true },
})
</script>
