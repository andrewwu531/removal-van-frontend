import daisyui from "daisyui";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path covers your components
    // any other paths if needed
  ],

  theme: {
    extend: {
      keyframes: {
        scaleAnimation: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        scale: "scaleAnimation 1.5s ease-in-out infinite",
      },
      maxWidth: {
        "screen-custom_lg": "1150px",
        "7xl": "80rem", // Tailwind default for max-w-7xl is usually defined; adjust if needed
      },
    },
  },
  plugins: [daisyui, scrollbarHide],
};
