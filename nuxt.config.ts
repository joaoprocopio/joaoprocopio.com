import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@vueuse/nuxt'],
  css: ['~/styles/index.css'],
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
})