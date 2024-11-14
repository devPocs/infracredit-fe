/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: 
    {
      colors:{mint:"#47b65c",
            lagoon:"#3c8bc7",
            sunset:"#ff7418",
            navy:"#172b4d",
            grey:"#9ca3af",
            primaryBG:"#f2f2f4",  
      }, 
      fontFamily:{segoe: ['"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
                consolas:['Consolas', 'Courier New', 'monospace']
      },
      height:{
        navbar:"",
        footer:""
      }
                
    },

  },
  plugins: [],
}

