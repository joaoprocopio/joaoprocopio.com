import { SECTIONS } from "~/constants/sections"

const DATA_ACTIVE_KEY = "data-active"

const sections: Record<string, HTMLElement> = {}
const links: Record<string, HTMLAnchorElement> = {}

for (const SECTION of SECTIONS) {
  const sectionId = SECTION.ID
  const linkId = SECTION.LINK_ID

  const sectionEl = document.getElementById(sectionId) as HTMLElement
  const linkEl = document.getElementById(linkId) as HTMLAnchorElement

  sections[sectionId] = sectionEl
  links[linkId] = linkEl
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) {
      continue
    }

    const linkId = "@".concat(entry.target.id)

    for (const link of Object.values(links)) {
      if (linkId !== link.id) {
        link.setAttribute(DATA_ACTIVE_KEY, "false")
      } else {
        link.setAttribute(DATA_ACTIVE_KEY, "true")
      }
    }
  }
})

for (const section of Object.values(sections)) {
  observer.observe(section)
}
