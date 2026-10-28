/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Groww Signature Palette
        growwBg: "#f8fafc",
        growwWhite: "#ffffff",
        growwCard: "#ffffff",
        growwBorder: "#e5e7eb",
        growwBorderSubtle: "#f1f5f9",
        growwGreen: "#00d09c",
        growwGreenHover: "#00b887",
        growwGreenLight: "#e6faf5",
        growwGreenText: "#008767",
        growwRed: "#eb5757",
        growwRedLight: "#fef2f2",
        growwRedText: "#b91c1c",

        // Angel One Signature Palette
        angelBlue: "#1849a9",
        angelBlueHover: "#123887",
        angelBlueLight: "#eff6ff",
        angelBlueText: "#1d4ed8",
        angelOrange: "#ff5900",
        angelOrangeLight: "#fff4ed",
        angelOrangeText: "#c2410c",

        // Dark Matte Mode (for dark mode toggle without neo glow)
        matteDark: "#11141d",
        matteCard: "#181d2a",
        matteBorder: "#242c3f",

        // Typography Tokens
        textTitle: "#0f172a",
        textBody: "#334155",
        textMuted: "#64748b",
        textSubtle: "#94a3b8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        cardHover: "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
