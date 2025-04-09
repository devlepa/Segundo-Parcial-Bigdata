import React, { useState } from "react";
import Notification from "../components/Notification";
import Loader from "../components/Loader";

const ReturnMovie: React.FC = () => {
  const [inventoryId, setInventoryId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
        "http://ec2-34-239-124-130.compute-1.amazonaws.com:8000/return_movie/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventory_id: Number(inventoryId),
            customer_id: Number(customerId),
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
    <div className="text-center w-full">
      <h1 className="text-5xl font-bold text-yellow-400 mb-8">
        🎥 Devolver Películas
      </h1>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-purple-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Formulario de Devolución
          </h2>
          <div className="mb-4">
            <label htmlFor="inventoryId" className="block text-gray-200 mb-2">
              ID del Inventario
            </label>
            <input
              type="number"
              id="inventoryId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={inventoryId}
              onChange={(e) => setInventoryId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-gray-200 mb-2">
              ID del Cliente
            </label>
            <input
              type="number"
              id="customerId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleReturnMovie}
            disabled={loading}
          >
            {loading ? <Loader /> : "Devolver"}
          </button>
        </div>
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default ReturnMovie;
