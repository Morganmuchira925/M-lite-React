import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/login';
import SignUp from './components/SignUp';
import Chat from './components/chat';
import Profile from './components/profile';

const App = () => {
    // State to track the authenticated user
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Use the navigate function

    // Listen for changes in the authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser); // User is logged in
            } else {
                setUser(null); // User is logged out
            }
        });

        // Cleanup subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {/* Conditional Rendering Based on Authentication */}
            {!user ? (
                // If no user is logged in, show the Login or Sign-Up page
                <Routes>
                    <Route
                        path="/login"
                        element={<Login onSignUpClick={() => navigate('/signup')} />}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp onLoginClick={() => navigate('/login')} />}
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            ) : (
                // If a user is logged in, show the routes for Chat and Profile
                <Routes>
                    {/* Default route redirects to the Chat screen */}
                    <Route path="/" element={<Chat user={user} />} />

                    {/* Route for the Profile page */}
                    <Route path="/profile" element={<Profile user={user} />} />

                    {/* Redirect unknown routes to the Chat screen */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </div>
    );
};

export default App;