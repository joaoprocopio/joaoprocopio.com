/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "all",
  printWidth: 80,
  quoteProps: "consistent",
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
