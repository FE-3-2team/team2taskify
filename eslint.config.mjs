import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"], // 'prettier' 추가로 Prettier 관련 설정을 활성화
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
    ...compat.extends("prettier"),
  },
];
