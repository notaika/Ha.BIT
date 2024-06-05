import React from 'react';
import { NavLink } from 'react-router-dom';
import coin from '../../assets/logos/coin.gif'
import './Navbar.scss'

export default function Navbar() {
  return (
    <div className="navbar">
        <NavLink to='/'><img src={coin} alt="Ha.BIT Logo - a coin" className="navbar__logo" /></NavLink>
        <div className="navbar__links">
            <NavLink to='/' className="navbar__links-item">Home</NavLink>
            <NavLink to='/' className="navbar__links-item">About</NavLink>
            <NavLink to='/' className="navbar__links-item">Contact</NavLink>
            <NavLink to='/' className="navbar__links-item">Support</NavLink>
            <NavLink to='/' className="navbar__links-item">Account</NavLink>
        </div>
    </div>
  )
}
