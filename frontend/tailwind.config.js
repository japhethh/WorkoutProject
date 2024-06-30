/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
     headline:"rgba(var(--headline))",
     paragraph:"rgba(var(--paragraph))",
     background:"rgba(var(--background))",
     secondaryparagraph:"rgba(var(--secondary-paragraph))",
     email:"rgba(var(--email-color))",
     message:"rgba(var(--message-color))",
      }
    },
    container:{
      center:true,
    }
  },
  plugins: [
    require('daisyui'),

  ],
}