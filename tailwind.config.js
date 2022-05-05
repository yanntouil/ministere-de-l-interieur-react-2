module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#108DB2',
        'primary-600': '#0E7695',
        'secondary-500': '#EE7326',
        'highlight-500': '#CE1537',
        'link-500': '#5d5d5d',
        'disabled': '#E5E5E2',
        'background': '#F5F1E9',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '9/16': '9 / 16',
      },
      boxShadow: {
        'form': '2px 2px 7px 6px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
