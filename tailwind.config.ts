import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    animation: {
      spinCards: "spinCards 6s linear infinite",
      shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      wiggle: "wiggle 200ms ease-in-out",
      bounce: "bounce 1.5s infinite ease-in-out",
    },
    keyframes: {
      spinCards: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      bounce: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-20px)" },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      shake: {
        "10%, 90%": {
          transform: "translate3d(-1px, 0, 0)",
        },
        "20%, 80%": {
          transform: "translate3d(2px, 0, 0)",
        },
        "30%, 50%, 70%": {
          transform: "translate3d(-4px, 0, 0)",
        },
        "40%, 60%": {
          transform: "translate3d(4px, 0, 0)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
