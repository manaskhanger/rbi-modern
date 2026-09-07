import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('spa-fallback: dist/index.html missing')
  process.exit(1)
}
copyFileSync(index, notFound)
console.log('spa-fallback: copied dist/index.html → dist/404.html')
