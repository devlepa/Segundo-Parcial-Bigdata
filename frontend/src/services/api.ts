import axios from 'axios';

const API_BASE_URL = "http://ec2-3-82-194-178.compute-1.amazonaws.com:8000";

// Función que obtiene la lista de actores
export const fetchActors = async () => {
    const response = await axios.get(`${API_BASE_URL}/actors/`);
    return response.data;
};

// Función que verifica la disponibilidad de una película
export const fetchFilmAvailability = async (filmTitle: string) => {
    const response = await axios.get(`${API_BASE_URL}/check_availability/${filmTitle}`);
    return response.data;
};
