const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{tsx,jsx,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        jennaSue: ["Shadows Into Light", "cursive"]
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }
      });
    })
  ]
};
