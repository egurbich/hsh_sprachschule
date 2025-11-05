import React from 'react';
import { Link } from 'react-router-dom';

const navLinkColor = '#e7eaed';
const navLinkHover = '#d0d2d5';

function attachHover(targetStyle: React.CSSProperties) {
  // helper returns props for element to attach inline hover handlers
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = (navLinkHover as any)),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = (navLinkColor as any)),
    style: { ...targetStyle, color: navLinkColor, transition: 'color 0.15s ease' } as React.CSSProperties,
  };
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#6c96a4ff', padding: '0.75rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <Link to="/" {...attachHover({ textDecoration: 'none' })}>Home</Link>
          <Link to="/courses" {...attachHover({ textDecoration: 'none' })}>Courses</Link>
          <Link to="/prices" {...attachHover({ textDecoration: 'none' })}>Pricelist</Link>
          <Link to="/cart" {...attachHover({ textDecoration: 'none' })}>Cart</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <a href="/about" {...attachHover({ textDecoration: 'none' })}>About Us</a>
          <a href="/datenschutz" {...attachHover({ textDecoration: 'none' })}>Datenschutz</a>
          <a href="/impressum" {...attachHover({ textDecoration: 'none' })}>Impressum</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" {...attachHover({ textDecoration: 'none' })}>FB</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" {...attachHover({ textDecoration: 'none' })}>Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" {...attachHover({ textDecoration: 'none' })}>TikTok</a>
        </div>
      </div>
    </footer>
  );
}
