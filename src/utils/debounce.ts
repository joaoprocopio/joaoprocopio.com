export const debounce = <Fn extends (...args: Parameters<Fn>) => void>(
  fn: Fn,
  wait: number = 0,
): ((...args: Parameters<Fn>) => void) => {
  let frameId = 0

  const debounced = (...args: Parameters<Fn>) => {
    cancelAnimationFrame(frameId)

    const now = performance.now()

    const nextAnimationFrame = (nextFrameId: number) => {
      if (nextFrameId - now < wait) {
        frameId = requestAnimationFrame(nextAnimationFrame)
        return undefined
      }

      fn(...args)
    }

    frameId = requestAnimationFrame(nextAnimationFrame)
  }

  return debounced
}
