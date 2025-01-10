import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { includeIgnoreFile } from "@eslint/compat"
import js from "@eslint/js"
import astro from "eslint-plugin-astro"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __gitignore = resolve(__dirname, ".gitignore")

export default [
  includeIgnoreFile(__gitignore),
  js.configs.recommended,
  ...astro.configs.recommended,
]
