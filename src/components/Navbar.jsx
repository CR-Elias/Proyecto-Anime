import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/search", label: "Buscar" },
    { to: "/mylist", label: "Mi Lista" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Registro" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-800 shadow-lg w-full">
      <div className="max-w-full px-6 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide text-white">AnimeVault</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                pathname === item.to
                  ? "bg-white text-purple-900"
                  : "text-white hover:bg-white hover:text-purple-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
