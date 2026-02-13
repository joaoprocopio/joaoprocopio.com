function isURL(value: unknown): value is URL {
  return value instanceof URL
}

export class Env {
  dev() {
    return import.meta.env.DEV
  }
  prod() {
    return import.meta.env.PROD
  }
  getCanonicalUrl(site: string | URL, fallback: string | URL) {
    if (env.dev()) {
      return isURL(fallback) ? fallback.origin : fallback
    }

    return isURL(site) ? site.origin : site
  }
}

export const env = new Env()
