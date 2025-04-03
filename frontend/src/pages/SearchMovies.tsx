import React, { useState } from "react";
import { fetchFilmAvailability, FilmAvailability } from "../services/api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Notification from "../components/Notification";

const SearchMovies: React.FC = () => {
  const [filmTitle, setFilmTitle] = useState("");
  const [movies, setMovies] = useState<FilmAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchFilmAvailability(filmTitle);
      setMovies(data);
      setError("");
    } catch (err) {
      setError("No movies found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-8">
          Buscar Películas
        </h1>
        <div className="flex flex-col sm:flex-row justify-center mb-8 w-full">
          <input
            type="text"
            value={filmTitle}
            onChange={(e) => setFilmTitle(e.target.value)}
            placeholder="Ingrese el título de la película..."
            className="p-3 border rounded-md w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Buscar
          </button>
        </div>
        {loading && <Loader />}
        {error && <Notification message={error} type="error" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {movies.map((movie) => (
            <div
              key={movie.inventory_id}
              className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={`https://via.placeholder.com/300x450?text=${movie.title}`}
                alt={movie.title}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h3 className="text-xl font-bold text-teal-400">{movie.title}</h3>
              <p className="text-gray-400">Tienda: {movie.store_location}</p>
              <p className="text-gray-400">
                Alquilada: {movie.is_rented ? "Sí" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchMovies;
