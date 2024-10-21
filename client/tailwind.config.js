/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.7)'
      },
      colors: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
         '3': '3 3 0%',
        '4': '4 4 0%',
         '5': '5 5 0%',
          '6': '6 6 0%',
          '7': '7 7 0%',
          '8': '8 8 0%',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            transform: 'translateY(20px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          }
        },
        'slide-top-sm': {
          '0%': {
            transform: 'translateY(8px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          }
        },
        'scale-up-center': {
          '0%': {
                    transform: 'scale(0.5)',
          },
          '100%': {
                    transform: 'scale(1)'
          }
        }
        
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        'slide-top-sm': 'slide-top 0.15s linear',
        'scale-up-center': 'scale-up-center 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
