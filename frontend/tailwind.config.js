/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily : {
         caveat: ["Caveat", "cursive"],
         sourceCode : ["Source Code Pro", 'monospace']
      }
    },
  },
  plugins: [
   
  ],
}

