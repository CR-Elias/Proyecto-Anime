// tailwind.config.js
export default {
    darkMode: 'class', // Habilita modo oscuro por clase

  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f5c047',      // Dorado del logo
        background: '#f4ead6',   // Beige claro
        text: '#1f1f1f',         // Negro profundo para textos
        secondary: '#333333'     // Gris oscuro para hover o detalle
      },
    },
  },
  plugins: [],
};
