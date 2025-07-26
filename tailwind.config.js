/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        carMove: {
          '0%': { transform: 'translateX(0)' },
          '30%': { transform: 'translateX(50px)' },
          '60%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },


      animation: {
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        floatY: 'floatY 3s ease-in-out infinite',
        carMove: 'carMove 4s ease-in-out infinite',
        fadeLeft: 'fadeLeft 1s ease-out forwards',
        fadeRight: 'fadeRight 1s ease-out forwards',
      },
    },
  },
  plugins: [daisyui],
}


