<template>
  <!-- =====================================================
    WpDistributionTable — leader/contributor matrix of the
    three subprojects across the seven work packages.
  ====================================================== -->
  <div class="wp-dist-card">

    <div class="wp-dist-legend">
      <div class="wp-dist-legend-item">
        <span class="wp-dist-badge leader">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        Coordinador de WP
      </div>
      <div class="wp-dist-legend-item">
        <span class="wp-dist-badge contributor">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </span>
        Participante
      </div>
    </div>

    <div class="wp-dist-table">
      <div class="wp-dist-cell head"><span class="wp-dist-eyebrow">Paquete de trabajo</span></div>
      <div class="wp-dist-cell head logo"><img src="/assets/urv.png" alt="URV" /></div>
      <div class="wp-dist-cell head logo"><img src="/assets/upna.png" alt="UPNA" /></div>
      <div class="wp-dist-cell head logo"><img src="/assets/deusto.png" alt="Deusto" /></div>

      <template v-for="wp in rows" :key="wp.label">
        <div class="wp-dist-cell label">{{ wp.label }}</div>
        <div class="wp-dist-cell mark">
          <span class="wp-dist-badge" :class="wp.leader === 'cog' ? 'leader' : 'contributor'">
            <svg v-if="wp.leader === 'cog'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </div>
        <div class="wp-dist-cell mark">
          <span class="wp-dist-badge" :class="wp.leader === 'isac' ? 'leader' : 'contributor'">
            <svg v-if="wp.leader === 'isac'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </div>
        <div class="wp-dist-cell mark">
          <span class="wp-dist-badge" :class="wp.leader === 'data' ? 'leader' : 'contributor'">
            <svg v-if="wp.leader === 'data'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
/**
 * WpDistributionTable — WP leader/contributor matrix.
 * Leadership follows each subproject's area: COG (URV) coordinates
 * project management, ethics and cognitive integration; ISAC (UPNA)
 * leads comms/sensing and pilots; DATA (Deusto) leads the data
 * pipeline and dissemination.
 */
const rows = [
  { label: 'WP1 — Gestión y Coordinación', leader: 'cog' },
  { label: 'WP2 — Seguridad, Privacidad e IA Ética', leader: 'cog' },
  { label: 'WP3 — Comunicaciones y Sensado', leader: 'isac' },
  { label: 'WP4 — Datos Multimodales', leader: 'data' },
  { label: 'WP5 — Integración Cognitiva', leader: 'cog' },
  { label: 'WP6 — Pilotos y Validación', leader: 'isac' },
  { label: 'WP7 — Diseminación y Explotación', leader: 'data' },
]
</script>
