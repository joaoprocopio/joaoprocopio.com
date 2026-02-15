import type { TSizing } from "~/styles/typography/types"

export const VARIANT_SIZING = {
  "3xl": { size: 34, leading: 41 },
  "2xl": { size: 28, leading: 34 },
  "xl": { size: 22, leading: 28 },
  "lg": { size: 20, leading: 25 },
  "base": { size: 17, leading: 22 },
  "sm": { size: 16, leading: 21 },
  "xs": { size: 15, leading: 20 },
  "2xs": { size: 13, leading: 18 },
  "3xs": { size: 12, leading: 16 },
  "4xs": { size: 11, leading: 13 },
} as const satisfies TSizing
