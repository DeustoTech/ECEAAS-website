/**
 * Helpers for the publications page.
 *
 * Data format: CSL-JSON (Citation Style Language), the de-facto standard
 * exported by Zotero, Mendeley, EndNote, Crossref and others. ECEAAS-
 * specific metadata lives in the standard `custom` object. See
 * the "Publications — upload protocol" section of README.md.
 */

/** Fetches and returns the publications array (empty on 404 / empty file). */
export async function loadPublications() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/publications.json`, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('publications.json must be a JSON array')
  return data
}

/** Publication year as a number (0 when unknown). */
export function yearOf(item) {
  const y = item.issued?.['date-parts']?.[0]?.[0]
  if (y) return Number(y)
  const m = String(item.issued?.literal ?? '').match(/\d{4}/)
  return m ? Number(m[0]) : 0
}

/** Sortable key: year, month, day. */
function dateKey(item) {
  const [y = 0, m = 0, d = 0] = item.issued?.['date-parts']?.[0] ?? [yearOf(item)]
  return y * 10000 + m * 100 + d
}

/** Newest first, then alphabetical by title. */
export function sortPublications(list) {
  return [...list].sort((a, b) => dateKey(b) - dateKey(a) || String(a.title).localeCompare(String(b.title)))
}

function nameParts(p) {
  if (p.literal) return { family: p.literal, initials: '' }
  const initials = String(p.given ?? '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((g) => g[0].toUpperCase() + '.')
    .join(' ')
  return { family: p.family ?? '', initials }
}

/** "Casino, F., Martínez-Ballesté, A." (editors if there are no authors). */
export function authorsText(item, max = 8) {
  const people = item.author?.length ? item.author : item.editor ?? []
  const names = people.map((p) => {
    const { family, initials } = nameParts(p)
    return initials ? `${family}, ${initials}` : family
  })
  if (names.length > max) return `${names.slice(0, max).join(', ')}, et al.`
  return names.join(', ')
}

/** Journal / conference / publisher line. */
export function venueText(item) {
  const venue = item['container-title'] || item['event-title'] || item.publisher || ''
  const vol = item.volume ? ` ${item.volume}` : ''
  const issue = item.issue ? `(${item.issue})` : ''
  const pages = item.page ? `, ${item.page}` : ''
  return venue ? `${venue}${vol}${issue}${pages}` : ''
}

/** Link to the DOI resolver. */
export function doiUrl(item) {
  return item.DOI ? `https://doi.org/${item.DOI}` : ''
}

/** Resolves `custom.pdf` (relative path under /publications/ or absolute URL). */
export function pdfUrl(item) {
  const pdf = item.custom?.pdf
  if (!pdf) return ''
  return /^https?:\/\//i.test(pdf) ? pdf : `${import.meta.env.BASE_URL}${pdf.replace(/^\//, '')}`
}

/** Subproject keys (COG / ISAC / DATA) of an item. */
export function subprojectsOf(item) {
  const s = item.custom?.subproject
  return Array.isArray(s) ? s : s ? [s] : []
}

/** Plain-text citation (APA-like). */
export function citationText(item) {
  const parts = [`${authorsText(item, 20)} (${yearOf(item) || 'n.d.'}). ${String(item.title).replace(/\.$/, '')}.`]
  const venue = venueText(item)
  if (venue) parts.push(`${venue}.`)
  else if (item.publisher) parts.push(`${item.publisher}.`)
  const link = doiUrl(item) || item.URL
  if (link) parts.push(link)
  return parts.join(' ')
}

const BIBTEX_TYPES = {
  'article-journal': 'article',
  'paper-conference': 'inproceedings',
  chapter: 'incollection',
  book: 'book',
  thesis: 'phdthesis',
  report: 'techreport',
}

/** BibTeX entry for one item. */
export function bibtexText(item) {
  const type = BIBTEX_TYPES[item.type] ?? 'misc'
  const key = String(item.id).replace(/[^A-Za-z0-9_:.-]/g, '_')
  const people = (item.author ?? []).map((p) => (p.literal ? `{${p.literal}}` : `${p.family}, ${p.given ?? ''}`.trim()))
  const venueField = item.type === 'paper-conference' || item.type === 'chapter' ? 'booktitle' : 'journal'
  const fields = {
    title: `{${item.title}}`,
    author: people.length ? people.join(' and ') : '',
    year: yearOf(item) || '',
    [venueField]: item['container-title'] || item['event-title'] || '',
    volume: item.volume || '',
    number: item.issue || '',
    pages: item.page ? String(item.page).replace(/-/g, '--') : '',
    publisher: item.publisher || '',
    doi: item.DOI || '',
    url: item.URL || '',
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n')
  return `@${type}{${key},\n${body}\n}`
}

/** Case-insensitive free-text match over the main searchable fields. */
export function matchesQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    item.title,
    authorsText(item, 100),
    item['container-title'],
    item['event-title'],
    item.keyword,
    item.DOI,
    item.abstract,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return q.split(/\s+/).every((word) => haystack.includes(word))
}

/** Triggers a client-side download of a text file. */
export function downloadText(filename, text, mime = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type: `${mime};charset=utf-8` }))
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
