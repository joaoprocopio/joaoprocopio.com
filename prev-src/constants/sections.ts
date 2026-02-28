import About from '~/components/about.astro'
import Experience from '~/components/experience.astro'

export type TSection<S extends string> = {
  id: S
  linkId: `@${S}`
  href: `#${S}`
  title: Capitalize<S>
  component: astroHTML.JSX.Element
}

export const SECTION_ABOUT = {
  id: 'about',
  linkId: '@about',
  href: '#about',
  title: 'About',
  component: About,
} as const satisfies TSection<'about'>

export const SECTION_EXPERIENCE = {
  id: 'experience',
  linkId: '@experience',
  href: '#experience',
  title: 'Experience',
  component: Experience,
} as const satisfies TSection<'experience'>

export const SECTIONS = [
  SECTION_ABOUT,
  SECTION_EXPERIENCE,
] as const satisfies TSection<string>[]
