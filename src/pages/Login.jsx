export default function Login() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950">
      <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
      <form className="space-y-4 w-full max-w-md">
        <input type="email" placeholder="Correo" className="w-full p-3 border rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-3 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
