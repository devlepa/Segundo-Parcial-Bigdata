import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFilm, FaSearch, FaUsers } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide">
          🎥 Blockbuster
        </h1>
        <nav className="flex space-x-8">
          <Link
            to="/"
            className="flex items-center text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/actors"
            className="flex items-center text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            <FaUsers className="mr-2" /> Actores
          </Link>
          <Link
            to="/film-availability"
            className="flex items-center text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            <FaFilm className="mr-2" /> Disponibilidad
          </Link>
          <Link
            to="/search-movies"
            className="flex items-center text-white text-lg font-medium hover:text-yellow-400 transition duration-300"
          >
            <FaSearch className="mr-2" /> Buscar Películas
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
