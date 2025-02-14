export type TSection<S extends string> = {
  ID: S
  LINK_ID: `@${S}`
  HREF: `#${S}`
  LABEL: Capitalize<S>
}

export const SECTION_ABOUT: TSection<"about"> = {
  ID: "about",
  LINK_ID: "@about",
  HREF: "#about",
  LABEL: "About",
}

export const SECTION_EXPERIENCE: TSection<"experience"> = {
  ID: "experience",
  LINK_ID: "@experience",
  HREF: "#experience",
  LABEL: "Experience",
}

export const SECTION_PROJECTS: TSection<"projects"> = {
  ID: "projects",
  LINK_ID: "@projects",
  HREF: "#projects",
  LABEL: "Projects",
}

export const SECTION_CONTACTS: TSection<"contacts"> = {
  ID: "contacts",
  LINK_ID: "@contacts",
  HREF: "#contacts",
  LABEL: "Contacts",
}

export const SECTIONS = [
  SECTION_ABOUT,
  SECTION_EXPERIENCE,
  SECTION_PROJECTS,
  SECTION_CONTACTS,
] as const satisfies TSection<string>[]
