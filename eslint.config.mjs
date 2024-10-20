import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import hooksPlugin from "eslint-plugin-react-hooks";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  ...fixupConfigRules(pluginReactConfig),

  // Basic ESLint configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": 0,
      "react/jsx-uses-react": 0,
      "react/no-unescaped-entities": 0,
      "react/prop-types": 0,
      "@next/next/no-img-element": 0,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/consistent-type-imports": 1,
      "no-empty-pattern": 0,
    },
  },

  // Next.js specific settings
  {
    ignores: [".next/"],
  },
  ...fixupConfigRules(compat.extends("plugin:@next/next/core-web-vitals")),

  // React Hooks configuration
  {
    plugins: { "react-hooks": hooksPlugin },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: hooksPlugin.configs.recommended.rules,
  },

  // Boundaries plugin configuration
  {
    plugins: { boundaries },
    settings: {
      "boundaries/include": ["src/**/*", "app/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/actions/**/*",
            "src/components/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/schemas/**/*",
            "src/types/**/*",
            "src/utils/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*"],
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared"],
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName}" }],
              ],
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]],
            },
          ],
        },
      ],
    },
  },

  // Ignore files
  {
    ignores: ["tailwind.config.ts", "next.config.mjs", "*.js"],
  },
];
