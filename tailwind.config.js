import daisyui from "daisyui";

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
        custom_lg: "1152px",
      },
    },
  },
  plugins: [daisyui],
};
