import React, { useEffect, useState, useRef, useCallback } from "react";
import animes from "../components/animeList";
import { useNavigate } from "react-router-dom";
import { CircleCheck, CircleX } from "lucide-react";

export default function SearchAnime() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  const allGenres = [...new Set(animes.flatMap((a) => a.genres))];

  const filteredAnimes = animes.filter((anime) => {
    const matchesTitle = anime.title.romaji
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      genreFilter === "" || anime.genres.includes(genreFilter);
    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "RELEASING" && anime.status === "RELEASING") ||
      (statusFilter === "FINISHED" && anime.status === "FINISHED");

    return matchesTitle && matchesGenre && matchesStatus;
  });

  const displayedAnimes = filteredAnimes.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    if (visibleCount < filteredAnimes.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 10, filteredAnimes.length));
        setLoading(false);
      }, 2000);
    }
  }, [visibleCount, filteredAnimes.length]);

  useEffect(() => {
    setVisibleCount(10);
  }, [search, genreFilter, statusFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          loadMore();
        }
      },
      {
        threshold: 1,
        root: containerRef.current, // Observe scroll in container
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.disconnect();
    };
  }, [loadMore, loading]);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col">
      <div className="sticky top-0 px-4 py-6 border-b border-gray-800 bg-gray-950 z-10">
        <h2 className="text-2xl font-semibold mb-4">Buscar Anime</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="p-2 rounded bg-gray-800 text-white w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 rounded bg-gray-800 text-white w-full md:w-1/4"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded bg-gray-800 text-white w-full md:w-1/4"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="RELEASING">En emisión</option>
            <option value="FINISHED">Finalizados</option>
          </select>
        </div>
      </div>

      {/* Contenedor con scroll */}
      <div
        ref={containerRef}
        className="px-4 py-6 overflow-y-auto max-h-[calc(100vh-150px)]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayedAnimes.map((anime) => {
            const isAiring = anime.status === "RELEASING";
            return (
              <div
                key={anime.id}
                onClick={() => navigate(`/anime/${anime.id}`)}
                className="bg-gray-800 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col"
              >
                <div className="w-full h-60 overflow-hidden rounded-t-lg">
                  <img
                    src={anime.coverImage.large}
                    alt={anime.title.romaji}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 text-sm flex flex-col flex-grow justify-between">
                  <h3 className="text-white font-semibold text-center text-sm mb-2">
                    {anime.title.romaji}
                  </h3>

                  <div className="flex justify-center mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 ${
                        isAiring
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {isAiring ? (
                        <>
                          <CircleCheck size={14} />
                          En emisión
                        </>
                      ) : (
                        <>
                          <CircleX size={14} />
                          Finalizado
                        </>
                      )}
                    </span>
                  </div>

                  <div className="text-gray-400 text-xs text-center">
                    <p>{anime.format} • {anime.episodes} ep</p>
                    <p>{anime.seasonYear}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={loaderRef} className="text-center py-4">
          {loading ? (
            <p className="text-gray-400 animate-pulse">Cargando...</p>
          ) : (
            displayedAnimes.length >= filteredAnimes.length && (
              <p className="text-gray-500">No hay más resultados</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
