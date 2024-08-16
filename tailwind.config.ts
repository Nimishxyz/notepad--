import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)', opacity: "0.8" },
          '10%': { transform: 'rotate(14deg)', opacity: "0.7" },
          '20%': { transform: 'rotate(-8deg)', opacity: "0.6" },
          '30%': { transform: 'rotate(14deg)', opacity: "0.5" },
          '40%': { transform: 'rotate(-4deg)', opacity: "0.4" },
          '50%': { transform: 'rotate(10.0deg)', opacity: "0.3" },
          '60%': { transform: 'rotate(0.0deg)', opacity: "0.2" },
          '100%': { transform: 'rotate(0.0deg)', opacity: "0.1" },
        },      
      },
      animation: {
        'waving': 'wave 2s ease-in-out forwards',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
