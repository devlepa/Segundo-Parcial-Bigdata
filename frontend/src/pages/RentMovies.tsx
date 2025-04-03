import React, { useState } from "react";
import Layout from "../components/Layout";
import Notification from "../components/Notification";

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

    // Validar que los campos no estén vacíos
    if (!inventoryId || !customerId || !staffId) {
      setNotification({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      console.log("Enviando datos al backend:", {
        inventory_id: parseInt(inventoryId, 10),
        customer_id: parseInt(customerId, 10),
        staff_id: parseInt(staffId, 10),
      });

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
        console.error("Error en la respuesta del backend:", errorData);
        throw new Error(errorData.detail || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);
      setNotification({ message: data.message, type: "success" });
    } catch (error: any) {
      console.error("Error al realizar la solicitud:", error.message);
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full p-6 bg-gray-900 rounded-lg shadow-lg text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-8">
          Alquilar Películas
        </h1>
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <input
            type="text"
            value={inventoryId}
            onChange={(e) => setInventoryId(e.target.value)}
            placeholder="ID del Inventario"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="ID del Cliente"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="ID del Empleado"
            className="p-3 border rounded-md w-full"
          />
          <button
            onClick={handleRentMovie}
            className={`bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Alquilar"}
          </button>
        </div>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </Layout>
  );
};

export default RentMovies;
