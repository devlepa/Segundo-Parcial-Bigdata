import React, { useState } from "react";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

const RentMovies: React.FC = () => {
  const [inventoryId, setInventoryId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleRentMovie = async () => {
    setLoading(true);
    setNotification(null);

    if (!inventoryId || !customerId || !staffId) {
      setNotification({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/rent_movie/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventory_id: parseInt(inventoryId, 10),
          customer_id: parseInt(customerId, 10),
          staff_id: parseInt(staffId, 10),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error: ${response.status}`);
      }

      const data = await response.json();
      setNotification({ message: data.message, type: "success" });
    } catch (error: any) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleReturnMovie = async () => {
    setLoading(true);
    setNotification(null);

    if (!inventoryId || !customerId) {
      setNotification({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-54-197-103-116.compute-1.amazonaws.com:8000/return_movie/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventory_id: parseInt(inventoryId, 10),
            customer_id: parseInt(customerId, 10),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error: ${response.status}`);
      }

      const data = await response.json();
      setNotification({ message: data.message, type: "success" });
    } catch (error: any) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🎥 Alquilar Películas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((movie) => (
            <MovieCard
              key={movie}
              title={`Película ${movie}`}
              description={`Una breve descripción de la película ${movie}.`}
              image="https://via.placeholder.com/300x450?text=Película+Por+Defecto"
            />
          ))}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Formulario de Alquiler
          </h2>
          <div className="mb-4">
            <label htmlFor="inventoryId" className="block text-gray-600 mb-2">
              ID del Inventario
            </label>
            <input
              type="text"
              id="inventoryId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={inventoryId}
              onChange={(e) => setInventoryId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-gray-600 mb-2">
              ID del Cliente
            </label>
            <input
              type="text"
              id="customerId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="staffId" className="block text-gray-600 mb-2">
              ID del Empleado
            </label>
            <input
              type="text"
              id="staffId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleRentMovie}
            disabled={loading}
          >
            {loading ? <Loader /> : "Alquilar"}
          </button>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-2"
            onClick={handleReturnMovie}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Devolver"}
          </button>
        </div>
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default RentMovies;
