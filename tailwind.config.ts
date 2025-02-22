import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#FF6912",
                secondary: "#FB5512",
                light: "#E8E9FC",
                dark: "#03032C",
                white: "#FFFFFF",
                info: "#FDA303",
                accent: {
                    "1": "#3C4564",
                    "2": "#5E6E92",
                    "3": "#A1AAB4",
                },
                success: "#60B100",
                warning: "#FFC473",
                danger: "#F80066",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
