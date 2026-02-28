import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/eslint', '@nuxt/icon'],
  css: ['~/assets/index.css'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
  imports: {
    scan: true,
    autoImport: false,
  },
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
      },
      {
        path: '~/lib/ui',
        extensions: ['vue'],
      },
    ],
  },
  icon: {
    mode: 'svg',
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
})
