/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  extend: {
    fontFamily: {
      sans: ['"IBM Plex Sans"', "sans-serif"]
    }
  }
}
