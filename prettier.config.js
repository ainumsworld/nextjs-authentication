/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // always in last
  ],
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  bracketSameLine: false,
  singleAttributePerLine: true,
  //
  importOrder: [
    "<BUILTIN_MODULES>",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@nextui-org(.*)$",
    "",
    "^@/env$",
    "^types$",
    "^@/types(.*)$",
    "^@/providers(.*)$",
    "^@/config(.*)$",
    "^@/helpers(.*)$",
    "^@/hooks(.*)$",
    "^@/utils(.*)$",
    "^@/stores(.*)$",
    "^@/trpc(.*)$",
    "^@/server(.*)$",
    "^@/components(.*)$",
    "^@/styles(.*)$",
    "^@/app(.*)$",
    "",
    "^[./]",
    "",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: true,
};

export default config;
