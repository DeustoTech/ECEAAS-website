<template>
  <main>
    <PageHero :eyebrow="$t('footer.legal')" :title="$t(`${i18nKey}.title`)" :lead="$t(`${i18nKey}.updated`)" />
    <section class="legal-section">
      <div class="container legal-container">
        <router-link :to="homePath" class="legal-back">{{ $t('legal.backLink') }}</router-link>
        <div v-for="(section, i) in sections" :key="i" class="legal-block" :class="{ 'legal-block--first': i === 0 }">
          <h2 class="legal-heading">{{ section.heading }}</h2>
          <p class="legal-body">{{ section.body }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * LegalDocument — shared layout for legal notice, privacy and cookie
 * policies, read from an i18n key with { title, updated, sections[] }.
 * @prop {string} i18nKey - 'legalNotice' | 'privacyPolicy' | 'cookiePolicy'
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/sections/PageHero.vue'

const props = defineProps({ i18nKey: { type: String, required: true } })
const { tm, locale } = useI18n()

const sections = computed(() => tm(`${props.i18nKey}.sections`))
const homePath = computed(() => (locale.value === 'en' ? '/en/' : '/es/'))
</script>
