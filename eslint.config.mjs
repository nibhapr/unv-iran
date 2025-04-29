import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ["node_modules/", ".next/", "dist/", "build/", "**/*.d.ts"]
  },
  ...compat.extends(
    "next/core-web-vitals"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Add TypeScript-specific rules here
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      // Disable strict rules causing problems
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      
      // New rules to ignore Next.js page props issues
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "react/prop-types": "off",
    },
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
  },
];
