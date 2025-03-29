import React from 'react';

const Profile = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile!</p>
            <div>
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" />
            </div>
            <div>
                <label>Email: </label>
                <input type="email" placeholder="Enter your email" />
            </div>
            <button style={{ marginTop: '10px' }}>Update Profile</button>
        </div>
    );
};

export default Profile;