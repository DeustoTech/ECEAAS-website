<template>
  <main>
    <PageHero :eyebrow="$t('team.hero.eyebrow')" :title="$t('team.hero.title')" :lead="$t('team.hero.lead', { pis: piCount })">
      <template #visual>
        <div class="heroviz-inline" aria-hidden="true" style="position: relative; width: 400px; height: 400px">
          <svg viewBox="0 0 400 400" style="position: absolute; inset: 0; width: 100%; height: 100%">
            <circle cx="200" cy="200" r="78" fill="none" stroke="rgba(255,255,255,.18)" />
            <circle class="flow" cx="200" cy="200" r="134" fill="none" stroke="rgba(124,192,255,.5)" />
            <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(255,255,255,.12)" />
            <g class="spin"><circle cx="200" cy="66" r="6" fill="#7cc0ff" /><circle cx="316" cy="267" r="5" fill="#9bd15b" /><circle cx="84" cy="267" r="5" fill="#4fd1e0" /></g>
            <g class="spin-r"><circle cx="200" cy="14" r="5" fill="#9bd15b" /><circle cx="386" cy="200" r="5" fill="#7cc0ff" /></g>
            <circle class="dot" cx="70" cy="120" r="3.5" fill="#fff" /><circle class="dot" cx="340" cy="90" r="3.5" fill="#fff" style="animation-delay: 1s" /><circle class="dot" cx="330" cy="330" r="3.5" fill="#fff" style="animation-delay: 2s" />
          </svg>
          <img v-for="(f, i) in floating" :key="f.photo" class="fav" :src="`/assets/${f.photo}`" alt="" :style="{ ...f.pos, animationDelay: `${i * 0.5}s` }" />
          <span class="orbit-core" style="width: 112px"><img src="/assets/LogoECEAAS.png" alt="" /></span>
        </div>
      </template>
    </PageHero>

    <section class="team-filters">
      <div class="container filters">
        <span class="filters-label">{{ $t('team.filterLabel') }}</span>
        <button class="fchip" :aria-pressed="filter === 'all'" @click="filter = 'all'">{{ $t('team.filterAll') }}</button>
        <button v-for="i in institutions" :key="i.id" class="fchip" :aria-pressed="filter === i.id" @click="filter = i.id">{{ shortName(i) }}</button>
      </div>
    </section>

    <div class="institutions">
      <section v-for="inst in visible" :key="inst.id" :id="`institution-${inst.id}`" class="institution has-bubbles">
        <span class="bubble" :style="{ left: '2%', top: '90px', width: '18px', height: '18px', background: styleOf(inst).color, opacity: 0.35 }"></span>
        <span class="bubble" :style="{ right: '2%', top: '60px', width: '28px', height: '28px', background: styleOf(inst).color, opacity: 0.2, animationDelay: '1.5s' }"></span>
        <div class="container">
          <div class="institution-card" :style="{ '--c': styleOf(inst).color, '--soft-bg': styleOf(inst).soft, '--grad': styleOf(inst).bar }">
            <div class="institution-bar"></div>
            <div class="institution-top">
              <div class="institution-id">
                <span class="institution-logo"><img :src="`/assets/${inst.logo}`" alt="" /></span>
                <h2 class="institution-name">{{ inst.name }}</h2>
                <p class="institution-group">{{ inst.groupName }}</p>
                <span class="institution-tag">{{ inst.subproject }}</span>
              </div>
              <p class="institution-desc">{{ inst.description }}</p>
            </div>
            <div class="institution-people">
              <TeamMemberCard v-for="pi in inst.pis" :key="pi.name" :member="pi" :color="styleOf(inst).color" />
              <aside class="researchers-box" :aria-label="$t('team.researchersLabel')">
                <h3 class="researchers-title">{{ $t('team.researchersLabel') }}</h3>
                <ul class="researchers-list" role="list">
                  <li v-for="r in inst.researchers" :key="r">{{ r }}</li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
/**
 * TeamView — research team, one block per university with PI cards and
 * the list of supporting researchers. A filter chip row narrows the view
 * to a single university.
 */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/sections/PageHero.vue'
import TeamMemberCard from '@/components/ui/TeamMemberCard.vue'
import { SUBPROJECTS } from '@/data/subprojects'

const { tm, rt } = useI18n()
const txt = (v) => (typeof v === 'string' ? v : rt(v))

const filter = ref('all')
const institutions = computed(() => tm('team.institutions'))
const visible = computed(() => institutions.value.filter((i) => filter.value === 'all' || i.id === filter.value))
const piCount = computed(() => institutions.value.reduce((n, i) => n + i.pis.length, 0))

const SHORT = { urv: 'URV', upna: 'UPNA', deusto: 'Deusto' }
const shortName = (i) => SHORT[i.id] ?? txt(i.name)
const styleOf = (inst) => SUBPROJECTS[txt(inst.subproject).replace('ECEAAS-', '').toLowerCase()] ?? SUBPROJECTS.cog

/** Photos orbiting the hero logo (first PI of each university + one more). */
const POS = [
  { left: '6%', top: '20%', width: '84px', height: '84px' },
  { left: '38%', top: '0', width: '96px', height: '96px' },
  { right: '4%', top: '22%', width: '80px', height: '80px' },
  { left: '0', bottom: '22%', width: '72px', height: '72px' },
  { left: '40%', bottom: '2%', width: '88px', height: '88px' },
  { right: '2%', bottom: '20%', width: '76px', height: '76px' },
]
const floating = computed(() =>
  institutions.value
    .flatMap((i) => i.pis)
    .slice(0, POS.length)
    .map((p, k) => ({ photo: txt(p.photo), pos: POS[k] })),
)
</script>
