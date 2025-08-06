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
        nascar: {
          red: "#E21E2C",
          blue: "#003A7D",
          yellow: "#FFD700",
          black: "#1a1a1a",
          white: "#FFFFFF",
          gray: "#6B7280",
          'track-gray': "#4A5568",
        },
        racing: {
          'flag-start': "#22C55E",
          'flag-caution': "#F59E0B",
          'flag-checkered': "#000000",
          'tire-black': "#1F2937",
        }
      },
      backgroundImage: {
        'checkered-flag': "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 50% / 20px 20px",
        'racing-stripes': "linear-gradient(45deg, transparent 25%, rgba(255,215,0,0.1) 25%, rgba(255,215,0,0.1) 50%, transparent 50%, transparent 75%, rgba(255,215,0,0.1) 75%)",
      },
      animation: {
        'race-car': 'race 3s ease-in-out infinite alternate',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        race: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(10px)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
