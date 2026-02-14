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

export default config.defineConfig(
  ...withIgnore(),
  ...withJS(),
  ...withTS(),
  ...withAstro(),
  ...withReact(),
  ...withPrettier(),
)

function withIgnore() {
  const filename = url.fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)
  const gitignore = path.resolve(dirname, ".gitignore")

  return [compat.includeIgnoreFile(gitignore)]
}

function withJS() {
  return [js.configs.recommended]
}

function withTS() {
  return tseslint.configs.recommended
}

function withAstro() {
  return [
    astro.configs["flat/recommended"],
    astro.configs["flat/jsx-a11y-recommended"],
    /** @type {import("eslint").Linter.Config} */ ({
      files: ["**/*.astro"],
      languageOptions: {
        globals: {
          astroHTML: true,
        },
      },
    }),
  ]
}

function withReact() {
  const files = ["**/*.{jsx,tsx}"]

  return [
    {
      files,
      .../** @type {import("eslint-plugin-react").ReactFlatConfig} */ (
        react.configs.flat["recommended"]
      ),
    },
    {
      files,
      .../** @type {import("eslint-plugin-react").ReactFlatConfig} */ (
        react.configs.flat["jsx-runtime"]
      ),
    },
    {
      files,
      ...hooks.configs.flat["recommended-latest"],
    },
    {
      files,
      settings: { react: { version: "detect" } },
    },
  ]
}

function withPrettier() {
  return [prettier]
}
