import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

export default function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/users/login`, {
                username,
                password
            })
            const { token } = data;
            localStorage.setItem("token", token);
            setToken(token);
            navigate("/dashboard");
        } catch (error) {
            console.log(`ERROR: Could not login`, error)
            setError(error?.response?.data || "ERROR: Credentials did not match");
        }
    }

  return (
    <main className="login">
      <div className="login__container">
        <h1 className="login__title">Welcome back!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-group">
            <label htmlFor="username" className="login__username-label">
              Username
            </label>
            <input
              className="login__username"
              name="username"
              placeholder="Enter a username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login__input-group">
            <label htmlFor="password" className="login__password-label">
              Password
            </label>
            <input
              className="login__password"
              name="password"
              placeholder="Enter a password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login__form-submit">
            Start Exploring
          </button>
          {error && <div className="login__error">{error}</div>}
        </form>
      </div>
    </main>
  );
}
