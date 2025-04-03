import React, { useEffect, useState } from 'react';
import { fetchActors } from '../services/api';

const Actors: React.FC = () => {
    const [actors, setActors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchActors()
            .then(data => setActors(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 text-white">
            <h1 className="text-3xl mb-4">Actors List</h1>
            <div className="grid grid-cols-4 gap-4">
                {actors.map((actor: any) => (
                    <div key={actor.actor_id} className="p-4 bg-gray-800 rounded shadow">
                        <h3 className="text-xl">{actor.first_name} {actor.last_name}</h3>
                        <p className="text-sm text-gray-400">Last Update: {actor.last_update}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Actors;
