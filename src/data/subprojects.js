/**
 * Shared visual identity for the three subprojects.
 * Keys match the `id` values used in the i18n files and in the
 * `custom.subproject` field of publications.json (upper-cased).
 */
export const SUBPROJECTS = {
  cog: {
    key: 'COG',
    color: '#0a4e9b',
    onDark: '#9cc8ff',
    soft: '#f1f6fd',
    grad: 'linear-gradient(135deg,#0a63c9,#0a3f85)',
    panel: 'linear-gradient(150deg,#0a63c9,#0a3f85)',
    halo: 'rgba(10,99,201,.38)',
    bar: 'linear-gradient(90deg,#0a63c9,#7cc0ff)',
  },
  isac: {
    key: 'ISAC',
    color: '#0e7c86',
    onDark: '#6fe0ea',
    soft: '#f0f8f9',
    grad: 'linear-gradient(135deg,#1aa5b0,#0a6670)',
    panel: 'linear-gradient(150deg,#1aa5b0,#0a6670)',
    halo: 'rgba(26,165,176,.38)',
    bar: 'linear-gradient(90deg,#1aa5b0,#7ee0e8)',
  },
  data: {
    key: 'DATA',
    color: '#3f7d14',
    onDark: '#bde98a',
    soft: '#f4f9ee',
    grad: 'linear-gradient(135deg,#6baa2c,#356b10)',
    panel: 'linear-gradient(150deg,#6baa2c,#356b10)',
    halo: 'rgba(107,170,44,.4)',
    bar: 'linear-gradient(90deg,#6baa2c,#bde98a)',
  },
}

/** Which subproject coordinates each work package (WP1…WP7). */
export const WP_LEADERS = ['cog', 'cog', 'isac', 'data', 'cog', 'isac', 'data']

/** Publication `custom.subproject` value → subproject id. */
export const SUBPROJECT_BY_KEY = Object.fromEntries(
  Object.entries(SUBPROJECTS).map(([id, sp]) => [sp.key, id]),
)
