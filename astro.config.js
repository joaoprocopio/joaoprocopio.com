import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { fileURLToPath, URL } from "node:url"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://joaoprocopio.com",
  integrations: [
    // TODO: integrar o sitemap com o blog
    sitemap(),
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
