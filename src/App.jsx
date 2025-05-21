import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchAnime from "./pages/SearchAnime";
import MyList from "./pages/MyList";
import AnimeDetail from "./pages/AnimeDetail"; // ⬅️ Añade esta línea


export default function App() {
  return (
    <Router>
      <div className="fixed inset-0 bg-gray-950 min-h-screen text-white flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchAnime />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />

            <Route path="/mylist" element={<MyList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}