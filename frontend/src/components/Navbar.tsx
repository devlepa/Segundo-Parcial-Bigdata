import React from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaSearch, FaUsers, FaShoppingCart } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-warning">
          🎥 Blockbuster
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/actors" className="nav-link">
                <FaUsers className="me-2" /> Actores
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/film-availability" className="nav-link">
                <FaFilm className="me-2" /> Disponibilidad
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search-movies" className="nav-link">
                <FaSearch className="me-2" /> Buscar Películas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rent-movies" className="nav-link">
                <FaShoppingCart className="me-2" /> Alquilar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
