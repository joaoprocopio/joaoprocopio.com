import * as compat from "@eslint/compat"
import js from "@eslint/js"
import prettier from "eslint-config-prettier/flat"
import astro from "eslint-plugin-astro"
import * as config from "eslint/config"
import * as path from "node:path"
import * as url from "node:url"
import tseslint from "typescript-eslint"

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gitignore = path.resolve(dirname, ".gitignore")

const __eslint_config__ = config.defineConfig(
  compat.includeIgnoreFile(gitignore),
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

export default __eslint_config__

/**
 * @typedef   {import("typescript-eslint").ConfigArray} ConfigArray
 * @param     {ConfigArray | ConfigArray[number]} config
 * @returns   {ConfigArray | ConfigArray[number]}
 */
function withAstroFiles(config) {
  if (Array.isArray(config)) {
    config?.forEach((config) => {
      if (!config.files) {
        return undefined
      }

      config.files = config.files.concat("**.astro")
    })

    return config
  }

  if (!config.files) return config

  config.files = config.files.concat("**.astro")

  return config
}
