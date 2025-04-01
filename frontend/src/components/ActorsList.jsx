import React, { useEffect, useState } from "react";
import axios from "axios";

interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  last_update: string;
}

const ActorsList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActors = async () => {
    try {
      const response = await axios.get("http://YOUR-EC2-IP:8000/actors");
      setActors(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar los actores");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Actores Registrados</h2>
      <ul>
        {actors.map((actor) => (
          <li key={actor.actor_id} className="mb-2">
            {actor.first_name} {actor.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorsList;
