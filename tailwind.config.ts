import type { Config } from "tailwindcss";

/**
 * PG App Studios design tokens.
 *
 * Ink background, warm off-white text, one soft violet-to-peach accent used
 * sparingly. Every app brings its own accent colour (src/data/appColors.json),
 * so the studio palette stays quiet and lets the apps be the colour.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        ink: {
          950: "#07070A",
          900: "#0B0B10",
          850: "#101016",
          800: "#15151D",
          700: "#1E1E28",
          600: "#2A2A36",
        },
        fg: {
          DEFAULT: "#F4F3F8",
          2: "#A9A7B8",
          3: "#8C8A98",
        },
        brand: {
          DEFAULT: "#C4B5FD",
          violet: "#A78BFA",
          pink: "#F0ABFC",
          peach: "#FDBA74",
          deep: "#7C5CFF",
        },
        calm: {
          DEFAULT: "#CDBDF6",
          sage: "#A7D7C5",
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8.2vw, 7.25rem)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(2rem, 4.2vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-sm": ["clamp(1.6rem, 3vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "marquee-x": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-y": { from: { transform: "translateY(0)" }, to: { transform: "translateY(-50%)" } },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.95)" },
        },
        "word-in": {
          from: { opacity: "0", transform: "translateY(0.35em)", filter: "blur(10px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-angle": { to: { "--angle": "360deg" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "marquee-x": "marquee-x var(--marquee-duration, 48s) linear infinite",
        "marquee-y": "marquee-y var(--marquee-duration, 70s) linear infinite",
        aurora: "aurora 22s ease-in-out infinite",
        "word-in": "word-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 7s ease-in-out infinite",
        "spin-angle": "spin-angle 6s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
