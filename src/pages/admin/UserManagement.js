import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from an API
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;