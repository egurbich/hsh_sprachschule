import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/courses" className="footer-link">Courses</Link>
          <Link to="/prices" className="footer-link">Pricelist</Link>
          <Link to="/cart" className="footer-link">Cart</Link>
        </div>

        <div className="footer-column">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/datenschutz" className="footer-link">Datenschutz</a>
          <a href="/impressum" className="footer-link">Impressum</a>
        </div>

        <div className="footer-column">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-link">FB</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-link">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
