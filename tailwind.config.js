/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'page-bg': '#093545',
        'input-bg': '#224957',
        'card-bg': '#092C39',
        'button-100': '#2BD17E',
        'button-200': '#209E5F',
      },

      width: {
        '300px': '300px'
      }, 

      height: {
        '45px': '45px'
      }
    },
  },
  plugins: [],
};
