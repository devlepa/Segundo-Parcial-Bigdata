import React, { useState } from "react";
import Notification from "../components/Notification";
import Loader from "../components/Loader";

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
      const response = await fetch(
        "http://ec2-44-211-131-205.compute-1.amazonaws.com:8000/rent_movie/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventory_id: parseInt(inventoryId, 10),
            customer_id: parseInt(customerId, 10),
            staff_id: parseInt(staffId, 10),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error: ${response.status}`);
      }

      const data = await response.json();
      setNotification({
        message: "Película alquilada exitosamente",
        type: "success",
      });
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
        "http://ec2-44-211-131-205.compute-1.amazonaws.com:8000/return_movie/",
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
      setNotification({
        message: "Película devuelta exitosamente",
        type: "success",
      });
    } catch (error: any) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-teal-400 mb-6">
        🎥 Alquilar Películas
      </h1>
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://image.tmdb.org/t/p/w300/6KErczPBROQty7QoIsaa6wJYXZi.jpg"
          alt="Película"
          className="rounded-lg shadow-lg w-64"
        />
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Formulario de Alquiler
          </h2>
          <div className="mb-4">
            <label htmlFor="inventoryId" className="block text-gray-300 mb-2">
              ID del Inventario
            </label>
            <input
              type="text"
              id="inventoryId"
              className="w-full border border-gray-500 rounded-lg px-4 py-2"
              value={inventoryId}
              onChange={(e) => setInventoryId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-gray-300 mb-2">
              ID del Cliente
            </label>
            <input
              type="text"
              id="customerId"
              className="w-full border border-gray-500 rounded-lg px-4 py-2"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="staffId" className="block text-gray-300 mb-2">
              ID del Empleado
            </label>
            <input
              type="text"
              id="staffId"
              className="w-full border border-gray-500 rounded-lg px-4 py-2"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            onClick={handleRentMovie}
            disabled={loading}
          >
            {loading ? <Loader /> : "Alquilar"}
          </button>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mt-4"
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
