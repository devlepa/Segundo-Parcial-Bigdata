import React, { useState } from 'react';

const AddActorForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const actor = { first_name: firstName, last_name: lastName };

        try {
            const response = await fetch("http://ec2-13-218-151-147.compute-1.amazonaws.com:8000/actors", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actor)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            alert("Actor added successfully!");
            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error("Error adding actor:", error);
        }
    };

    return (
        <div>
            <h2>Add New Actor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Actor</button>
            </form>
        </div>
    );
};

export default AddActorForm;
