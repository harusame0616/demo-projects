import vitest from "@vitest/eslint-plugin";
import playwright from 'eslint-plugin-playwright';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import neostandard from "neostandard";



const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwind.configs["flat/recommended"],
  ...neostandard({ noStyle: true, noJsx: true }),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{browser,server}.test.{ts,tsx}"], // or any other pattern
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/no-alias-methods": ["error"],
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["e2e/**/*.e2e.test.ts"]
  }

];

export default eslintConfig;
