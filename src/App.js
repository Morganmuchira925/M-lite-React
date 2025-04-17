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
    const navigate = useNavigate(); // Navigation hook

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
        <div className="app-container">
            {/* Conditional Rendering Based on Authentication */}
            {!user ? (
                // Public Routes: Login and Sign-Up
                <Routes>
                    {/* Login Route */}
                    <Route
                        path="/login"
                        element={<Login onSignUpClick={() => navigate('/signup')} />}
                    />

                    {/* Sign-Up Route */}
                    <Route
                        path="/signup"
                        element={<SignUp onLoginClick={() => navigate('/login')} />}
                    />

                    {/* Redirect unknown routes to Login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            ) : (
                // Protected Routes: Chat and Profile
                <Routes>
                    {/* Default route redirects to the Chat screen */}
                    <Route path="/" element={<Chat user={user} />} />

                    {/* Profile Route */}
                    <Route path="/profile" element={<Profile user={user} />} />

                    {/* Redirect unknown routes to the Chat screen */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </div>
    );
};

export default App;