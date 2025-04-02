// src/services/api.ts
const API_BASE_URL = "http://ec2-44-203-144-79.compute-1.amazonaws.com:8000"; // URL de tu backend

export const fetchActors = async () => {
    const response = await fetch(`${API_BASE_URL}/actors/`);
    if (!response.ok) throw new Error("Failed to fetch actors");
    return await response.json();
};

export const fetchFilmAvailability = async (filmTitle: string) => {
    const response = await fetch(`${API_BASE_URL}/check_availability/${filmTitle}`);
    if (!response.ok) throw new Error("Failed to fetch film availability");
    return await response.json();
};
