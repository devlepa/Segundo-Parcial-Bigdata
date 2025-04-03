import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Alquiler de Películas Blockbuster
        </h1>
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-yellow-400">
            Home
          </Link>
          <Link to="/actors" className="text-white hover:text-yellow-400">
            Actores
          </Link>
          <Link
            to="/film-availability"
            className="text-white hover:text-yellow-400"
          >
            Disponibilidad
          </Link>
          <Link
            to="/search-movies"
            className="text-white hover:text-yellow-400"
          >
            Buscar Películas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
