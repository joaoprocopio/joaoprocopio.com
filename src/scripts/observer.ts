import { SECTIONS } from "~/constants/sections"
import { debounce } from "~/utils/debounce"

const DATA_ACTIVE = "data-active"

let observers: IntersectionObserver[] = []

const observe = () => {
  if (observers.length) {
    for (const observer of observers) {
      observer.disconnect()
    }

    observers = []
  }

  let prevLinkEl: HTMLElement | undefined = undefined

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

        if (!entry.isIntersecting) {
          return undefined
        }

        if (prevLinkEl) {
          prevLinkEl.setAttribute(DATA_ACTIVE, String(!entry.isIntersecting))
        }

        linkEl.setAttribute(DATA_ACTIVE, String(entry.isIntersecting))

        prevLinkEl = linkEl
      },
      { threshold: observerThreshold, rootMargin: "-10% 0px" },
    )

    sectionObserver.observe(sectionEl)

    observers.push(sectionObserver)
  }
}

const debouncedObserve = debounce(observe, 100)

window.addEventListener("load", debouncedObserve)
window.addEventListener("resize", debouncedObserve)
