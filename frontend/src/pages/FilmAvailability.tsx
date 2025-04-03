import React, { useState } from "react";
import { fetchFilmAvailability } from "../services/api";

const FilmAvailability: React.FC = () => {
  const [filmTitle, setFilmTitle] = useState("");
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState("");

  const handleCheckAvailability = async () => {
    try {
      const data = await fetchFilmAvailability(filmTitle);
      setAvailability(data);
      setError("");
    } catch (error) {
      setError("Film not found or error occurred");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Check Film Availability
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={filmTitle}
          onChange={(e) => setFilmTitle(e.target.value)}
          placeholder="Enter film title..."
          className="p-3 border rounded-l-md w-1/2"
        />
        <button
          onClick={handleCheckAvailability}
          className="bg-blue-600 text-white px-6 rounded-r-md hover:bg-blue-700"
        >
          Check
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availability.map((item: any, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 rounded-lg shadow-lg text-center"
          >
            <p className="text-white font-bold">{item.title}</p>
            <p className="text-gray-400">Store: {item.store_location}</p>
            <p className="text-gray-400">
              Rented: {item.is_rented ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmAvailability;
