export type TSize = number
export type TTracking = number
export type TLeading = number
export type TSizeTracking = Record<TSize, TTracking>
export type TVariant =
  | "2xs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
export type TSizing = Record<TVariant, { size: TSize; leading: TLeading }>
