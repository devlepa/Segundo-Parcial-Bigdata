import React from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaSearch, FaUsers, FaShoppingCart } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 p-4 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-teal-300 tracking-wide">
          🎥 Blockbuster
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/actors"
            className="flex items-center text-white text-lg font-medium hover:text-teal-300 transition duration-300"
          >
            <FaUsers className="mr-2" /> Actores
          </Link>
          <Link
            to="/film-availability"
            className="flex items-center text-white text-lg font-medium hover:text-teal-300 transition duration-300"
          >
            <FaFilm className="mr-2" /> Disponibilidad
          </Link>
          <Link
            to="/search-movies"
            className="flex items-center text-white text-lg font-medium hover:text-teal-300 transition duration-300"
          >
            <FaSearch className="mr-2" /> Buscar Películas
          </Link>
          <Link
            to="/rent-movies"
            className="flex items-center text-white text-lg font-medium hover:text-teal-300 transition duration-300"
          >
            <FaShoppingCart className="mr-2" /> Alquilar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
