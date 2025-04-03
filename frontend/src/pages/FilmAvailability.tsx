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
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Disponibilidad de Películas
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
          onClick={handleCheckAvailability}
          className="bg-blue-600 text-white px-6 rounded-r-md hover:bg-blue-700"
        >
          Verificar
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availability.map((item: any, index) => (
          <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-lg">
            <p className="text-white font-bold">{item.title}</p>
            <p className="text-gray-400">Tienda: {item.store_location}</p>
            <p className="text-gray-400">
              Alquilada: {item.is_rented ? "Sí" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmAvailability;
