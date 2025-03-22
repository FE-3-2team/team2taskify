import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      prettier: import("eslint-plugin-prettier"),
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],

    rules: {
      "prettier/prettier": "error", // Prettier 규칙을 ESLint에서 적용
    },
  },

  ...compat.extends("prettier"),
];
