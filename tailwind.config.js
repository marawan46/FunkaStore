const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               fontFamily: {
                    title: ['"Rubik"', "sans-serif"],
                    subtitle: ["Cairo", "sans-serif"],
               },
               colors: {
                    primary: {
                         50: "#fff1f4",
                         100: "#ffe0e9",
                         200: "#ffbfd3",
                         300: "#ff9cbb",
                         400: "#ff7aa4",
                         500: "#ff5a8e", // 💖 main brand color
                         600: "#e04a7d",
                         700: "#be3b68",
                         800: "#9c2d54",
                         900: "#7a1e41",
                    },
                    secondary: {
                         50: "#fff6f8",
                         100: "#ffe9ef",
                         200: "#ffd3de",
                         300: "#ffb8ca",
                         400: "#ff9cb6",
                         500: "#ff7fa2",
                         600: "#e66f91",
                         700: "#c75d7e",
                         800: "#a84c6a",
                         900: "#8a3a57",
                    },
               },
          },
     },
     plugins: [],
});
