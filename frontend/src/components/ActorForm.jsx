import { useState } from 'react';
import axios from 'axios';

export default function ActorForm() {
  const [form, setForm] = useState({ first_name: '', last_name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/actors/', form);
      alert('Actor guardado con éxito');
      setForm({ first_name: '', last_name: '' });
    } catch (error) {
      alert('Error al guardar el actor');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Agregar Actor</h2>
      <input
        type="text"
        name="first_name"
        placeholder="Nombre"
        value={form.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Apellido"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
