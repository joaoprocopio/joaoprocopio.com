import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'shadcn-nuxt',
  ],
  css: ['~/assets/css/theme.css'],
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
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
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
  colorMode: {
    storage: 'cookie',
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
})
