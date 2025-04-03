const API_BASE_URL = "http://ec2-3-82-194-178.compute-1.amazonaws.com:8000";

// Función que debe existir para que el frontend pueda consumir la lista de actores.
export const fetchActors = async () => {
    const response = await fetch(`${API_BASE_URL}/actors/`);
    if (!response.ok) {
        throw new Error("Failed to fetch actors");
    }
    return await response.json();
};

// Mantén esto si lo estás usando también
export const fetchFilmAvailability = async (filmTitle: string) => {
    const response = await fetch(`${API_BASE_URL}/check_availability/${filmTitle}`);
    if (!response.ok) throw new Error("Failed to fetch film availability");
    return await response.json();
};
