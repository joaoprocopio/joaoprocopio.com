import { SECTIONS } from "~/constants/sections"

const DATA_ACTIVE_KEY = "data-active"

let lastLinkEl: HTMLElement | undefined = undefined

for (let sectionIndex = 0; sectionIndex < SECTIONS.length; sectionIndex++) {
  const section = SECTIONS[sectionIndex]

  const linkEl: HTMLElement = document.getElementById(section.LINK_ID)!
  const sectionEl: HTMLElement = document.getElementById(section.ID)!

  const viewportHeight: number = window.innerHeight
  const sectionPaddedHeight: number = sectionEl.clientHeight

  let observerThreshold: number = viewportHeight / sectionPaddedHeight / 2
  observerThreshold = Math.abs(observerThreshold % 1)
  observerThreshold = Number.parseFloat(observerThreshold.toFixed(2))

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

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

// TODO: consertar ao fazer o resize da tela
