import React, { useEffect, useState } from 'react';

const ActorsList = ({ onRefresh }) => {
    const [actors, setActors] = useState([]);

    const fetchActors = async () => {
        try {
            const response = await fetch("http://ec2-13-218-151-147.compute-1.amazonaws.com:8000/actors");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setActors(data);
        } catch (error) {
            console.error("Error fetching actors:", error);
        }
    };

    useEffect(() => {
        fetchActors();
    }, [onRefresh]);

    return (
        <div>
            <button onClick={fetchActors} className="refresh-btn">Refresh</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map(actor => (
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

export default ActorsList;
