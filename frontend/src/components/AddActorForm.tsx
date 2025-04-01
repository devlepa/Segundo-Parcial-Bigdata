import React, { useState } from 'react';

const AddActorForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newActor = { first_name: firstName, last_name: lastName };

        try {
            const response = await fetch('http://ec2-13-218-151-147.compute-1.amazonaws.com:8000/actors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newActor),
            });

            if (!response.ok) {
                throw new Error('Error al crear actor');
            }

            setFirstName('');
            setLastName('');
            alert('Actor agregado correctamente');

        } catch (error) {
            console.error('Error al crear actor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Actor</h2>
            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Add Actor</button>
        </form>
    );
}

export default AddActorForm;
