import type { Config } from "prettier";

export default <Config>{
  quoteProps: "consistent",
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  vueIndentScriptAndStyle: true,
  bracketSameLine: true,
  endOfLine: "auto",
  semi: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
