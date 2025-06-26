const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      keyframes: {
        pulando: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        pulando: "pulando 1s ease-in-out infinite",
      },
    },
  },
};

export default config;
