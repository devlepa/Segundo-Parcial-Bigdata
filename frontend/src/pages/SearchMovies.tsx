import React, { useState } from "react";
import { fetchFilmAvailability, FilmAvailability } from "../services/api";
import MovieCard from "../components/MovieCard";

const SearchMovies: React.FC = () => {
  const [filmTitle, setFilmTitle] = useState("");
  const [movies, setMovies] = useState<FilmAvailability[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchFilmAvailability(filmTitle);
      setMovies(data);
      setError("");
    } catch (err) {
      setError("No movies found or an error occurred.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Buscar Películas
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={filmTitle}
          onChange={(e) => setFilmTitle(e.target.value)}
          placeholder="Ingrese el título de la película..."
          className="p-3 border rounded-l-md w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 rounded-r-md hover:bg-green-700"
        >
          Buscar
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.inventory_id}
            className="p-4 bg-gray-700 rounded-lg shadow-lg"
          >
            <img
              src={`https://via.placeholder.com/300x450?text=${movie.title}`}
              alt={movie.title}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
            <p className="text-gray-400">Tienda: {movie.store_location}</p>
            <p className="text-gray-400">
              Alquilada: {movie.is_rented ? "Sí" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
