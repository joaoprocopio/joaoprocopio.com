export class Env {
  dev(): boolean {
    return import.meta.env.DEV
  }
  prod(): boolean {
    return import.meta.env.PROD
  }
  getCanonicalURL(site: string | URL, fallback: string | URL): URL {
    if (env.dev()) {
      return new URL(fallback)
    }

    return new URL(site)
  }
}

export const env = new Env()
