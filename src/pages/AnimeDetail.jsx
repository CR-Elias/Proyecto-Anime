import { useParams, useNavigate } from "react-router-dom";
import animes from "../components/animeList";
import { CircleCheck, CircleX, Star } from "lucide-react";
import { useState } from "react";

export default function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const anime = animes.find((a) => a.id === parseInt(id));
  const [rating, setRating] = useState(0);
  const [inList, setInList] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState("comentarios");
  const [comments, setComments] = useState({});
  const [newInput, setNewInput] = useState("");

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <p className="text-lg text-red-500">Anime no encontrado.</p>
      </div>
    );
  }

  const isAiring = anime.status === "RELEASING";
  const isMovie = anime.format === "MOVIE";

  const formattedStart = `${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}`;
  const formattedEnd = anime.endDate?.year
    ? `${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}`
    : "¿En curso?";

  const handleAddInput = () => {
    if (!newInput.trim()) return;
    const updated = { ...comments };
    const key = isMovie ? "movie" : `${selectedEpisode}-${activeTab}`;
    if (!updated[key]) updated[key] = [];
    updated[key].push(newInput);
    setComments(updated);
    setNewInput("");
  };

  const renderContent = () => {
    const key = isMovie ? "movie" : `${selectedEpisode}-${activeTab}`;
    const content = comments[key] || [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    ];

    return (
      <div className="space-y-3 mt-4">
        {content.map((cmt, idx) => (
          <div
            key={idx}
            className="bg-gray-900 px-4 py-3 rounded border border-gray-700 text-sm"
          >
            {cmt}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full text-white overflow-hidden">
      {/* Fondo dinámico desenfocado */}
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

          {inList ? (
            <button
              onClick={() => setInList(false)}
              className="border border-red-500 text-red-500 px-4 py-2 rounded transition hover:bg-red-500/10"
            >
              Quitar de la lista
            </button>
          ) : (
            <button
              onClick={() => setInList(true)}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
            >
              + Añadir a mi lista
            </button>
          )}
        </div>

        {/* Estrellas de puntuación */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={24}
              className={`cursor-pointer transition ${
                value <= rating
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-gray-500"
              }`}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal con scroll */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none px-6 py-8 pb-32 h-[calc(100vh-80px)]">
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

        {/* Comentarios y Reseñas */}
        <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-800/70 rounded-xl shadow-xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-indigo-300">
            Comentarios y Reseñas
          </h3>          {/* Episodios solo si no es película */}
          {!isMovie && (
            <div className="overflow-x-auto pb-4 mb-4 border-b border-gray-700 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
              <div className="flex gap-2 pb-2 min-w-max">
                {[...Array(anime.episodes)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedEpisode(idx + 1)}
                    className={`px-4 py-2 rounded font-semibold text-sm transition ${
                      selectedEpisode === idx + 1
                        ? "bg-indigo-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Episodio {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-600">
            {["comentarios", "reseñas"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold text-lg capitalize ${
                  activeTab === tab
                    ? "bg-gray-700 text-white"
                    : "bg-gray-900 text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Input */}
          <label className="block mb-2 text-sm">
            Agregar {activeTab === "comentarios" ? "comentario" : "reseña"}
          </label>
          <div className="flex gap-2">
            <textarea
              rows={3}
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              placeholder={`Escribe tu ${activeTab}...`}
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded border border-gray-600"
            />
            <button
              onClick={handleAddInput}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition h-fit"
            >
              Añadir
            </button>
            
          </div>
            <label className="block mb-2 mt-2 text-sm">
            {activeTab === "comentarios" ? "comentarios" : "reseñas"}
          </label>
          {/* Lista de comentarios/reseñas */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
