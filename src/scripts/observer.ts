import { SECTIONS } from "~/constants/sections"

const DATA_ACTIVE_KEY = "data-active"

let lastLinkEl: HTMLElement | undefined = undefined

for (let sectionIndex = 0; sectionIndex < SECTIONS.length; sectionIndex++) {
  const section = SECTIONS[sectionIndex]

  const linkEl: HTMLElement = document.getElementById(section.LINK_ID)!
  const sectionEl: HTMLElement = document.getElementById(section.ID)!
  const containerEl: HTMLElement = sectionEl.parentElement!

  const containerStyle: CSSStyleDeclaration =
    window.getComputedStyle(containerEl)

  const containerPaddingTop: number = Number.parseInt(
    containerStyle.getPropertyValue("padding-top").replace("px", ""),
  )
  const containerPaddingBottom: number = Number.parseInt(
    containerStyle.getPropertyValue("padding-bottom").replace("px", ""),
  )

  const containerPadding: number = containerPaddingTop + containerPaddingBottom

  const viewportHeight = window.innerHeight
  const sectionPaddedHeight = sectionEl.clientHeight + containerPadding

  const observerThreshold: number = Math.abs(
    (viewportHeight / sectionPaddedHeight / 2) % 1,
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
