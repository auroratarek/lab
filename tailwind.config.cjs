/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        "Poppins-Black": ["Poppins-Black"],
        "Poppins-BlackItalic": ["Poppins-BlackItalic"],
        "Poppins-Bold": ["Poppins-Bold"],
        "Poppins-BoldItalic": ["Poppins-BoldItalic"],
        "Poppins-ExtraBold": ["Poppins-ExtraBold"],
        "Poppins-ExtraLight": ["Poppins-ExtraLight"],
        "Poppins-ExtraBoldItalic": ["Poppins-ExtraBoldItalic"],
        "Poppins-ExtraLightItalic": ["Poppins-ExtraLightItalic"],
        "Poppins-Light": ["Poppins-Light"],
        "Poppins-LightItalic": ["Poppins-LightItalic"],
        "Poppins-Medium": ["Poppins-Medium"],
        "Poppins-MediumItalic": ["Poppins-MediumItalic"],
        "Poppins-Regular": ["Poppins-Regular"],
        "Poppins-SemiBold": ["Poppins-SemiBold"],
        "Poppins-SemiBoldItalic": ["Poppins-SemiBoldItalic"],
        "Poppins-Thin": ["Poppins-Thin"],
        "Poppins-ThinItalic": ["Poppins-ThinItalic"],
      },
      boxShadow: {
        around:
          "0px 0px 24px -4px rgba(16, 24, 40, 0.1), 0px 0px 8px -4px rgba(16, 24, 40, 0.04)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
