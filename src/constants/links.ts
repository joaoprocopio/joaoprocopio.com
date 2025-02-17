import GitHub from "~/icons/github.astro"
import Gmail from "~/icons/gmail.astro"
import LinkedIn from "~/icons/linkedin.astro"

export type TLink = {
  HREF: string
  ICON: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
}

export const GITHUB_LINK = {
  HREF: "https://github.com/joaoprocopio",
  ICON: GitHub,
} as const satisfies TLink

export const LINKEDIN_LINK = {
  HREF: "https://linkedin.com/in/joao-procopio",
  ICON: LinkedIn,
} as const satisfies TLink

export const EMAIL_LINK = {
  HREF: "mailto:joaovitorcprocopio@gmail.com",
  ICON: Gmail,
} as const satisfies TLink

export const LINKS = [
  GITHUB_LINK,
  LINKEDIN_LINK,
  EMAIL_LINK,
] as const satisfies TLink[]
