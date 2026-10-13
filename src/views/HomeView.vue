<template>
  <main>
    <!-- Hero (dark, animated) -->
    <section class="dark-surface">
      <div class="orb orb--blue" style="width: 520px; height: 520px; left: -120px; top: -80px"></div>
      <div class="orb orb--teal" style="width: 440px; height: 440px; right: -100px; top: 120px"></div>
      <div class="orb orb--green" style="width: 360px; height: 360px; left: 38%; bottom: -160px"></div>
      <div class="gridbg"></div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="hero-badge rise"><i></i>{{ $t('hero.eyebrow') }}</p>
          <h1 class="hero-title rise" style="animation-delay: 0.1s">
            {{ $t('home.heroTitleLead') }} <span class="gradtext">{{ $t('home.heroTitleAccent') }}</span>
          </h1>
          <p class="hero-lead rise" style="animation-delay: 0.2s">{{ $t('hero.lead') }}</p>
          <div class="hero-actions rise" style="animation-delay: 0.3s">
            <router-link :to="paths.project" class="btn btn--lime">{{ $t('hero.ctaProject') }}</router-link>
            <router-link :to="paths.team" class="btn btn--ghost">{{ $t('hero.ctaTeam') }}</router-link>
          </div>
        </div>
        <div class="hero-visual rise" style="animation-delay: 0.25s">
          <HeroOrbit :chips="chips" />
        </div>
      </div>
      <svg class="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 90, 480 0, 720 30 S 1200 80, 1440 20 L1440 70 L0 70 Z" fill="#fff" />
      </svg>
    </section>

    <UniversityMarquee :label="$t('home.partners')" />

    <!-- Key figures -->
    <section class="has-bubbles" :aria-label="$t('home.stats.objectives')">
      <Bubbles variant="a" />
      <div class="container stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <div class="stat-big">{{ s.big }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section">
      <div class="container">
        <p class="eyebrow">{{ $t('home.how.eyebrow') }}</p>
        <h2 class="section-title">{{ $t('home.how.title') }}</h2>
        <p class="section-lead">{{ $t('home.how.lead') }}</p>
        <div class="steps">
          <svg class="steps-line" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
            <line class="flow" x1="0" y1="2" x2="1000" y2="2" stroke="#9db8d9" stroke-width="2" />
          </svg>
          <div v-for="(s, i) in steps" :key="i" class="step" :style="{ '--g': STEP_STYLES[i].g, '--sh': STEP_STYLES[i].sh, '--c': STEP_STYLES[i].c }">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-sub">{{ s.sub }}</div>
            <h3 class="step-title">{{ s.title }}</h3>
            <p class="step-text">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="section section--soft has-bubbles" aria-labelledby="about-title">
      <Bubbles variant="a" />
      <div class="container about">
        <div class="about-head">
          <p class="eyebrow">{{ $t('home.aboutTitle') }}</p>
          <h2 class="section-title" id="about-title">{{ $t('home.aboutHeadline') }}</h2>
        </div>
        <div class="about-text">
          <p>{{ $t('home.about1') }}</p>
          <p>{{ $t('home.about2') }}</p>
        </div>
      </div>
    </section>

    <!-- Objectives (grouped) -->
    <section class="section has-bubbles" aria-labelledby="objectives-title">
      <Bubbles variant="c" />
      <div class="container">
        <p class="eyebrow">{{ $t('home.objectivesEyebrow') }}</p>
        <h2 class="section-title" id="objectives-title">{{ $t('home.objectivesHeadline') }}</h2>
        <div class="pillars">
          <div v-for="(p, pi) in pillars" :key="pi" class="pillar" :style="{ '--c': PILLAR_STYLES[pi].c }">
            <div class="pillar-intro">
              <div class="pillar-bar"></div>
              <h3 class="pillar-title">{{ p.title }}</h3>
              <p class="pillar-desc">{{ p.desc }}</p>
            </div>
            <div class="pillar-items">
              <ObjectiveCard
                v-for="o in p.items"
                :key="o.number"
                :number="o.number"
                :title="o.title"
                :text="o.text"
                :tint="PILLAR_STYLES[pi].tint"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Subprojects (dark) -->
    <section class="dark-surface section">
      <div class="orb orb--blue" style="width: 420px; height: 420px; right: -120px; top: -100px"></div>
      <div class="orb orb--teal" style="width: 320px; height: 320px; left: -100px; bottom: -60px"></div>
      <div class="gridbg"></div>
      <Bubbles variant="b" />
      <svg class="section-deco" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,.14)" />
        <circle class="flow" cx="200" cy="200" r="130" fill="none" stroke="rgba(124,192,255,.4)" />
        <g class="spin"><circle cx="200" cy="70" r="6" fill="#7cc0ff" /><circle cx="313" cy="265" r="5" fill="#9bd15b" /></g>
        <g class="spin-r"><circle cx="200" cy="20" r="5" fill="#4fd1e0" /></g>
      </svg>
      <div class="container">
        <p class="eyebrow eyebrow--light">{{ $t('home.subprojects.eyebrow') }}</p>
        <h2 class="section-title on-dark">{{ $t('home.subprojects.title') }}</h2>
        <p class="section-lead" style="color: #b8c9dd">{{ $t('home.subprojects.lead') }}</p>
        <div class="subprojects-row">
          <SubprojectCard v-for="sp in subprojects" :key="sp.id" :subproject="sp" :to="paths.project" />
        </div>
      </div>
    </section>

    <!-- Team teaser -->
    <section class="section has-bubbles">
      <Bubbles variant="a" />
      <div class="container teaser">
        <div class="teaser-copy">
          <p class="eyebrow">{{ $t('home.team.eyebrow') }}</p>
          <h2 class="section-title">{{ $t('home.team.title') }}</h2>
          <p class="section-lead">{{ $t('home.team.lead', { pis: pis.length, researchers: researcherCount }) }}</p>
          <router-link :to="paths.team" class="btn btn--blue">{{ $t('home.team.cta') }}</router-link>
        </div>
        <div class="teaser-people">
          <ul class="teaser-avatars" role="list">
            <li v-for="p in pis" :key="p.name" class="teaser-person lift" :style="{ '--c': p.color }">
              <img :src="`/assets/${p.photo}`" :alt="p.name" loading="lazy" />
              <span>{{ p.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Funding -->
    <section class="funding">
      <div class="container">
        <p>
          {{ $t('footer.fundedBy') }} <strong>{{ $t('footer.agency') }}</strong> · {{ $t('hero.funding') }} ·
          <strong>{{ $t('hero.pids') }}</strong>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * HomeView — landing page: animated hero, partner marquee, key figures,
 * "how it works", about, grouped objectives, subprojects, team teaser.
 * Counts (universities, work packages, researchers…) are derived from
 * the i18n data so they never go out of sync with the content.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Bubbles from '@/components/decor/Bubbles.vue'
import HeroOrbit from '@/components/decor/HeroOrbit.vue'
import UniversityMarquee from '@/components/sections/UniversityMarquee.vue'
import ObjectiveCard from '@/components/ui/ObjectiveCard.vue'
import SubprojectCard from '@/components/ui/SubprojectCard.vue'
import { SUBPROJECTS } from '@/data/subprojects'

const { tm, rt, locale } = useI18n()
const txt = (v) => (typeof v === 'string' ? v : rt(v))

const paths = computed(() =>
  locale.value === 'en' ? { project: '/en/project', team: '/en/team' } : { project: '/es/proyecto', team: '/es/equipo' },
)

const chips = computed(() => tm('home.chips').map((c) => ({ label: txt(c) })))
const subprojects = computed(() => tm('project.subprojects'))
const institutions = computed(() => tm('team.institutions'))

const stats = computed(() => [
  { big: institutions.value.length, label: txt(tm('home.stats.universities')) },
  { big: subprojects.value.length, label: txt(tm('home.stats.subprojects')) },
  { big: tm('project.workPackages').length, label: txt(tm('home.stats.workPackages')) },
  { big: tm('home.objectives').length, label: txt(tm('home.stats.objectives')) },
])

const STEP_STYLES = [
  { g: 'linear-gradient(135deg,#0a63c9,#0a4e9b)', sh: 'rgba(10,78,155,.3)', c: '#0a4e9b' },
  { g: 'linear-gradient(135deg,#2e9e8f,#0e7c86)', sh: 'rgba(14,124,134,.3)', c: '#0e7c86' },
  { g: 'linear-gradient(135deg,#0a4e9b,#3b2fa0)', sh: 'rgba(59,47,160,.28)', c: '#3b2fa0' },
  { g: 'linear-gradient(135deg,#6baa2c,#3f7d14)', sh: 'rgba(63,125,20,.3)', c: '#3f7d14' },
]
const steps = computed(() => tm('home.how.steps').map((s) => ({ sub: txt(s.sub), title: txt(s.title), text: txt(s.text) })))

const PILLAR_STYLES = [
  { c: '#0a4e9b', tint: '#e6effa' },
  { c: '#0e7c86', tint: '#ddf1f2' },
  { c: '#3f7d14', tint: '#e8f3db' },
]
const pillars = computed(() => {
  const texts = tm('home.objectives').map(txt)
  const titles = tm('home.objectiveTitles').map(txt)
  return tm('home.pillars').map((p, pi) => ({
    title: txt(p.title),
    desc: txt(p.desc),
    items: [0, 1, 2].map((k) => {
      const i = pi * 3 + k
      return { number: String(i + 1).padStart(2, '0'), title: titles[i], text: texts[i] }
    }),
  }))
})

const pis = computed(() =>
  institutions.value.flatMap((inst) => {
    const id = txt(inst.subproject).replace('ECEAAS-', '').toLowerCase()
    return inst.pis.map((p) => ({ name: txt(p.name), photo: txt(p.photo), color: SUBPROJECTS[id]?.color }))
  }),
)
const researcherCount = computed(() => institutions.value.reduce((n, i) => n + i.researchers.length, 0))
</script>
