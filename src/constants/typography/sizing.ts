import type { TSizing } from "~/constants/typography/types"

export const VARIANT_SIZING = {
  largeTitle: {
    lg: { size: 2.125, leading: 2.5625 }, // 34px, 41px
    md: { size: 2.0625, leading: 2.5 }, // 33px, 40px
    sm: { size: 2, leading: 2.4375 }, // 32px, 39px
  },
  title1: {
    lg: { size: 1.75, leading: 2.125 }, // 28px, 34px
    md: { size: 1.6875, leading: 2.0625 }, // 27px, 33px
    sm: { size: 1.625, leading: 2 }, // 26px, 32px
  },
  title2: {
    lg: { size: 1.375, leading: 1.75 }, // 22px, 28px
    md: { size: 1.3125, leading: 1.625 }, // 21px, 26px
    sm: { size: 1.25, leading: 1.5625 }, // 20px, 25px
  },
  title3: {
    lg: { size: 1.25, leading: 1.5625 }, // 20px, 25px
    md: { size: 1.1875, leading: 1.5 }, // 19px, 24px
    sm: { size: 1.125, leading: 1.4375 }, // 18px, 23px
  },
  headline: {
    lg: { size: 1.0625, leading: 1.375 }, // 17px, 22px
    md: { size: 1, leading: 1.3125 }, // 16px, 21px
    sm: { size: 0.9375, leading: 1.25 }, // 15px, 20px
  },
  body: {
    lg: { size: 1.0625, leading: 1.375 }, // 17px, 22px
    md: { size: 1, leading: 1.3125 }, // 16px, 21px
    sm: { size: 0.9375, leading: 1.25 }, // 15px, 20px
  },
  callout: {
    lg: { size: 1, leading: 1.3125 }, // 16px, 21px
    md: { size: 0.9375, leading: 1.25 }, // 15px, 20px
    sm: { size: 0.875, leading: 1.1875 }, // 14px, 19px
  },
  subheadline: {
    lg: { size: 0.9375, leading: 1.25 }, // 15px, 20px
    md: { size: 0.875, leading: 1.1875 }, // 14px, 19px
    sm: { size: 0.8125, leading: 1.125 }, // 13px, 18px
  },
  footnote: {
    lg: { size: 0.8125, leading: 1.125 }, // 13px, 18px
    md: { size: 0.75, leading: 1 }, // 12px, 16px
    sm: { size: 0.75, leading: 1 }, // 12px, 16px
  },
  caption1: {
    lg: { size: 0.75, leading: 1 }, // 12px, 16px
    md: { size: 0.6875, leading: 0.8125 }, // 11px, 13px
    sm: { size: 0.6875, leading: 0.8125 }, // 11px, 13px
  },
  caption2: {
    lg: { size: 0.6875, leading: 0.8125 }, // 11px, 13px
    md: { size: 0.6875, leading: 0.8125 },
    sm: { size: 0.6875, leading: 0.8125 },
  },
} as const satisfies TSizing
