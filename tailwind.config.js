/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          primary: 'var(--primary-color)',
          hoverColour: 'var(--hover-color)',
          liAnimateColor: 'var(--list-item-animation-color)',
          editColor: 'var(--edit-color)',
          tagTextColor: 'var(--tag-text-color)',
          deleteColor: 'var(--delete-color)',
          mutedText: 'var(--gray-text)',
        }
      },

      screens: {
        'xs': '390',
      },

      backgroundColor: {
        skin: {
          primary: 'var(--primary-color)',
          deleteBg: 'var(--delete-bg-color)',
          infoBg: 'var(--info-modal-bg)',
          editBg: 'var(--edit-bg-color)',
          createBg: 'var(--background-color)',
          tagBg: 'var( --tag-bg-color)',
        }
      },
      borderColor: {
        skin: {
          innerBorderNewLi: 'var(--inner-color-new-item)',
          liAnimateColor: 'var(--list-item-animation-color)',
          InputBorder: 'var(--primary-color)',
        }
      },
      keyframes: {
        pulseBackground: {
          '0%, 100%': {
            backgroundColor: 'rgba(191, 219, 254, 1)',
            boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)', 
          },
          '50%': {
            backgroundColor: 'rgba(147, 197, 253, 1)', 
            boxShadow: '0 0 20px rgba(37, 99, 235, 1)',
          },
        },
      },
      animation: {
        pulseBackground: 'pulseBackground 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


