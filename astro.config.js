import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { fileURLToPath, URL } from "node:url"
import sitemap from "@astrojs/sitemap"

import react from "@astrojs/react"

import mdx from "@astrojs/mdx"

export default defineConfig({
  site: "https://joaoprocopio.com",
  integrations: [
    sitemap() /* TODO: integrar o sitemap com o blog  */,
    react(),
    mdx(),
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
