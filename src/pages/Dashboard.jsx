import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center space-y-6">
        {/* 🎉 Bienvenida */}
        <h1 className="text-4xl font-extrabold text-pink-600 mb-2">¡Bienvenido 🎉!</h1>
        {user ? (
          <>
            <p className="text-lg text-gray-700">
              Hola <span className="font-semibold">{user.nombre_usuario}</span> 👋
            </p>
            <p className="text-sm text-gray-500">{user.correo_usuario}</p>
          </>
        ) : (
          <p className="text-gray-600">No hay usuario logueado.</p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Ingresar lugares */}
          <button
            onClick={() => navigate("/LugaresForm")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold rounded-2xl hover:opacity-90 transition"
          >
            <FaPlus /> Ingresar Lugares
          </button>

          {/* Ir a perfil */}
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-2xl hover:opacity-90 transition"
          >
            <FaUser /> Mi Perfil
          </Link>

          {/* Cerrar sesión */}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold rounded-2xl hover:opacity-90 transition"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;