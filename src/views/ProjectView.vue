<template>
  <main>
    <PageHero :eyebrow="$t('project.hero.eyebrow')" :title="$t('project.hero.title')" :lead="$t('project.coordinatedText')">
      <template #visual>
        <HeroOrbit :chips="chips" :size="360" />
      </template>
    </PageHero>

    <!-- Subprojects: three stacked blocks, each with its own animation -->
    <section class="section has-bubbles" aria-labelledby="sp-title">
      <Bubbles variant="a" />
      <div class="container">
        <p class="eyebrow">{{ $t('project.subprojectsEyebrow') }}</p>
        <h2 class="section-title" id="sp-title">{{ $t('project.subprojectsTitle') }}</h2>
        <div class="sp-list" style="margin-top: 48px">
          <SubprojectBlock
            v-for="(sp, i) in subprojects"
            :key="sp.id"
            :subproject="sp"
            :group="groupOf(sp.id)"
            :flip="i % 2 === 1"
          />
        </div>
      </div>
    </section>

    <!-- Work packages: leader / contributor matrix -->
    <section class="dark-surface section" aria-labelledby="wp-title">
      <div class="orb orb--blue" style="width: 420px; height: 420px; left: -120px; top: -60px"></div>
      <div class="orb orb--teal" style="width: 360px; height: 360px; right: -100px; bottom: -80px"></div>
      <div class="gridbg"></div>
      <Bubbles variant="b" />
      <div class="container">
        <div class="wp-head">
          <div>
            <p class="eyebrow eyebrow--light">{{ $t('project.wpEyebrow') }}</p>
            <h2 class="section-title" id="wp-title">{{ $t('project.wpHeadline') }}</h2>
          </div>
          <p>{{ $t('project.wpLead') }}</p>
        </div>
        <WpMatrix />
      </div>
    </section>
  </main>
</template>

<script setup>
/**
 * ProjectView — project structure: coordinated-project hero, the three
 * subproject blocks (each with its own animation) and the WP matrix.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Bubbles from '@/components/decor/Bubbles.vue'
import HeroOrbit from '@/components/decor/HeroOrbit.vue'
import PageHero from '@/components/sections/PageHero.vue'
import SubprojectBlock from '@/components/ui/SubprojectBlock.vue'
import WpMatrix from '@/components/ui/WpMatrix.vue'

const { tm, rt } = useI18n()
const txt = (v) => (typeof v === 'string' ? v : rt(v))

const subprojects = computed(() => tm('project.subprojects'))
const chips = computed(() => subprojects.value.map((sp) => ({ label: txt(sp.name) })))

/** Research group of the institution that hosts each subproject. */
const groupOf = (id) => {
  const inst = tm('team.institutions').find((i) => txt(i.subproject).toLowerCase() === `eceaas-${id}`)
  return inst ? txt(inst.groupName) : ''
}
</script>
