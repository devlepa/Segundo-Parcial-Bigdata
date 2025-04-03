import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide">
          Alquiler de Películas Blockbuster
        </h1>
        <nav className="flex space-x-8">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/actors"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Actores
          </Link>
          <Link
            to="/film-availability"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Disponibilidad
          </Link>
          <Link
            to="/search-movies"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            Buscar Películas
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
