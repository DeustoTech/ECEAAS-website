<template>
  <!-- =====================================================
    LegalDocument — generic renderer for a legal page
    (legal notice, privacy policy, cookie policy),
    reading title/updated/sections from an i18n key.
  ====================================================== -->
  <main>
    <section class="legal-section">
      <div class="container legal-container">
        <router-link :to="homePath" class="legal-back">{{ $t('legal.backLink') }}</router-link>
        <h1 class="legal-title">{{ $t(`${i18nKey}.title`) }}</h1>
        <p class="legal-updated">{{ $t(`${i18nKey}.updated`) }}</p>

        <div
          v-for="(section, i) in sections"
          :key="i"
          class="legal-block"
        >
          <h2 class="legal-heading">{{ section.heading }}</h2>
          <p class="legal-body">{{ section.body }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * LegalDocument — renders any of the legalNotice / privacyPolicy /
 * cookiePolicy i18n documents from a shared layout.
 *
 * Props:
 *  @prop {string} i18nKey - top-level i18n key ('legalNotice', 'privacyPolicy', 'cookiePolicy')
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  i18nKey: { type: String, required: true },
})

const { tm, locale } = useI18n()

const sections = computed(() => tm(`${props.i18nKey}.sections`))
const homePath = computed(() => (locale.value === 'en' ? '/en/' : '/es/'))
</script>
