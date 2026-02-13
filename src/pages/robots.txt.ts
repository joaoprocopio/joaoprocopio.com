import type { APIRoute } from "astro"
import { env } from "~/env"

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = (context) => {
  const sitemapURL = new URL(
    "sitemap-index.xml",
    env.getCanonicalUrl(context.site!, context.request.url),
  )
  return new Response(getRobotsTxt(sitemapURL))
}
