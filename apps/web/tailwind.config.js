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
        background: "#080c14",
        surface: "#0f172a",
        surfaceCard: "rgba(17, 24, 39, 0.7)",
        terminalBorder: "rgba(255, 255, 255, 0.08)",
        gainGreen: "#10b981",
        gainGreenMuted: "rgba(16, 185, 129, 0.15)",
        techCyan: "#06b6d4",
        techCyanMuted: "rgba(6, 182, 212, 0.15)",
        lossRed: "#f43f5e",
        lossRedMuted: "rgba(244, 63, 94, 0.15)",
        warningAmber: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
