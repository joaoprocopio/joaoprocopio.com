import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import * as compat from "@eslint/compat"
import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier/flat"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __gitignore = resolve(__dirname, ".gitignore")

export default tseslint.config(
  compat.includeIgnoreFile(__gitignore),
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  withAstroFiles(js.configs.recommended),
  withAstroFiles(tseslint.configs.recommended),
  withAstroFiles({
    languageOptions: {
      globals: {
        astroHTML: true,
      },
    },
  }),
  astro.configs.recommended,
  prettier,
)

/**
 * @typedef   {import("typescript-eslint").ConfigArray} ConfigArray
 * @param     {ConfigArray | ConfigArray[number]} config
 * @returns   {ConfigArray | ConfigArray[number]}
 */
function withAstroFiles(config) {
  if (Array.isArray(config)) {
    config?.forEach((config) => {
      if (!config.files) return config

      config.files = config.files.concat("**.astro")
    })

    return config
  }

  if (!config.files) return config

  config.files = config.files.concat("**.astro")

  return config
}
