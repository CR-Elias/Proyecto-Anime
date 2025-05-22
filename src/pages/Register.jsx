import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import backgroundImage from "../assets/regig.jpg";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: formData.firstName || "Nuevo Usuario" });
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex items-stretch justify-center bg-gray-950 text-white overflow-hidden">
      <div className="flex w-full h-full max-w-none">
        <div className="w-1/2 relative overflow-hidden h-full">
          <div
            className="absolute inset-0 bg-repeat-x bg-cover animate-slide bg-left"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              animation: "slideLeft 40s linear infinite",
            }}
          ></div>
        </div>

        <div className="w-1/2 bg-gray-800/70 p-12 space-y-6 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Crear una cuenta</h2>
          <p className="text-sm text-gray-300">
            ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400 hover:underline">Inicia sesión</Link>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded bg-gray-800 border border-gray-700 text-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-3 rounded bg-slate-900 border border-slate-600 text-white"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded bg-slate-900 border border-slate-600 text-white"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded bg-slate-900 border border-slate-600 text-white"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="form-checkbox bg-gray-700 border-slate-600"
              />
              Acepto los <span className="text-indigo-400">Términos y Condiciones</span>
            </label>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 rounded"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideLeft {
          0% { background-position: 0% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
}
