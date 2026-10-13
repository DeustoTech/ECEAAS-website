<template>
  <div class="matrix-scroll">
    <div class="matrix" role="table" :aria-label="$t('project.wpHeadline')">
      <div class="matrix-row matrix-head" role="row">
        <div class="matrix-label" role="columnheader">
          <span class="matrix-eyebrow">{{ $t('project.matrix.head') }}</span>
          <span class="matrix-legend">
            <span><i class="legend-dot legend-dot--lead">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </i>{{ $t('project.matrix.leads') }}</span>
            <span><i class="legend-dot legend-dot--plus">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#6b7f95" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </i>{{ $t('project.matrix.contributes') }}</span>
          </span>
        </div>
        <div v-for="sp in subprojects" :key="sp.id" class="matrix-col" role="columnheader" :style="{ '--c': SUBPROJECTS[sp.id].color }">
          <img :src="`/assets/${sp.logo}`" :alt="sp.university" />
          <b>{{ sp.name }}</b>
        </div>
      </div>

      <div v-for="(wp, r) in rows" :key="wp.code" class="matrix-row mrow" role="row">
        <div class="mrow-title" role="rowheader">
          <span class="wp-code">{{ wp.code }}</span>
          <span>{{ wp.title }}</span>
        </div>
        <div v-for="sp in subprojects" :key="sp.id" class="mcell" role="cell">
          <span
            v-if="WP_LEADERS[r] === sp.id"
            class="mark-lead"
            :style="{ '--g': SUBPROJECTS[sp.id].grad, '--halo': SUBPROJECTS[sp.id].halo }"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" :aria-label="$t('project.matrix.leads')"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <span v-else class="mark-plus">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" role="img" :aria-label="$t('project.matrix.contributes')"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </div>
      </div>

      <div class="matrix-row matrix-total" role="row">
        <div class="matrix-eyebrow" role="rowheader">{{ $t('project.matrix.totals') }}</div>
        <div v-for="sp in subprojects" :key="sp.id" class="matrix-total-cell" role="cell" :style="{ '--c': SUBPROJECTS[sp.id].color, '--g': SUBPROJECTS[sp.id].grad }">
          <strong>{{ ledBy(sp.id) }}<small> / {{ rows.length }}</small></strong>
          <span class="bar"><i :style="{ width: Math.round((ledBy(sp.id) / rows.length) * 100) + '%' }"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * WpMatrix — leader / contributor matrix of the three subprojects across
 * the seven work packages. Leadership comes from WP_LEADERS; titles come
 * from the i18n list `project.workPackages` ("WP1. Title").
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUBPROJECTS, WP_LEADERS } from '@/data/subprojects'

const { tm, rt } = useI18n()

const subprojects = computed(() => tm('project.subprojects'))
const rows = computed(() =>
  tm('project.workPackages').map((raw) => {
    const text = typeof raw === 'string' ? raw : rt(raw)
    const dot = text.indexOf('.')
    return { code: text.slice(0, dot), title: text.slice(dot + 1).trim() }
  }),
)
const ledBy = (id) => WP_LEADERS.filter((l) => l === id).length
</script>
