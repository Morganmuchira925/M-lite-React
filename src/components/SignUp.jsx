import React, { useState } from 'react';
import supabase from '../supabase'; // Import Supabase client
import '../styles.css'; // Import the CSS file

const SignUp = ({ onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle email/password sign-up using Supabase
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error("Sign-up error:", error.message);
            } else {
                console.log("User signed up successfully!", data);
            }
        } catch (error) {
            console.error("Unexpected error during sign-up:", error.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>

            {/* Email/Password Sign-Up Form */}
            <form onSubmit={handleSignUp}>
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
                <button type="submit">Sign Up</button>
            </form>

            {/* Link to Login Page */}
            <p>
                Already have an account?{' '}
                <button onClick={onLoginClick}>Login</button>
            </p>
        </div>
    );
};

export default SignUp;