export type TSize = number
export type TTracking = number
export type TLeading = number
// https://developer.apple.com/design/human-interface-guidelines/typography#macOS-tracking-values
export type TSizeTracking = Record<TSize, TTracking>
// https://developer.apple.com/design/human-interface-guidelines/typography#iOS-iPadOS-Dynamic-Type-sizes
export type TBreakpoint = "sm" | "md" | "lg"
export type TVariant =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subheadline"
  | "footnote"
  | "caption1"
  | "caption2"
export type TAffect = "regular" | "emphasized"
export type TWeight = "bold" | "semibold" | "medium"
export type TVariantAffect = Record<TVariant, Partial<Record<TAffect, TWeight>>>
export type TSizing = Record<
  TVariant,
  Record<TBreakpoint, { size: TSize; leading: TLeading }>
>
