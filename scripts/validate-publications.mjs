#!/usr/bin/env node
/**
 * Validates public/data/publications.json (CSL-JSON + ECEAAS `custom`).
 *
 *   node scripts/validate-publications.mjs [path/to/file.json]
 *
 * Exit code 1 when there are errors (so `npm run build` fails before a
 * broken file is published). Warnings never fail the build.
 * No dependencies: only Node's standard library.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const file = resolve(process.argv[2] ?? join(root, 'public/data/publications.json'))
const allowExamples = process.argv.includes('--allow-examples')

const TYPES = ['article-journal', 'paper-conference', 'chapter', 'book', 'thesis', 'report', 'dataset', 'software', 'webpage', 'article', 'speech', 'poster']
const SUBPROJECTS = ['COG', 'ISAC', 'DATA']
const WPS = ['WP1', 'WP2', 'WP3', 'WP4', 'WP5', 'WP6', 'WP7']
const KNOWN_KEYS = new Set([
  'id', 'type', 'title', 'author', 'editor', 'issued', 'container-title', 'container-title-short', 'collection-title',
  'volume', 'issue', 'page', 'number-of-pages', 'publisher', 'publisher-place', 'event-title', 'event-place',
  'genre', 'DOI', 'ISBN', 'ISSN', 'URL', 'abstract', 'keyword', 'language', 'note', 'source', 'license', 'accessed', 'custom',
])
const CUSTOM_KEYS = new Set(['subproject', 'wp', 'pdf', 'openAccess', 'featured', 'links'])

const errors = []
const warnings = []
const err = (where, msg) => errors.push(`${where}: ${msg}`)
const warn = (where, msg) => warnings.push(`${where}: ${msg}`)
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v)
const isStr = (v) => typeof v === 'string' && v.trim() !== ''
const isHttp = (v) => { try { return ['http:', 'https:'].includes(new URL(v).protocol) } catch { return false } }

let data
try {
  data = JSON.parse(readFileSync(file, 'utf8'))
} catch (e) {
  console.error(`✖ Cannot read ${file}: ${e.message}`)
  process.exit(1)
}
if (!Array.isArray(data)) {
  console.error('✖ The file must contain a JSON array of CSL-JSON items.')
  process.exit(1)
}

const ids = new Set()
const dois = new Map()
const thisYear = new Date().getFullYear()

data.forEach((item, idx) => {
  const where = `#${idx + 1}${isStr(item?.id) ? ` (${item.id})` : ''}`
  if (!isObj(item)) return err(where, 'must be an object')

  // id
  if (!isStr(item.id)) err(where, '`id` is required')
  else {
    if (!/^[A-Za-z0-9_.:-]+$/.test(item.id)) err(where, '`id` may only contain letters, digits and _ . : -')
    if (ids.has(item.id)) err(where, 'duplicated `id`')
    ids.add(item.id)
    if (item.id.startsWith('example-') && !allowExamples) err(where, 'ids starting with "example-" are sample data and must not be published')
  }

  // type / title
  if (!TYPES.includes(item.type)) err(where, `\`type\` must be one of: ${TYPES.join(', ')}`)
  if (!isStr(item.title)) err(where, '`title` is required')

  // people
  const people = [...(Array.isArray(item.author) ? item.author : []), ...(Array.isArray(item.editor) ? item.editor : [])]
  if (item.author !== undefined && !Array.isArray(item.author)) err(where, '`author` must be an array')
  if (!people.length && !['dataset', 'software', 'webpage'].includes(item.type)) err(where, 'at least one `author` (or `editor`) is required')
  people.forEach((p, i) => {
    if (!isObj(p)) return err(where, `author[${i}] must be an object`)
    if (!isStr(p.literal) && !(isStr(p.family) && isStr(p.given))) err(where, `author[${i}] needs {"family","given"} or {"literal"}`)
    if (isStr(p.family) && p.family.includes(',')) warn(where, `author[${i}].family contains a comma; use separate family/given fields`)
  })

  // issued
  const dp = item.issued?.['date-parts']
  if (isStr(item.issued?.literal) && !dp) {
    if (!/\d{4}/.test(item.issued.literal)) err(where, '`issued.literal` must contain a year')
  } else if (!Array.isArray(dp) || !Array.isArray(dp[0]) || !dp[0].length) {
    err(where, '`issued` must be {"date-parts": [[YYYY, MM, DD]]}')
  } else {
    const [y, m, d] = dp[0]
    if (!Number.isInteger(y) || y < 1900 || y > thisYear + 1) err(where, `issued year "${y}" is not valid (numbers, 1900–${thisYear + 1})`)
    if (m !== undefined && (!Number.isInteger(m) || m < 1 || m > 12)) err(where, `issued month "${m}" must be 1–12`)
    if (d !== undefined && (!Number.isInteger(d) || d < 1 || d > 31)) err(where, `issued day "${d}" must be 1–31`)
  }

  // identifiers and links
  if (item.DOI !== undefined) {
    if (!/^10\.\d{4,9}\/\S+$/.test(String(item.DOI))) err(where, '`DOI` must look like 10.1234/abc (without https://doi.org/)')
    else {
      const key = item.DOI.toLowerCase()
      if (dois.has(key)) err(where, `DOI already used by ${dois.get(key)}`)
      dois.set(key, where)
    }
  }
  if (item.URL !== undefined && !isHttp(item.URL)) err(where, '`URL` must be an http(s) URL')
  if (item.ISSN !== undefined && !/^\d{4}-\d{3}[\dX]$/.test(String(item.ISSN))) err(where, '`ISSN` must look like 1234-5678')
  if (item.ISBN !== undefined && !/^[\d-]{10,17}X?$/.test(String(item.ISBN))) err(where, '`ISBN` is not valid')
  if (item.keyword !== undefined && typeof item.keyword !== 'string') err(where, '`keyword` must be a comma-separated string')
  if (item.abstract !== undefined && !isStr(item.abstract)) err(where, '`abstract` must be a non-empty string')
  if (item.language !== undefined && !/^[a-z]{2}(-[A-Z]{2})?$/.test(String(item.language))) warn(where, '`language` should be an ISO code such as "en" or "es"')
  if (!item.DOI && !item.URL && !item.custom?.pdf) warn(where, 'no DOI, URL or PDF: readers will have nothing to open')

  // container
  if (['article-journal', 'paper-conference', 'chapter'].includes(item.type) && !isStr(item['container-title']) && !isStr(item['event-title'])) {
    warn(where, '`container-title` (journal / proceedings / book) is recommended')
  }

  // custom (ECEAAS)
  if (item.custom !== undefined) {
    if (!isObj(item.custom)) return err(where, '`custom` must be an object')
    const c = item.custom
    for (const k of Object.keys(c)) if (!CUSTOM_KEYS.has(k)) warn(where, `unknown custom key "${k}" (ignored by the website)`)
    for (const s of [].concat(c.subproject ?? [])) if (!SUBPROJECTS.includes(s)) err(where, `custom.subproject "${s}" must be one of ${SUBPROJECTS.join(', ')}`)
    for (const w of [].concat(c.wp ?? [])) if (!WPS.includes(w)) err(where, `custom.wp "${w}" must be one of ${WPS.join(', ')}`)
    if (c.openAccess !== undefined && typeof c.openAccess !== 'boolean') err(where, 'custom.openAccess must be true or false')
    if (c.featured !== undefined && typeof c.featured !== 'boolean') err(where, 'custom.featured must be true or false')
    if (c.pdf !== undefined) {
      if (!isStr(c.pdf)) err(where, 'custom.pdf must be a string')
      else if (!isHttp(c.pdf)) {
        if (!/^publications\/[^/].*\.pdf$/i.test(c.pdf)) err(where, 'custom.pdf must be "publications/<file>.pdf" or an https URL')
        else if (!existsSync(join(root, 'public', c.pdf))) err(where, `custom.pdf file not found: public/${c.pdf}`)
      }
    }
    if (c.links !== undefined) {
      if (!Array.isArray(c.links)) err(where, 'custom.links must be an array of {"label","url"}')
      else c.links.forEach((l, i) => { if (!isStr(l?.label) || !isHttp(l?.url)) err(where, `custom.links[${i}] needs "label" and an http(s) "url"`) })
    }
  } else {
    warn(where, 'no `custom.subproject`: it will not appear in the subproject filter')
  }

  for (const k of Object.keys(item)) if (!KNOWN_KEYS.has(k)) warn(where, `unknown field "${k}" (ignored by the website)`)
})

const rel = file.startsWith(root) ? file.slice(root.length + 1) : file
for (const w of warnings) console.warn(`⚠ ${w}`)
for (const e of errors) console.error(`✖ ${e}`)
if (errors.length) {
  console.error(`\n✖ ${rel}: ${errors.length} error(s), ${warnings.length} warning(s) in ${data.length} publication(s).`)
  process.exit(1)
}
console.log(`✔ ${rel}: ${data.length} publication(s) valid${warnings.length ? ` (${warnings.length} warning(s))` : ''}.`)
