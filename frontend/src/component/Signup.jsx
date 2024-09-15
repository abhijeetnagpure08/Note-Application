import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Import the CSS file

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = () => {
        const payload = { name, email, pass };

        fetch("http://localhost:4500/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((res) => console.log(res));

        setName("");
        setEmail("");
        setPass("");
        navigate("/login")
    };

    const handleLoginRedirect = () => {
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div className="container">
            <h3>Registration Form</h3>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass">Password</label>
            <input
                type="password"
                name="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <button onClick={handleSubmit}>Sign Up!</button>
            <p>Already have an account?</p>
            <button onClick={handleLoginRedirect}>Login</button> {/* New Login button */}
        </div>
    );
};
