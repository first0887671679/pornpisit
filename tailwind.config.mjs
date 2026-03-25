/**
 * Tailwind configuration with red-black branding.
 */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b30000", // red
        dark: "#000000",   // black
      },
    },
  },
  plugins: [],
};
