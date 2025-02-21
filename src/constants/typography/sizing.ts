import type { TSizing } from "~/constants/typography/types"

export const SIZING = {
  largeTitle: {
    lg: { size: 34, leading: 41 },
    md: { size: 33, leading: 40 },
    sm: { size: 32, leading: 39 },
  },
  title1: {
    lg: { size: 28, leading: 34 },
    md: { size: 27, leading: 33 },
    sm: { size: 26, leading: 32 },
  },
  title2: {
    lg: { size: 22, leading: 28 },
    md: { size: 21, leading: 26 },
    sm: { size: 20, leading: 25 },
  },
  title3: {
    lg: { size: 20, leading: 25 },
    md: { size: 19, leading: 24 },
    sm: { size: 18, leading: 23 },
  },
  headline: {
    lg: { size: 17, leading: 22 },
    md: { size: 16, leading: 21 },
    sm: { size: 15, leading: 20 },
  },
  body: {
    lg: { size: 17, leading: 22 },
    md: { size: 16, leading: 21 },
    sm: { size: 15, leading: 20 },
  },
  callout: {
    lg: { size: 16, leading: 21 },
    md: { size: 15, leading: 20 },
    sm: { size: 14, leading: 19 },
  },
  subheadline: {
    lg: { size: 15, leading: 20 },
    md: { size: 14, leading: 19 },
    sm: { size: 13, leading: 18 },
  },
  footnote: {
    lg: { size: 13, leading: 18 },
    md: { size: 12, leading: 16 },
    sm: { size: 12, leading: 16 },
  },
  caption1: {
    lg: { size: 12, leading: 16 },
    md: { size: 11, leading: 13 },
    sm: { size: 11, leading: 13 },
  },
  caption2: {
    lg: { size: 11, leading: 13 },
    md: { size: 11, leading: 13 },
    sm: { size: 11, leading: 13 },
  },
} as const satisfies TSizing
