/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#6D8187",
        heading: "#537178",
        input: "#EEF1F8",
        placeholder: "#7A7D7E",
        button: "#5285EC",
        bullets: "#8F9EA2",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
