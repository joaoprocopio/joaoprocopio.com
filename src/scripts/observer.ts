import { SECTIONS } from "~/constants/sections"
import { debounce } from "~/utils/debounce"

const DATA_ACTIVE_KEY = "data-active"
const LISTENER_WAIT_MS = 150

let observers: IntersectionObserver[] = []

function observe() {
  if (observers.length) {
    for (const observer of observers) {
      observer.disconnect()
    }

    observers = []
  }

  let lastLinkEl: HTMLElement | undefined = undefined

  for (let sectionIndex = 0; sectionIndex < SECTIONS.length; sectionIndex++) {
    const section = SECTIONS[sectionIndex]

    const linkEl: HTMLElement = document.getElementById(section.LINK_ID)!
    const sectionEl: HTMLElement = document.getElementById(section.ID)!

    const viewportHeight: number = window.innerHeight
    const sectionHeight: number = sectionEl.clientHeight

    const observerThreshold: number = Math.abs(
      (viewportHeight / sectionHeight / Math.E) % 1,
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
      { threshold: observerThreshold, rootMargin: "-10% 0px" },
    )

    sectionObserver.observe(sectionEl)
    observers.push(sectionObserver)
  }
}

window.addEventListener("load", () => {
  debounce(observe, LISTENER_WAIT_MS)()
})

window.addEventListener("resize", () => {
  debounce(observe, LISTENER_WAIT_MS)()
})
