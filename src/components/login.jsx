import React, { useState } from 'react';
import {
    auth,
    GoogleAuthProvider,
    signInWithPopup,
} from '../firebase';
import supabase from '../supabase'; // Import Supabase client
import '../styles.css'; // Import the CSS file

const Login = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle email/password login using Supabase
    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Login error:", error.message);
            } else {
                console.log("User logged in successfully!", data);
            }
        } catch (error) {
            console.error("Unexpected error during login:", error.message);
        }
    };

    // Handle Google login using Firebase
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            console.log("User logged in with Google!");
        } catch (error) {
            console.error("Google login error:", error.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>

            {/* Email/Password Login Form */}
            <form onSubmit={handleEmailPasswordLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {/* Link to Sign-Up Page */}
            <p>
                Don't have an account?{' '}
                <button onClick={onSignUpClick}>Sign Up</button>
            </p>

            {/* Google Login Button */}
            <button className="google" onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;