import React, { useEffect, useState } from "react";
import { fetchActors, Actor } from "../services/api";

const Actors: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActors()
      .then((data) => setActors(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center flex flex-col items-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Lista de Actores
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors.map((actor) => (
          <div
            key={actor.actor_id}
            className="p-4 bg-gray-700 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-white">
              {actor.first_name} {actor.last_name}
            </h3>
            <p className="text-sm text-gray-400">
              Última Actualización:{" "}
              {new Date(actor.last_update).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actors;
