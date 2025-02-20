export const MONTH = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
} as const

export const PRESENT = Symbol("present")

export const date = (year: number, month: (typeof MONTH)[keyof typeof MONTH]) =>
  new Date(year, month)
