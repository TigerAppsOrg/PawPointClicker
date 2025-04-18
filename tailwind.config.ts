import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      screens: {
        xs: "500px",
      },
      animation: {
        spinCards: "spinCards 6s linear infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        wiggle: "wiggle 200ms ease-in-out",
        bounce: "bounce 1.5s infinite ease-in-out",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        fadeUp: "fadeUp 1.5s ease-out forwards",
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
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        fadeUp: {
          "0%": { transform: "translate(-50%, -50%)", opacity: "1" },
          "100%": { transform: "translate(-50%, -80%)", opacity: "0" },
        },
        fallingAnimation: {
          "0%": {
            transform: "translateY(-10%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(110vh)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
