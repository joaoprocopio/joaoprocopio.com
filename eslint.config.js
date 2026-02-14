import * as compat from "@eslint/compat"
import js from "@eslint/js"
import prettier from "eslint-config-prettier/flat"
import astro from "eslint-plugin-astro"
import jsxa11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import * as config from "eslint/config"
import * as path from "node:path"
import * as url from "node:url"
import tseslint from "typescript-eslint"

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gitignore = path.resolve(dirname, ".gitignore")

const __eslint_config__ = config.defineConfig(
  compat.includeIgnoreFile(gitignore),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  react.configs.flat["recommended"],
  react.configs.flat["jsx-runtime"],
  hooks.configs.flat["recommended-latest"],
  jsxa11y.flatConfigs.recommended,
  prettier,
)

export default __eslint_config__
