<template>
  <main>
    <PageHero :eyebrow="$t('publications.eyebrow')" :title="$t('publications.headline')" :lead="$t('publications.lead')" />

    <section class="pub-section">
      <div class="container">
        <p v-if="state === 'loading'" class="pub-count" role="status">{{ $t('publications.loading') }}</p>

        <div v-else-if="state === 'error'" class="pub-empty" role="alert">
          <h2>{{ $t('publications.error') }}</h2>
        </div>

        <div v-else-if="!items.length" class="pub-empty">
          <h2>{{ $t('publications.emptyTitle') }}</h2>
          <p>{{ $t('publications.emptyText') }}</p>
        </div>

        <template v-else>
          <div class="pub-toolbar" role="search">
            <label class="sr-only" for="pub-q">{{ $t('publications.searchLabel') }}</label>
            <input id="pub-q" v-model="query" class="pub-search" type="search" :placeholder="$t('publications.searchPlaceholder')" />
            <label class="sr-only" for="pub-year">{{ $t('publications.year') }}</label>
            <select id="pub-year" v-model="year" class="pub-select">
              <option value="">{{ $t('publications.allYears') }}</option>
              <option v-for="y in years" :key="y" :value="String(y)">{{ y }}</option>
            </select>
            <label class="sr-only" for="pub-type">{{ $t('publications.type') }}</label>
            <select id="pub-type" v-model="type" class="pub-select">
              <option value="">{{ $t('publications.allTypes') }}</option>
              <option v-for="tp in types" :key="tp" :value="tp">{{ typeLabel(tp) }}</option>
            </select>
            <label class="sr-only" for="pub-sp">{{ $t('publications.subproject') }}</label>
            <select id="pub-sp" v-model="sp" class="pub-select">
              <option value="">{{ $t('publications.allSubprojects') }}</option>
              <option v-for="s in subprojectKeys" :key="s" :value="s">ECEAAS-{{ s }}</option>
            </select>
            <button v-if="hasFilters" type="button" class="pub-btn" @click="reset">{{ $t('publications.clear') }}</button>
          </div>

          <p class="pub-count" role="status">
            {{ filtered.length === 1 ? $t('publications.countOne') : $t('publications.count', { n: filtered.length }) }}
          </p>

          <div v-if="!filtered.length" class="pub-empty">
            <h2>{{ $t('publications.noResultsTitle') }}</h2>
            <p>{{ $t('publications.noResultsText') }}</p>
          </div>

          <template v-for="group in grouped" :key="group.year">
            <h2 class="pub-year">{{ group.year || '—' }}</h2>
            <div class="pub-list">
              <PublicationCard v-for="item in group.items" :key="item.id" :item="item" />
            </div>
          </template>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * PublicationsView — lists the project's publications from
 * /data/publications.json (CSL-JSON). Supports free-text search and
 * year / type / subproject filters; results are grouped by year.
 */
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/sections/PageHero.vue'
import PublicationCard from '@/components/ui/PublicationCard.vue'
import { loadPublications, matchesQuery, sortPublications, subprojectsOf, yearOf } from '@/utils/publications'

const { t, te } = useI18n()

const items = ref([])
const state = ref('loading') // loading | ready | error

const query = ref('')
const year = ref('')
const type = ref('')
const sp = ref('')

onMounted(async () => {
  try {
    items.value = sortPublications(await loadPublications())
    state.value = 'ready'
  } catch (e) {
    console.error('[publications]', e)
    state.value = 'error'
  }
})

const years = computed(() => [...new Set(items.value.map(yearOf).filter(Boolean))].sort((a, b) => b - a))
const types = computed(() => [...new Set(items.value.map((i) => i.type))])
const subprojectKeys = computed(() => [...new Set(items.value.flatMap(subprojectsOf))].sort())
const typeLabel = (tp) => (te(`publications.types.${tp}`) ? t(`publications.types.${tp}`) : tp)

const filtered = computed(() =>
  items.value.filter(
    (i) =>
      matchesQuery(i, query.value) &&
      (!year.value || String(yearOf(i)) === year.value) &&
      (!type.value || i.type === type.value) &&
      (!sp.value || subprojectsOf(i).includes(sp.value)),
  ),
)

const grouped = computed(() => {
  const map = new Map()
  for (const item of filtered.value) {
    const y = yearOf(item)
    if (!map.has(y)) map.set(y, [])
    map.get(y).push(item)
  }
  return [...map.entries()].map(([y, list]) => ({ year: y, items: list }))
})

const hasFilters = computed(() => !!(query.value || year.value || type.value || sp.value))
function reset() {
  query.value = year.value = type.value = sp.value = ''
}
</script>
