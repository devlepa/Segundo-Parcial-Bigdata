import React from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaSearch, FaUsers, FaShoppingCart } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://via.placeholder.com/50x50?text=B"
            alt="Blockbuster Logo"
            className="me-2"
            style={{ borderRadius: "50%" }}
          />
          <span className="fw-bold text-primary fs-4">Blockbuster</span>
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
              <Link to="/actors" className="nav-link text-dark">
                <FaUsers className="me-2" /> Actores
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/film-availability" className="nav-link text-dark">
                <FaFilm className="me-2" /> Disponibilidad
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search-movies" className="nav-link text-dark">
                <FaSearch className="me-2" /> Buscar Películas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rent-movies" className="nav-link text-dark">
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
