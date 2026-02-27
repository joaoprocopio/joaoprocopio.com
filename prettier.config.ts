import type { Config } from 'prettier'

export default {
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSameLine: true,
  endOfLine: 'auto',
  semi: false,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
} as const satisfies Config
