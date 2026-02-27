import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
})
