import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/eslint', '@nuxt/icon', 'shadcn-nuxt'],
  css: ['~/assets/index.css'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
  icon: {
    mode: 'svg',
  },
  shadcn: {
    componentDir: '~/lib/ui/components',
    prefix: '',
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
})
