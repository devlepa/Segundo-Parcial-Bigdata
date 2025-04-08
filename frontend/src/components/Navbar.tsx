import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-red-600 text-2xl font-bold">
          NetflixClone
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/rent-movies"
              className="text-white hover:text-red-600 transition duration-300"
            >
              Alquilar
            </Link>
          </li>
          <li>
            <Link
              to="/film-availability"
              className="text-white hover:text-red-600 transition duration-300"
            >
              Disponibilidad
            </Link>
          </li>
          <li>
            <Link
              to="/search-movies"
              className="text-white hover:text-red-600 transition duration-300"
            >
              Buscar
            </Link>
          </li>
          <li>
            <Link
              to="/actors"
              className="text-white hover:text-red-600 transition duration-300"
            >
              Actores
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
