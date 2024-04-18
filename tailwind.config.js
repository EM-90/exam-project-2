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
        }
      }
      
    },
  },
  plugins: [],
}

