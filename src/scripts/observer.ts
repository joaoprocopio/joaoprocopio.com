import { SECTIONS } from "~/constants/sections"
import { debounce } from "~/utils/debounce"

const EL_DATA_ACTIVE = "data-active"

let observers: IntersectionObserver[] = []

const observe = () => {
  observers.forEach((observer) => {
    observer.disconnect()
  })

  observers = []

  let prevLinkEl: HTMLElement | undefined = undefined

  SECTIONS.forEach((section) => {
    const linkEl: HTMLElement = document.getElementById(section.LINK_ID)!
    const sectionEl: HTMLElement = document.getElementById(section.ID)!

    const viewportHeight: number = window.innerHeight
    const sectionHeight: number = sectionEl.clientHeight

    const observerThreshold: number =
      Math.log1p(viewportHeight / sectionHeight) % 1

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry?.isIntersecting) {
          return undefined
        }

        if (prevLinkEl) {
          prevLinkEl.setAttribute(EL_DATA_ACTIVE, String(!entry.isIntersecting))
        }

        linkEl.setAttribute(EL_DATA_ACTIVE, String(entry.isIntersecting))

        prevLinkEl = linkEl
      },
      { threshold: observerThreshold },
    )

    sectionObserver.observe(sectionEl)
    observers.push(sectionObserver)
  })
}

observe()

window.addEventListener("resize", debounce(observe, 100))
