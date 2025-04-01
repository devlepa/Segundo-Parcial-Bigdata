import React, { useState } from "react";
import axios from "axios";

const AddActorForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://YOUR-EC2-IP:8000/actors", {
        first_name: firstName,
        last_name: lastName,
      });
      setFirstName("");
      setLastName("");
      alert("¡Actor agregado exitosamente!");
    } catch (error) {
      alert("Error al agregar el actor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="mb-3">
        <label>Nombre:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-1"
        />
      </div>
      <div className="mb-3">
        <label>Apellido:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-3 py-1">
        Agregar Actor
      </button>
    </form>
  );
};

export default AddActorForm;
