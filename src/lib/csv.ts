/** Build and download a UTF-8 CSV from row objects (browser only). */
export function downloadCsv(
  rows: Record<string, string | number>[],
  columns: { key: string; header: string }[],
  filename: string,
  preambleLines: string[] = [],
) {
  const escape = (v: string | number) => {
    const s = String(v)
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }

  const header = columns.map((c) => escape(c.header)).join(',')
  const body = rows.map((row) => columns.map((c) => escape(row[c.key] ?? '')).join(','))
  const lines = [
    ...preambleLines.map((l) => `# ${l}`),
    header,
    ...body,
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
