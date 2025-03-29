import React from 'react';

const OrderHistory = () => {
    const orders = [
        { id: 1, date: '2023-10-01', total: 100.00 },
        { id: 2, date: '2023-10-05', total: 50.00 },
        { id: 3, date: '2023-10-10', total: 75.00 },
    ];

    return (
        <div>
            <h1>Order History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>${order.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;