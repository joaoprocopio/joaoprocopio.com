import { SECTIONS } from "~/constants/sections"

const DATA_ACTIVE_KEY = "data-active"

let lastLinkEl: HTMLAnchorElement | undefined = undefined

for (const SECTION of SECTIONS) {
  const sectionEl = document.getElementById(SECTION.ID) as HTMLElement
  const linkEl = document.getElementById(SECTION.LINK_ID) as HTMLAnchorElement

  const sectionHeight = sectionEl.clientHeight
  const viewportHeight = window.innerHeight
  const observerThreshold = Math.min(1, viewportHeight / sectionHeight)

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(0)!

      const isIntersecting = entry.isIntersecting

      if (!isIntersecting) {
        return undefined
      }

      if (lastLinkEl) {
        lastLinkEl.setAttribute(DATA_ACTIVE_KEY, String(!isIntersecting))
      }

      linkEl.setAttribute(DATA_ACTIVE_KEY, String(isIntersecting))

      lastLinkEl = linkEl
    },
    { threshold: observerThreshold },
  )

  sectionObserver.observe(sectionEl)
}
