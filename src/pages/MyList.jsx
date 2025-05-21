import { useState } from "react";
import animes from "../components/animeList";
import { Star, CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyList() {
  const navigate = useNavigate();

  const initialList = animes.slice(0, 5).map((anime) => ({
    ...anime,
    rating: 0,
    finished: false,
    currentEpisode: 1,
    review: "",
    inputMode: "minutes",
  }));

  const [myList, setMyList] = useState(initialList);
  const [focusedReview, setFocusedReview] = useState(null);

  const updateField = (id, field, value) => {
    setMyList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="h-screen w-full bg-gray-950 text-white px-6 py-8 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-center">📺 Mi Lista de Animes</h2>

      <div className="overflow-y-auto max-h-[calc(100vh-130px)] scrollbar-none pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {myList.map((anime) => {
            const isAiring = anime.status === "RELEASING";
            const isMovie = anime.format === "MOVIE";

            const totalMinutes = anime.currentEpisode || 0;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            return (
              <div
                key={anime.id}
                className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col gap-3 relative"
              >
                {/* Terminado banner superior clickeable */}
                <div
                  onClick={() => updateField(anime.id, "finished", !anime.finished)}
                  className={`absolute top-0 left-0 right-0 text-center py-1 rounded-t-xl text-sm font-semibold tracking-wide z-10 cursor-pointer transition ${
                    anime.finished ? "bg-green-600 text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {anime.finished ? "✅ Terminado" : "No terminado"}
                </div>

                <div className="flex gap-4 pt-6">
                  <img
                    src={anime.coverImage.large}
                    alt={anime.title.romaji}
                    className="w-24 h-36 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{anime.title.romaji}</h3>
                    <p className="text-sm text-gray-400 mb-1">{anime.format}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      {anime.episodes} episodios
                    </p>
                  </div>
                </div>

                {/* Estado bajo la imagen */}
                <div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                      isAiring ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {isAiring ? (
                      <>
                        <CircleCheck size={14} /> En emisión
                      </>
                    ) : (
                      <>
                        <CircleX size={14} /> Finalizado
                      </>
                    )}
                  </span>
                </div>

                {/* Valoración en estrellas */}
                <div className="flex items-center gap-1 text-sm">
                  <span>Valoración:</span>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={20}
                      className={`cursor-pointer transition ${
                        anime.rating >= num
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-500"
                      }`}
                      onClick={() => updateField(anime.id, "rating", num)}
                    />
                  ))}
                </div>

                {/* Progreso */}
                <div className="text-sm">
                  <label className="block mb-1">
                    Progreso en {" "}
                    {isMovie && (
                      <span
                        onClick={() =>
                          updateField(
                            anime.id,
                            "inputMode",
                            anime.inputMode === "minutes" ? "hm" : "minutes"
                          )
                        }
                        className="text-indigo-400 font-semibold cursor-pointer hover:underline"
                      >
                        ({
                          anime.inputMode === "minutes"
                            ? "Minutos"
                            : "Horas y Minutos"
                        })
                      </span>
                    )}
                  </label>

                  {isMovie ? (
                    anime.inputMode === "minutes" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={anime.duration}
                          value={anime.currentEpisode}
                          onChange={(e) =>
                            updateField(
                              anime.id,
                              "currentEpisode",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-center"
                        />
                        <span className="text-xs text-gray-400">
                          de {anime.duration} min
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          value={hours}
                          onChange={(e) =>
                            updateField(
                              anime.id,
                              "currentEpisode",
                              parseInt(e.target.value) * 60 + minutes
                            )
                          }
                          className="w-16 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-center"
                          placeholder="h"
                        />
                        <span className="text-gray-400">h</span>
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={minutes}
                          onChange={(e) =>
                            updateField(
                              anime.id,
                              "currentEpisode",
                              hours * 60 + parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-center"
                          placeholder="min"
                        />
                        <span className="text-xs text-gray-400">
                          de {Math.floor(anime.duration / 60)}h {anime.duration % 60}min
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={anime.episodes}
                        value={anime.currentEpisode}
                        onChange={(e) =>
                          updateField(
                            anime.id,
                            "currentEpisode",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-center"
                      />
                      <span className="text-xs text-gray-400">
                        de {anime.episodes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Reseña */}
                <div>
                  <label
                    htmlFor={`review-${anime.id}`}
                    className="block text-sm mb-1 cursor-pointer"
                    onClick={() => setFocusedReview(anime.id)}
                  >
                    Reseña personal:
                  </label>
                  <textarea
                    id={`review-${anime.id}`}
                    rows={focusedReview === anime.id ? 5 : 2}
                    onFocus={() => setFocusedReview(anime.id)}
                    onBlur={() => setFocusedReview(null)}
                    value={anime.review}
                    onChange={(e) =>
                      updateField(anime.id, "review", e.target.value)
                    }
                    placeholder="¿Qué te ha parecido este anime?"
                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded resize-none transition-all duration-200"
                  />
                </div>

                <button
                  onClick={() => navigate(`/anime/${anime.id}`)}
                  className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition"
                >
                  Ver detalles del anime
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
