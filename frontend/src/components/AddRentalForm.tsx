import React, { useState } from 'react';

const AddRentalForm = () => {
    const [inventoryId, setInventoryId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [staffId, setStaffId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const rentalData = {
            inventory_id: parseInt(inventoryId),
            customer_id: parseInt(customerId),
            staff_id: parseInt(staffId),
        };

        try {
            const response = await fetch('http://ec2-44-203-144-79.compute-1.amazonaws.com:8000/api/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentalData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setInventoryId('');
                setCustomerId('');
                setStaffId('');
            } else {
                setMessage('Failed to create rental');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred');
        }
    };

    return (
        <div>
            <h2>Add Rental</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Inventory ID:</label>
                    <input
                        type="number"
                        value={inventoryId}
                        onChange={(e) => setInventoryId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Customer ID:</label>
                    <input
                        type="number"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Staff ID:</label>
                    <input
                        type="number"
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Rental</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRentalForm;