module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        blueEmerald: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(110 231 183)',
          'base-100': 'rgb(39 39 42)'
        },
        blueFuschia: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(217 70 239)',
          'base-100': 'rgb(39 39 42)'
        },
        blueLime: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(163 230 53)',
          'base-100': 'rgb(39 39 42)'
        },
        bluePink: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(255 53 184)',
          'base-100': 'rgb(39 39 42)'
        },
        bluePurple: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(168 85 247)',
          'base-100': 'rgb(39 39 42)'
        },
        blueOrange: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(251 146 60)',
          'base-100': 'rgb(39 39 42)'
        },
        blueRed: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(251 113 133)',
          'base-100': 'rgb(39 39 42)'
        },
        blueTeal: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(45 212 191)',
          'base-100': 'rgb(39 39 42)'
        },
        blueViolet: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(139 92 246)',
          'base-100': 'rgb(39 39 42)'
        },
        blueYellow: {
          primary: 'rgba(96 165 250)',
          secondary: 'rgb(250 204 21)',
          'base-100': 'rgb(39 39 42)'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};
