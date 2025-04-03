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

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">Actors List</h1>
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor: any) => (
                        <tr key={actor.actor_id}>
                            <td>{actor.actor_id}</td>
                            <td>{actor.first_name}</td>
                            <td>{actor.last_name}</td>
                            <td>{actor.last_update}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Actors;
