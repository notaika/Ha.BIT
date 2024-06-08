import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  const location = useLocation();
  const blackText = location.pathname.includes('support') || location.pathname.includes('about') || location.pathname.includes('contact');

  return (
    <footer className="footer">
        <p className={`footer__copyright ${blackText ? 'footer__copyright-black' : ''}`}>© 2024 Ha.BIT - Made with love, <Link className={`footer__copyright-link ${blackText ? 'footer__copyright-link-black' : ''}`} to='https://github.com/notaika'>@aika</Link> </p>
    </footer>
  )
}
