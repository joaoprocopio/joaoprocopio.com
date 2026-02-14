import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import reactCompiler from "babel-plugin-react-compiler"
import { fileURLToPath, URL } from "node:url"

/** @type {import("babel-plugin-react-compiler").PluginOptions} */
const reactCompilerOptions = {
  target: "19",
}

export default defineConfig({
  site: "https://joaoprocopio.com",
  integrations: [
    sitemap() /* TODO: integrar o sitemap com o blog  */,
    mdx(),
    react({ babel: { plugins: [[reactCompiler, reactCompilerOptions]] } }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: (path, content) => {
        if (path.endsWith(".svg")) {
          return false
        }

        return content.length < 4096
      },
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
})
