const API_BASE_URL = "http://ec2-44-203-144-79.compute-1.amazonaws.com:8000";

export const fetchFilmAvailability = async (filmTitle: string) => {
    const response = await fetch(`${API_BASE_URL}/check_availability/${filmTitle}`);
    if (!response.ok) throw new Error("Failed to fetch film availability");
    return await response.json();
};
