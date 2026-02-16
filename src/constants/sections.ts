import About from "~/components/about.astro"
import Experience from "~/components/experience.astro"

export type TSection<S extends string> = {
  ID: S
  LINK_ID: `@${S}`
  HREF: `#${S}`
  TITLE: Capitalize<S>
  component: astroHTML.JSX.Element
}

export const SECTION_ABOUT = {
  ID: "about",
  LINK_ID: "@about",
  HREF: "#about",
  TITLE: "About",
  component: About,
} as const satisfies TSection<"about">

export const SECTION_EXPERIENCE = {
  ID: "experience",
  LINK_ID: "@experience",
  HREF: "#experience",
  TITLE: "Experience",
  component: Experience,
} as const satisfies TSection<"experience">

export const SECTIONS = [
  SECTION_ABOUT,
  SECTION_EXPERIENCE,
] as const satisfies TSection<string>[]
