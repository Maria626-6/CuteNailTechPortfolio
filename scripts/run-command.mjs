import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { resolve } from "node:path"

const [command, ...args] = process.argv.slice(2)

if (!command) {
  console.error("Missing command")
  process.exit(1)
}

if (command === "next" && (args[0] === "dev" || args[0] === "start")) {
  const port = process.env.PORT || "3000"
  const hostname = process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0"

  args.push("--port", port, "--hostname", hostname)
}

const localExecutable = resolve(
  "node_modules",
  ".bin",
  process.platform === "win32" ? `${command}.cmd` : command,
)
const executable = existsSync(localExecutable)
  ? localExecutable
  : process.platform === "win32"
    ? `${command}.cmd`
    : command
const nodeOptions = [process.env.NODE_OPTIONS, "--no-deprecation"]
  .filter(Boolean)
  .join(" ")

const child = spawn(executable, args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
})

child.on("error", (error) => {
  console.error(error.message)
  process.exit(1)
})

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 1)
})
