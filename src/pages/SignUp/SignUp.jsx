import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.scss';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signedup, setSignedup] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSignedup(false);

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/users/signup`, {
                username,
                password,
            });
            setSignedup(true);
        } catch (error) {
            console.log('ERROR: Unable to signup', error);
            setError(error?.response?.data);
        }
    };

    return (
        <main className="signup">
            <div className="signup__container">
                <h1 className="signup__title">Recruiting Adventurers!</h1>
                <form className="signup__form" onSubmit={handleSubmit}>
                    <div className="signup__input-group">
                        <label htmlFor="username" className="signup__username-label">Username</label>
                        <input
                            className="signup__username"
                            name="username"
                            placeholder="Enter a username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="signup__input-group">
                        <label htmlFor="password" className="signup__password-label">Password</label>
                        <input
                            className="signup__password"
                            name="password"
                            placeholder="Enter a password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup__form-submit">Join the Roster</button>
                </form>
                {signedup && <div className="signup__success">Sign up successful, please log in</div>}
                {error && <div className="signup__error">{error}</div>}
            </div>
        </main>
    );
}
