import GitHub from "~/components/github.astro"
import Gmail from "~/components/gmail.astro"
import LinkedIn from "~/components/linkedin.astro"

export type TLink = {
  HREF: string
  ICON: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
}

export const GITHUB_LINK: TLink = {
  HREF: "https://github.com/joaoprocopio",
  ICON: GitHub,
}

export const LINKEDIN_LINK: TLink = {
  HREF: "https://linkedin.com/in/joao-procopio",
  ICON: LinkedIn,
}

export const EMAIL_LINK: TLink = {
  HREF: "mailto:joaovitorcprocopio@gmail.com",
  ICON: Gmail,
}

export const LINKS = [
  GITHUB_LINK,
  LINKEDIN_LINK,
  EMAIL_LINK,
] as const satisfies TLink[]
