/** Compact one-line gist for list/table rows — truncate without mid-word cut when possible. */
export function compactGist(text: string, max = 130): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) return cleaned
  const slice = cleaned.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const base = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice
  return `${base}…`
}
