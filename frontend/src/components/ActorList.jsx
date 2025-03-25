import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActorList() {
  const [actors, setActors] = useState([]);

  const fetchActors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/actors/');
      setActors(response.data);
    } catch (error) {
      console.error('Error al cargar actores:', error);
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    <div>
      <h2>Lista de Actores</h2>
      <ul>
        {actors.map(actor => (
          <li key={actor.actor_id}>{actor.first_name} {actor.last_name}</li>
        ))}
      </ul>
    </div>
  );
}
