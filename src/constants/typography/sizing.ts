import type { TSizing } from "~/constants/typography/types"

export const VARIANT_SIZING = {
  largeTitle: { size: 34, leading: 41 },
  title1: { size: 28, leading: 34 },
  title2: { size: 22, leading: 28 },
  title3: { size: 20, leading: 25 },
  headline: { size: 17, leading: 22 },
  body: { size: 17, leading: 22 },
  callout: { size: 16, leading: 21 },
  subheadline: { size: 15, leading: 20 },
  footnote: { size: 13, leading: 18 },
  caption1: { size: 12, leading: 16 },
  caption2: { size: 11, leading: 13 },
} as const satisfies TSizing
