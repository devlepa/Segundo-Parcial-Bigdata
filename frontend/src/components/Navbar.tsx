import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#36C9C6] shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-[#ED6A5A] text-2xl font-bold">
          MyMovies
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/rent-movies"
              className="text-[#363636] hover:text-[#ED6A5A] transition duration-300"
            >
              Alquilar
            </Link>
          </li>
          <li>
            <Link
              to="/film-availability"
              className="text-[#363636] hover:text-[#ED6A5A] transition duration-300"
            >
              Disponibilidad
            </Link>
          </li>
          <li>
            <Link
              to="/search-movies"
              className="text-[#363636] hover:text-[#ED6A5A] transition duration-300"
            >
              Buscar
            </Link>
          </li>
          <li>
            <Link
              to="/actors"
              className="text-[#363636] hover:text-[#ED6A5A] transition duration-300"
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
