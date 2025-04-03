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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Search Movies
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={filmTitle}
          onChange={(e) => setFilmTitle(e.target.value)}
          placeholder="Enter movie title..."
          className="p-3 border rounded-l-md w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 rounded-r-md hover:bg-green-700"
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.inventory_id}
            title={movie.title}
            image={`https://via.placeholder.com/300x450?text=${movie.title}`}
            details={`Store: ${movie.store_location}, Rented: ${
              movie.is_rented ? "Yes" : "No"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
