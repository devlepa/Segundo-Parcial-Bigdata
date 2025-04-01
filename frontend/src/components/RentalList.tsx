import React, { useEffect, useState } from 'react';

interface Rental {
    rental_id: number;
    rental_date: string;
    return_date: string | null;
    customer_id: number;
    inventory_id: number;
    staff_id: number;
}

const RentalList = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Llama al backend para obtener las rentas
        fetch('/api/rentals')
            .then((response) => response.json())
            .then((data) => {
                setRentals(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching rentals:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading rentals...</p>;
    }

    return (
        <div>
            <h2>Rental List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rental ID</th>
                        <th>Rental Date</th>
                        <th>Return Date</th>
                        <th>Customer ID</th>
                        <th>Inventory ID</th>
                        <th>Staff ID</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental) => (
                        <tr key={rental.rental_id}>
                            <td>{rental.rental_id}</td>
                            <td>{rental.rental_date}</td>
                            <td>{rental.return_date || 'Not Returned'}</td>
                            <td>{rental.customer_id}</td>
                            <td>{rental.inventory_id}</td>
                            <td>{rental.staff_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalList;