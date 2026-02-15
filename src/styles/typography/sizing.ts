import type { TSizing } from "~/styles/typography/types"

export const VARIANT_SIZING = {
  "2xs": { size: 11, leading: 13 },
  xs: { size: 12, leading: 16 },
  sm: { size: 13, leading: 18 },
  base: { size: 15, leading: 20 },
  lg: { size: 16, leading: 21 },
  xl: { size: 17, leading: 22 },
  "2xl": { size: 20, leading: 25 },
  "3xl": { size: 22, leading: 28 },
  "4xl": { size: 28, leading: 34 },
  "5xl": { size: 34, leading: 41 },
} as const satisfies TSizing
