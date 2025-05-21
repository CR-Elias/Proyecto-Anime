import { Link } from "react-router-dom";
import heroImage from "../assets/login-bg.jpg"; // Usa una imagen temática o cambia por otra de anime

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-300 drop-shadow mb-4 animate-fade-in">
          Bienvenido a AnimeVault
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 animate-fade-in delay-200">
          Tu plataforma para descubrir, seguir y calificar tus animes favoritos. Explora nuevos títulos y lleva un registro de tu progreso de forma visual y personalizada.
        </p>
        <Link
          to="/search"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition animate-fade-in delay-400"
        >
          Comienza a explorar →
        </Link>
      </div>

      {/* Animaciones opcionales */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
