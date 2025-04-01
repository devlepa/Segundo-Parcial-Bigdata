import React, { useState } from 'react';

const AddActorForm = ({ onRefresh }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const actor = { first_name: firstName, last_name: lastName };

        try {
            const response = await fetch("http://ec2-3-91-179-100.compute-1.amazonaws.com:8000/actors", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actor),
            });

            if (!response.ok) {
                throw new Error("Failed to create actor");
            }

            setFirstName('');
            setLastName('');
            onRefresh();  // Refresh the actors list after adding a new actor
        } catch (error) {
            console.error("Error creating actor:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />

            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />

            <button type="submit">Add Actor</button>
        </form>
    );
};

export default AddActorForm;
