/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkTheme:"light"
    },
  },
  daisyui:{
      themes:[
        "light"
      ]
  },
  plugins: [
    require('daisyui'),
  ],
}