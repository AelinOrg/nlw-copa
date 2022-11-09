/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: () => ({
        app: 'url("../assets/lines-bg.svg")',
      }),

      colors: {
        ignite: {
          500: "#129E57",
        },

        yellow: {
          500: "#F7DD43",
          700: "#E5CD3D",
        },

        gray: {
          100: "#E1E1E6",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
      },
    },
  },
  plugins: [],
};
