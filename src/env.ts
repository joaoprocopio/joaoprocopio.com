function isURL(value: unknown): value is URL {
  return value instanceof URL
}

export class Env {
  dev(): boolean {
    return import.meta.env.DEV
  }
  prod(): boolean {
    return import.meta.env.PROD
  }
  getCanonicalUrl(site: string | URL, fallback: string | URL): URL {
    if (env.dev()) {
      return isURL(fallback) ? fallback : new URL(fallback)
    }

    return isURL(site) ? site : new URL(site)
  }
}

export const env = new Env()
