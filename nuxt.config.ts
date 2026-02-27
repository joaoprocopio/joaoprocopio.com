import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@vueuse/nuxt', '@nuxtjs/color-mode'],
  css: ['~/assets/index.css'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
  imports: {
    scan: false,
    autoImport: false,
  },
  components: {
    dirs: [],
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
})
