import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import '../styles.css'; // Import the CSS file

const SignUp = ({ onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle email/password sign-up
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully!");
        } catch (error) {
            console.error("Sign-up error:", error.message);
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