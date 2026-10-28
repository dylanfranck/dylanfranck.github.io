import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [".next/**", "out/**", "coverage/**", "legacy/**", "reference/**", "public/vendor/**", "next-env.d.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // WHY: @/ alias only (FRONTEND_CODEGEN_STANDARD carry-over) — relative
      // paths break silently when files move between layers.
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["./*", "../*"], message: "Use the @/ alias, not relative imports." }] },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default config;
