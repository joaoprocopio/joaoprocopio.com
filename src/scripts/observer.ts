import { SECTIONS } from "~/constants/sections"

const DATA_ACTIVE_KEY = "data-active"

let lastLinkEl: HTMLAnchorElement | undefined = undefined

for (let sectionIndex = 0; sectionIndex < SECTIONS.length; sectionIndex++) {
  const section = SECTIONS[sectionIndex]

  const sectionEl: HTMLElement = document.getElementById(
    section.ID,
  ) as HTMLElement
  const linkEl: HTMLAnchorElement = document.getElementById(
    section.LINK_ID,
  ) as HTMLAnchorElement

  const sectionHeight: number = sectionEl.clientHeight
  const viewportHeight: number = window.innerHeight

  const observerThreshold: number = Number(
    (((sectionHeight - viewportHeight) / viewportHeight) % 1).toFixed(2),
  )

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
