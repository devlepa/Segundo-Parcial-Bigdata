import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-red-600">Netflix Clone</h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>
        <Link to="/actors" className="hover:text-red-500">
          Actors
        </Link>
        <Link to="/film-availability" className="hover:text-red-500">
          Availability
        </Link>
        <Link to="/search-movies" className="hover:text-red-500">
          Search Movies
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
