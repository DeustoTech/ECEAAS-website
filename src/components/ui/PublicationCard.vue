<template>
  <article class="pub-card lift">
    <div class="pub-meta">
      <span class="badge">{{ typeLabel }}</span>
      <span v-for="sp in subprojects" :key="sp" class="badge" :class="`badge--sp-${sp}`">ECEAAS-{{ sp }}</span>
      <span v-if="item.custom?.openAccess" class="badge badge--oa">{{ $t('publications.openAccess') }}</span>
    </div>

    <h3 class="pub-title">{{ item.title }}</h3>
    <p v-if="authors" class="pub-authors">{{ authors }}</p>
    <p v-if="venue" class="pub-venue">{{ venue }}</p>

    <details v-if="item.abstract" class="pub-abstract">
      <summary>
        <span class="more">{{ $t('publications.abstract') }}</span>
        <span class="less">{{ $t('publications.hideAbstract') }}</span>
      </summary>
      <p>{{ item.abstract }}</p>
    </details>

    <div class="pub-actions">
      <a v-if="doi" :href="doi" class="pub-btn" target="_blank" rel="noopener">{{ $t('publications.actions.doi') }}</a>
      <a v-if="pdf" :href="pdf" class="pub-btn" target="_blank" rel="noopener">{{ $t('publications.actions.pdf') }}</a>
      <a v-if="item.URL && item.URL !== doi" :href="item.URL" class="pub-btn" target="_blank" rel="noopener">{{ $t('publications.actions.link') }}</a>
      <a
        v-for="l in extraLinks"
        :key="l.url"
        :href="l.url"
        class="pub-btn"
        target="_blank"
        rel="noopener"
      >{{ l.label }}</a>
      <button type="button" class="pub-btn" @click="copyCitation">
        {{ copied ? $t('publications.actions.copied') : $t('publications.actions.cite') }}
      </button>
      <button type="button" class="pub-btn" @click="downloadBibtex">{{ $t('publications.actions.bibtex') }}</button>
    </div>
  </article>
</template>

<script setup>
/**
 * PublicationCard — one CSL-JSON item rendered as a card with badges,
 * citation line, abstract, and DOI / PDF / cite / BibTeX actions.
 * @prop {Object} item - CSL-JSON item
 */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  authorsText,
  venueText,
  doiUrl,
  pdfUrl,
  subprojectsOf,
  citationText,
  bibtexText,
  downloadText,
} from '@/utils/publications'

const props = defineProps({ item: { type: Object, required: true } })
const { t, te } = useI18n()

const authors = computed(() => authorsText(props.item))
const venue = computed(() => venueText(props.item))
const doi = computed(() => doiUrl(props.item))
const pdf = computed(() => pdfUrl(props.item))
const subprojects = computed(() => subprojectsOf(props.item))
const extraLinks = computed(() => (Array.isArray(props.item.custom?.links) ? props.item.custom.links : []))
const typeLabel = computed(() => (te(`publications.types.${props.item.type}`) ? t(`publications.types.${props.item.type}`) : props.item.type))

const copied = ref(false)
async function copyCitation() {
  try {
    await navigator.clipboard.writeText(citationText(props.item))
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.prompt('Citation', citationText(props.item))
  }
}
function downloadBibtex() {
  downloadText(`${props.item.id}.bib`, bibtexText(props.item) + '\n', 'application/x-bibtex')
}
</script>
