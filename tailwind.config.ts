
const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {  extend: {
      colors: {
        customColor: '#f4f0ec', // Add your custom color here
        customColor2: '#cda274',
        customColor3: '#292f36',
      },
    }, 
  },
  plugins: [
    addDynamicIconSelectors(), // ← plug-in added
  ],
}