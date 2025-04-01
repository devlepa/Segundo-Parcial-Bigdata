import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const App = () => {
  const [actors, setActors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  // Ruta de tu backend FastAPI en la instancia EC2
  const BACKEND_URL = "http://<TU_IP_PUBLICA_EC2>:8000/actors"; 

  // Obtener la lista de actores (GET)
  const fetchActors = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      setActors(response.data);
    } catch (error) {
      console.error("Error al obtener actores:", error);
    }
  };

  // Crear un nuevo actor (POST)
  const createActor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(BACKEND_URL, {
        first_name: firstName,
        last_name: lastName,
      });
      setActors([...actors, response.data]);
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error al crear actor:", error);
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    <div className="container">
      <h1>🎬 Actores 🎬</h1>

      <form onSubmit={createActor}>
        <input
          type="text"
          value={firstName}
          placeholder="Nombre"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Apellido"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Crear Actor</button>
      </form>

      <ul>
        {actors.map((actor: any) => (
          <li key={actor.actor_id}>
            {actor.first_name} {actor.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
