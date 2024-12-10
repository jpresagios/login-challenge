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
        purple: '#F0EDFFCC',
        darkpurple: '#7749F8',
        graylight: '#343A40'
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)',
      },
      boxShadow: {
        'shadow-button': 'box-shadow: 0px 8px 21px 0px #00000029'
      }
    },
  },
  plugins: [],
} satisfies Config;
