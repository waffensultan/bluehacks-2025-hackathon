import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@next/next/no-img-element": "off", // Allow using <img> instead of <Image />
            "jsx-a11y/alt-text": "off", // Disable alt text warnings
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // Allow non-null assertions
            "react/no-unescaped-entities": "off", // Disable warnings for special characters like ' and "
            "react-hooks/exhaustive-deps": "off", // Disable missing dependencies warning in useEffect
        },
    },
];

export default eslintConfig;
