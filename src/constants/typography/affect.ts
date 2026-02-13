import type { TVariantAffect } from "~/constants/typography/types"

export const VARIANT_AFFECT_WEIGHT = {
  largeTitle: {
    emphasized: "semibold",
  },
  title1: {
    emphasized: "bold",
  },
  title2: {
    emphasized: "bold",
  },
  title3: {
    emphasized: "semibold",
  },
  headline: {
    emphasized: "semibold",
  },
  body: {
    emphasized: "semibold",
  },
  callout: {
    emphasized: "semibold",
  },
  subheadline: {
    emphasized: "semibold",
  },
  footnote: {
    emphasized: "semibold",
  },
  caption1: {
    emphasized: "medium",
  },
  caption2: {
    emphasized: "semibold",
  },
} as const satisfies TVariantAffect
