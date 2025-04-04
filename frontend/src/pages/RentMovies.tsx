import React, { useState } from "react";
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

  const defaultMovieImage =
    "https://via.placeholder.com/300x450?text=Película+Por+Defecto";

  return (
    <div className="my-5">
      <h1 className="text-center text-warning mb-4">🎥 Alquilar Películas</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6].map((movie) => (
              <div className="col-md-4" key={movie}>
                <div className="card bg-dark text-white shadow-lg">
                  <img
                    src={defaultMovieImage}
                    className="card-img-top"
                    alt={`Película ${movie}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Película {movie}</h5>
                    <p className="card-text">
                      Una breve descripción de la película {movie}.
                    </p>
                    <button className="btn btn-warning w-100">Alquilar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow-lg p-4">
            <h4 className="text-center mb-4">Formulario de Alquiler</h4>
            <div className="mb-3">
              <label htmlFor="inventoryId" className="form-label">
                ID del Inventario
              </label>
              <input
                type="text"
                id="inventoryId"
                className="form-control"
                value={inventoryId}
                onChange={(e) => setInventoryId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">
                ID del Cliente
              </label>
              <input
                type="text"
                id="customerId"
                className="form-control"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="staffId" className="form-label">
                ID del Empleado
              </label>
              <input
                type="text"
                id="staffId"
                className="form-control"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
              />
            </div>
            <button
              className="btn btn-warning w-100"
              onClick={handleRentMovie}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Alquilar"}
            </button>
          </div>
        </div>
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default RentMovies;
