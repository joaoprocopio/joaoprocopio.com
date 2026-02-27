import GitHub from "~/icons/github.astro"
import Gmail from "~/icons/gmail.astro"
import LinkedIn from "~/icons/linkedin.astro"

export type TSocial = {
  id: string
  href: string
  label: string
  icon: astroHTML.JSX.Element
}

export const GITHUB_SOCIAL = {
  id: "github",
  href: "https://github.com/joaoprocopio",
  label: "GitHub",
  icon: GitHub,
} as const satisfies TSocial

export const LINKEDIN_SOCIAL = {
  id: "linkedin",
  href: "https://linkedin.com/in/joao-procopio",
  label: "LinkedIn",
  icon: LinkedIn,
} as const satisfies TSocial

export const EMAIL_SOCIAL = {
  id: "gmail",
  href: "mailto:joaovitorcprocopio@gmail.com",
  label: "Email",
  icon: Gmail,
} as const satisfies TSocial

export const SOCIAL = [
  GITHUB_SOCIAL,
  LINKEDIN_SOCIAL,
  EMAIL_SOCIAL,
] as const satisfies TSocial[]
