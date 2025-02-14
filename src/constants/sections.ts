type TSection<S extends string> = {
  ID: S
  LINK_ID: `@${S}`
  HREF: `#${S}`
  LABEL: Capitalize<S>
}

type TAboutSection = TSection<"about">
type TExperienceSection = TSection<"experience">
type TProjectsSection = TSection<"projects">
type TContactsSection = TSection<"contacts">

export const SECTION_ABOUT: TAboutSection = {
  ID: "about",
  LINK_ID: "@about",
  HREF: "#about",
  LABEL: "About",
}

export const SECTION_EXPERIENCE: TExperienceSection = {
  ID: "experience",
  LINK_ID: "@experience",
  HREF: "#experience",
  LABEL: "Experience",
}

export const SECTION_PROJECTS: TProjectsSection = {
  ID: "projects",
  LINK_ID: "@projects",
  HREF: "#projects",
  LABEL: "Projects",
}

export const SECTION_CONTACTS: TContactsSection = {
  ID: "contacts",
  LINK_ID: "@contacts",
  HREF: "#contacts",
  LABEL: "Contacts",
}

export const SECTIONS: TSection<string>[] = [
  SECTION_ABOUT,
  SECTION_EXPERIENCE,
  SECTION_PROJECTS,
  SECTION_CONTACTS,
]
