import React from 'react';
import { Link } from 'react-router-dom';
import coin from '../../assets/logos/coin.gif'
import './Navbar.scss'

export default function Navbar() {
  return (
    <div className="navbar">
        <Link to='/'><img src={coin} alt="Ha.BIT Logo - a coin" className="navbar__logo" /></Link>
        <div className="navbar__links">
            <Link to='/' className="navbar__links-item">Home</Link>
            <Link to='/' className="navbar__links-item">About</Link>
            <Link to='/' className="navbar__links-item">Contact</Link>
            <Link to='/' className="navbar__links-item">Support</Link>
        </div>
    </div>
  )
}
