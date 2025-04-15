import React, { useState } from 'react';
import supabase from '../supabase'; // Import as default

const Profile = ({ user }) => {
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const { data, error } = await supabase.storage
            .from('profile-pictures')
            .upload(`${user.uid}.jpg`, file);

        if (error) {
            console.error("Error uploading profile picture:", error.message);
        } else {
            console.log("Profile picture uploaded:", data);
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
            <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
    );
};

export default Profile;