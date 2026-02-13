import type { AstroGlobal } from "astro"

export class Env {
  dev() {
    return import.meta.env.DEV
  }
  prod() {
    return import.meta.env.PROD
  }
  getCanonicalUrl(astro: AstroGlobal) {
    return env.dev() ? astro.site!.origin : astro.url.origin
  }
}

export const env = new Env()
