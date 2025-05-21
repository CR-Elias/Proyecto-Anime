export default function MyList() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950">
      <h2 className="text-2xl font-semibold mb-4">Mi Lista de Animes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="p-4 border rounded shadow">Anime 1</div>
        <div className="p-4 border rounded shadow">Anime 2</div>
      </div>
    </div>
  );
}
