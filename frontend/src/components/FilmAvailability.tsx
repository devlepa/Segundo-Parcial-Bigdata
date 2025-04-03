import React, { useState } from 'react';
import { fetchFilmAvailability } from '../services/api';

const FilmAvailability: React.FC = () => {
    const [filmTitle, setFilmTitle] = useState('');
    const [availability, setAvailability] = useState([]);
    const [error, setError] = useState('');

    const handleCheckAvailability = async () => {
        try {
            const data = await fetchFilmAvailability(filmTitle);
            setAvailability(data);
            setError('');
        } catch (error) {
            setError('Film not found or error occurred');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">Check Film Availability</h1>
            <input
                type="text"
                value={filmTitle}
                onChange={(e) => setFilmTitle(e.target.value)}
                placeholder="Enter film title..."
                className="p-2 border rounded mb-4"
            />
            <button
                onClick={handleCheckAvailability}
                className="bg-red-600 text-white py-2 px-4 rounded mb-4"
            >
                Check Availability
            </button>
            {error && <div className="text-red-500">{error}</div>}
            {availability.length > 0 && (
                <div>
                    <h2 className="text-2xl mt-4 mb-2">Availability</h2>
                    {availability.map((item: any, index) => (
                        <div key={index} className="bg-gray-800 p-4 mb-2 rounded">
                            <p><strong>Title:</strong> {item.title}</p>
                            <p><strong>Store:</strong> {item.store_location}</p>
                            <p><strong>Rented:</strong> {item.is_rented ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilmAvailability;
