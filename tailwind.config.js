/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    },
    capsize: {
      fontMetrics: {
        sans: require("@capsizecss/metrics/inter"),
        monospace: require("@capsizecss/metrics/jetBrainsMono"),
      },
    },
  },
  plugins: [require("@themosaad/tailwindcss-capsize")],
};
