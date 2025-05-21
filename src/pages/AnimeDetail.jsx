import { useParams, useNavigate } from "react-router-dom";
import animes from "../components/animeList";
import { CircleCheck, CircleX, Star } from "lucide-react";
import { useState } from "react";

export default function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const anime = animes.find((a) => a.id === parseInt(id));
  const [rating, setRating] = useState(0);

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <p className="text-lg text-red-500">Anime no encontrado.</p>
      </div>
    );
  }

  const isAiring = anime.status === "RELEASING";
  const formattedStart = `${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}`;
  const formattedEnd = anime.endDate?.year
    ? `${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}`
    : "¿En curso?";

  return (
    <div className="relative h-screen w-full text-white overflow-hidden">
      {/* Fondo difuminado del anime */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-lg brightness-50"
        style={{ backgroundImage: `url(${anime.coverImage.large})` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Barra superior con acciones */}
      <div className="relative z-10 px-6 py-4 border-b border-gray-800 bg-black/60 backdrop-blur-md shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
          >
            ← Volver atrás
          </button>

          <button
            onClick={() => alert("Añadido a tu lista")}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
          >
            + Añadir a mi lista
          </button>
        </div>

        {/* Estrellas de puntuación */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={24}
              className={`cursor-pointer transition ${
                value <= rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-500"
              }`}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal con scroll */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 pb-32">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:flex md:gap-10">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-purple-300">
                {anime.title.romaji}
              </h1>
              <p className="text-gray-300 italic">{anime.title.english}</p>
              <p className="text-sm text-gray-400">{anime.title.native}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span
                className={`flex items-center gap-1 font-semibold px-3 py-1 rounded-full ${
                  isAiring ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {isAiring ? <CircleCheck size={16} /> : <CircleX size={16} />}
                {isAiring ? "En emisión" : "Finalizado"}
              </span>
              <span className="text-gray-200">
                {anime.format} • {anime.episodes} episodios
              </span>
            </div>

            <div className="text-sm text-gray-200 space-y-3 leading-relaxed max-h-[300px] overflow-y-auto pr-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: anime.description,
                }}
              />
            </div>

            <div className="border-t border-gray-600 pt-4 text-sm text-gray-300 space-y-2">
              <p>
                <strong>Duración:</strong> {anime.duration} min por episodio
              </p>
              <p>
                <strong>Emitido:</strong> {formattedStart} - {formattedEnd}
              </p>
              <p>
                <strong>Temporada:</strong> {anime.season} {anime.seasonYear}
              </p>
              <p>
                <strong>Géneros:</strong>{" "}
                <span className="text-gray-100">{anime.genres.join(", ")}</span>
              </p>
              <p>
                <strong>Estudio:</strong>{" "}
                {anime.studios?.nodes?.map((s) => s.name).join(", ") ||
                  "Desconocido"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
