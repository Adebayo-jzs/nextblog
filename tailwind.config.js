/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is the default font. This overrides/prepends it.
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        // Custom key for your terminal/code look
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
        // Adding a completely custom brand font
        brand: ['Oswald', 'sans-serif'],
      },
    },
  },
}