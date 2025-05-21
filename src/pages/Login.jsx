import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from "../assets/login-bg.jpg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de autenticación
    login({ name: "Usuario" }); // Aquí puedes usar datos reales si tienes backend
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-slate-900 relative overflow-hidden pt-20">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${loginIllustration})` }}
      ></div>

      {/* Capa de fondo oscura */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-md bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-400">
          Bienvenido de nuevo
        </h2>
        <p className="text-center text-slate-300 mb-6 text-sm">
          Accede a tu cuenta para continuar explorando tu universo anime favorito.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-3 py-3 rounded-md bg-slate-900 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full pl-10 pr-3 py-3 rounded-md bg-slate-900 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox rounded bg-slate-800" />
              Recuérdame
            </label>
            <Link to="/forgot-password" className="text-indigo-400 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 rounded-md transition"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-sm text-slate-300 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
