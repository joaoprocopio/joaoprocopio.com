/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "es5",
  printWidth: 80,
  quoteProps: "consistent",
  plugins: ["prettier-plugin-astro"],
}
