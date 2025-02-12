import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import * as compat from "@eslint/compat"
import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import prettier from "eslint-plugin-prettier/recommended"
import sort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __gitignore = resolve(__dirname, ".gitignore")

export default tseslint.config([
  compat.includeIgnoreFile(__gitignore),
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    plugins: {
      "simple-import-sort": sort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  prettier,
])
