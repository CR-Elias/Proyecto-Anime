export default function Register() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950">
      <h2 className="text-2xl font-semibold mb-6">Registro</h2>
      <form className="space-y-4 w-full max-w-md">
        <input type="text" placeholder="Nombre de usuario" className="w-full p-3 border rounded" />
        <input type="email" placeholder="Correo" className="w-full p-3 border rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-3 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Crear Cuenta</button>
      </form>
    </div>
  );
}
