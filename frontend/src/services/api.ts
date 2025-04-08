import axios from "axios";

const API_BASE_URL = "http://ec2-18-234-101-246.compute-1.amazonaws.com:8000"; // Updated Backend URL

export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  last_update: string;
}

export interface FilmAvailability {
  film_id: number;
  title: string;
  inventory_id: number;
  store_id: number;
  store_location: string;
  is_rented: boolean;
}

// Función que obtiene la lista de actores
export const fetchActors = async (): Promise<Actor[]> => {
  const response = await axios.get(`${API_BASE_URL}/actors/`);
  return response.data;
};

// Función que verifica la disponibilidad de una película
export const fetchFilmAvailability = async (
  filmTitle: string
): Promise<FilmAvailability[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/check_availability/${filmTitle}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching film availability");
  }
};
