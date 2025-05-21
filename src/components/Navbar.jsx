import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logo.png";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const dropdownRef = useRef();

  // Cargar preferencia de tema
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/search", label: "Buscar" },
    { to: "/mylist", label: "Mi Lista", protected: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-800 dark:from-gray-900 dark:to-gray-800 shadow-lg w-full">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* Logo y tema */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="AnimeVault Logo"
              className="h-10 w-auto rounded-md shadow-md transition-transform duration-300 group-hover:rotate-[25deg]"
            />
            <h1 className="text-3xl font-extrabold tracking-wide text-white dark:text-yellow-300">
              AnimeVault
            </h1>
          </Link>

          {/* Switch tema */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-300 ${
              darkMode ? "justify-end" : "justify-start"
            }`}
            title="Cambiar tema"
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>

        <div className="flex items-center gap-8">
          {/* Navegación principal */}
          <div className="flex items-center gap-4">
            {navItems.map((item) =>
              item.protected && !user ? (
                <button
                  key={item.to}
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-full text-base font-semibold text-white hover:bg-white hover:text-purple-900 transition"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-full text-base font-semibold transition ${
                    pathname === item.to
                      ? "bg-white text-purple-900"
                      : "text-white hover:bg-white hover:text-purple-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Login / Registro o Menú Usuario */}
          <div className="flex items-center gap-4 ml-6 border-l border-white pl-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-purple-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-yellow-400 text-purple-900 font-semibold rounded-full hover:bg-yellow-300 transition"
                >
                  Registro
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                    {user.name[0]}
                  </div>
                  <span>{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg z-50 overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Mi perfil
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Favoritos
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Configuración
                    </Link>
                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 text-red-600 dark:text-red-300"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
