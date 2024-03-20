/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',
        'secondary': '#9990FF',
        'main': '#6366F1'
      },
      fontFamily: {
        'poppins': ['"Poppins"', 'cursive'],
      },
      boxShadow: {
        'white': '10px 10px 50px rgba(255, 0, 255, 0.5)',
        'black': '0 35px 60px -15px rgba(255, 255, 255, 1)',
        'chat-received': '-3px 2px 6px #9ca3af',
        'chat-sent': '3px 2px 6px #9ca3af'
      }
    },
  },
  plugins: [],
}

/* line-height: 1.5;
    letter-spacing: 0.00938em;
    color: white;
    font-family: Inter;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
 */