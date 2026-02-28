export type TSize = number
export type TTracking = number
export type TLeading = number
export type TSizeTracking = Record<TSize, TTracking>
export type TVariant =
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'base'
  | 'sm'
  | 'xs'
  | '2xs'
  | '3xs'
  | '4xs'
export type TSizing = Record<TVariant, { size: TSize; leading: TLeading }>
