/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        BebasNeue: ["Bebas Neue", "sans-serif"],
      },
      animation: {
        bottomToTop: "bottomToTop 3s ease 1",
        bottomToTop2: "bottomToTop2 3.6s ease 1",
        bottomToTop3: "bottomToTop3 4.3s ease 1",
        fadeIn: "fadeIn 3.5s ease 1",
        fadeInZoom: "fadeInZoom 1.2s ease 1",
      },
      keyframes: {
        bottomToTop: {
          "0%, 25%": { transform: "translateY(180px)" },
          "100%": { transform: "translateY(0)" },
        },
        bottomToTop2: {
          "0%, 50%": { transform: "translateY(250px)" },
          "100%": { transform: "translateY(0)" },
        },
        bottomToTop3: {
          "0%, 65%": { transform: "translateY(300px)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInZoom: {
          "0%, 30%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      transitionDelay: {
        1000: "1000ms",
        1200: "1200ms",
        2000: "2000ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
