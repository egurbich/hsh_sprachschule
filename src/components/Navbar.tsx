import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCartItems } from '../utils/db';

/*
    File: components/Navbar.tsx
    Purpose: Site navigation bar with links and a shopping cart badge.
    How: Loads cart items count from IndexedDB, listens to 'cart:updated' events
             to keep the badge in sync, and positions the cart icon at the top-right.
    Props: none
    Hooks: useState, useEffect
    External: react-router-dom Link; utils/db getCartItems
*/

export default function Navbar() {
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const load = async () => {
            try {
                const items = await getCartItems();
                setCartCount(items.length);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Failed to load cart count', e);
            }
        };
        load();
        const handler = () => load();
        window.addEventListener('cart:updated', handler);
        return () => window.removeEventListener('cart:updated', handler);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <Link to="/cart" className="cart-icon position-relative ms-auto order-lg-2">
                    <i className="bi bi-cart fs-3"></i>
                    {cartCount > 0 && (
                        <span 
                          className="position-absolute translate-middle badge rounded-pill bg-danger cart-badge"
                          style={{ top: 10, left: '100%' }}
                          aria-label={`Cart has ${cartCount} item${cartCount===1?'':'s'}`}
                        >
                          {cartCount}
                        </span>
                    )}
                </Link>
                
                <div className="collapse navbar-collapse order-lg-1" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center flex-grow-1">
                        <li className="nav-item mx-3">
                            <Link to="/" className="nav-link fw-bold nav-link-custom">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/courses" className="nav-link fw-bold nav-link-custom">Courses</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/prices" className="nav-link fw-bold nav-link-custom">Pricelist</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/add-course" className="nav-link fw-bold nav-link-custom">Add Course</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}