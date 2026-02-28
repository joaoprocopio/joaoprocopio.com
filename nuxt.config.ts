import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'shadcn-nuxt',
  ],
  css: ['~/assets/index.css'],
  imports: {
    dirs: ['~/lib/ui'],
  },
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
