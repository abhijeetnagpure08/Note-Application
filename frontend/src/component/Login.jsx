import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      email,
      pass,
    };
    fetch("http://localhost:4500/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        if (res.token) {
          navigate("/notes");
        }
      });
    setEmail("");
    setPass("");
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <h3>Login Form</h3>
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
      <button onClick={handleSubmit}>Log In!</button>
      <p>Don't have an account?</p>
      <button onClick={handleSignupRedirect}>Register</button>
    </div>
  );
};
