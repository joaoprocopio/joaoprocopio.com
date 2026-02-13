import { SECTIONS } from "~/constants/sections"

const EL_DATA_ACTIVE = "data-active"

const linkElBySection = new Map<HTMLElement, HTMLElement>(
  SECTIONS.map((section) => {
    const sectionEl = document.getElementById(section.ID)
    const linkEl = document.getElementById(section.LINK_ID)

    if (!linkEl || !sectionEl) {
      throw new Error(`Missing element for section ${section}`)
    }

    return [sectionEl, linkEl]
  }),
)

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!(entry.target instanceof HTMLElement)) {
      continue
    }

    const linkEl = linkElBySection.get(entry.target)

    if (!linkEl) {
      throw new Error(`Missing link element for section ${entry.target.id}`)
    }

    linkEl.setAttribute(EL_DATA_ACTIVE, String(entry.isIntersecting))
  }
})

for (const sectionEl of linkElBySection.keys()) {
  observer.observe(sectionEl)
}
