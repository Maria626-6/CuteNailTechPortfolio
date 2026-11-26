import { spawnSync } from 'node:child_process'
import { cpSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicSource = path.join(projectRoot, 'public')
const publicTarget = path.join(projectRoot, 'netlify-site', 'public')
const nextCli = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next')

if (!existsSync(publicSource)) {
  throw new Error(`Public assets directory not found: ${publicSource}`)
}

if (!existsSync(nextCli)) {
  throw new Error(`Next.js CLI not found: ${nextCli}`)
}

cpSync(publicSource, publicTarget, { recursive: true })

const result = spawnSync(process.execPath, [nextCli, 'build', path.join(projectRoot, 'netlify-site')], {
  cwd: projectRoot,
  stdio: 'inherit',
})

if (result.error) {
  throw result.error
}

if (result.status !== 0) {
  process.exitCode = result.status ?? 1
}
