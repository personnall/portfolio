/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#13131f",
        primary: "#8b5cf6",
        secondary: "#06b6d4",
        accent: "#ec4899",
      },
      boxShadow: {
        'neon-purple': '0 0 5px #8b5cf6, 0 0 20px #8b5cf6',
        'neon-cyan': '0 0 5px #06b6d4, 0 0 20px #06b6d4',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to right, #8b5cf6, #06b6d4, #ec4899)',
      }
    },
  },
  plugins: [],
}
