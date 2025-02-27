export type TSection<S extends string> = {
  ID: S
  LINK_ID: `@${S}`
  HREF: `#${S}`
  TITLE: Capitalize<S>
}

export const SECTION_ABOUT = {
  ID: "about",
  LINK_ID: "@about",
  HREF: "#about",
  TITLE: "About",
} as const satisfies TSection<"about">

export const SECTION_EXPERIENCE = {
  ID: "experience",
  LINK_ID: "@experience",
  HREF: "#experience",
  TITLE: "Experience",
} as const satisfies TSection<"experience">

export const SECTION_CONTACT = {
  ID: "contact",
  LINK_ID: "@contact",
  HREF: "#contact",
  TITLE: "Contact",
} as const satisfies TSection<"contact">

export const SECTIONS = [
  SECTION_ABOUT,
  SECTION_EXPERIENCE,
  SECTION_CONTACT,
] as const satisfies TSection<string>[]
