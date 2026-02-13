export type TLink = {
  ID: string
  HREF: string
  LABEL: string
}

export const GITHUB_LINK = {
  ID: "github",
  HREF: "https://github.com/joaoprocopio",
  LABEL: "GitHub",
} as const satisfies TLink

export const LINKEDIN_LINK = {
  ID: "linkedin",
  HREF: "https://linkedin.com/in/joao-procopio",
  LABEL: "LinkedIn",
} as const satisfies TLink

export const EMAIL_LINK = {
  ID: "gmail",
  HREF: "mailto:joaovitorcprocopio@gmail.com",
  LABEL: "Email",
} as const satisfies TLink

export const LINKS = [
  GITHUB_LINK,
  LINKEDIN_LINK,
  EMAIL_LINK,
] as const satisfies TLink[]
