import * as compat from "@eslint/compat"
import js from "@eslint/js"
import prettier from "eslint-config-prettier/flat"
import astro from "eslint-plugin-astro"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import * as config from "eslint/config"
import * as path from "node:path"
import * as url from "node:url"
import tseslint from "typescript-eslint"

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gitignore = path.resolve(dirname, ".gitignore")

const __config = config.defineConfig(
  compat.includeIgnoreFile(gitignore),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  /** @type {import("eslint-plugin-react").ReactFlatConfig} */ (
    react.configs.flat["recommended"]
  ),
  /** @type {import("eslint-plugin-react").ReactFlatConfig} */ (
    react.configs.flat["jsx-runtime"]
  ),
  hooks.configs.flat["recommended-latest"],
  prettier,
  { settings: { react: { version: "detect" } } },
)

export default __config
