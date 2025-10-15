import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Conocenos from "./pages/Conocenos";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import RecuperarCuenta from "./pages/RecuperarCuenta";
import EscribirResena from "./pages/EscribirResena";
import Hoteles from "./pages/categorias/Hoteles";
import Restaurantes from "./pages/categorias/Restaurantes";
import Entretenimiento from "./pages/categorias/Entretenimiento";
import Atracciones from "./pages/categorias/Atracciones";
import Dashboard from "./pages/Dashboard";

// 👉 Importa el formulario de lugares y el perfil
import LugaresForm from "./pages/LugaresForm";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent flex items-center">
            Find & Rate
          </h1>
          <span className="text-purple-500 text-2xl">⭐</span>
        </div>
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-pink-600">Inicio</Link>
          <Link to="/registro" className="hover:text-pink-600">Registro</Link>
          <Link to="/login" className="hover:text-pink-600">Login</Link>
          <Link to="/conocenos" className="hover:text-pink-600">Conócenos</Link>
         
        </nav>
      </header>

      {/* Rutas */}
      <Routes>
        {/* Páginas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
        <Route path="/escribir-resena" element={<EscribirResena />} />

        {/* Categorías */}
        <Route path="/hoteles" element={<Hoteles />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/entretenimiento" element={<Entretenimiento />} />
        <Route path="/atracciones" element={<Atracciones />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Perfil */}
        <Route path="/profile" element={<Profile />} />

        {/* Formulario de lugares */}
        <Route path="/lugaresform" element={<LugaresForm />} />

        {/* Fallback para rutas no encontradas */}
        <Route path="*" element={<h1 className="text-center text-2xl mt-20">Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;