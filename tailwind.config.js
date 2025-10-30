const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               fontFamily: {
                    title: ['"Rubik"', "sans-serif"],
                    subtitle:["Cairo", "sans-serif"],
               },
          },
     },
     plugins: [],
});
