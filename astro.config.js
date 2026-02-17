import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import reactCompiler from "babel-plugin-react-compiler"
import { fileURLToPath, URL } from "node:url"

const GOOGLE_DOCS_RESUME_URL =
  "https://docs.google.com/document/d/1Zyc6JFGPVfEC3cXRTnx44ExETdle8AbWihFW4_de4W0/edit?usp=sharing"

export default defineConfig({
  site: "https://joaoprocopio.com",
  integrations: [
    sitemap() /* TODO: integrar o sitemap com o blog  */,
    mdx(),
    react({
      babel: {
        plugins: [
          [
            reactCompiler,
            /** @type {import("babel-plugin-react-compiler").PluginOptions} */ ({}),
          ],
        ],
      },
    }),
  ],
  redirects: {
    "/resume": GOOGLE_DOCS_RESUME_URL,
    "/resume.md": GOOGLE_DOCS_RESUME_URL,
    "/resume.pdf": GOOGLE_DOCS_RESUME_URL,
    "/resume.docx": GOOGLE_DOCS_RESUME_URL,
  },
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
