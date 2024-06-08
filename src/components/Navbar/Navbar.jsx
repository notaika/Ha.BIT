import React from 'react';
import { NavLink } from 'react-router-dom';
import coin from '../../assets/logos/coin.gif'
import './Navbar.scss'

export default function Navbar({ token, setToken }) {
  return (
    <div className="navbar">
        <NavLink to='/'><img src={coin} alt="Ha.BIT Logo - a coin" className="navbar__logo" /></NavLink>
        <div className="navbar__links">
            <NavLink to='/' className="navbar__links-item">Home</NavLink>
            <NavLink to='/' className="navbar__links-item">About</NavLink>
            <NavLink to='/' className="navbar__links-item">Contact</NavLink>
            <NavLink to='/' className="navbar__links-item">Support</NavLink>
            {token ? 
            (<>
            <NavLink to='/dashboard' className="navbar__links-item">Dashboard</NavLink>
            <NavLink to='/' className="navbar__links-item" onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}>Logout</NavLink>
            </>) : (
          <>
              <NavLink to="/login" className="navbar__links-item">Login</NavLink>
          </>
        )}
        </div>
    </div>
  )
}
