import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCartItems } from '../utils/db';

const navLinkStyle = {
    color: '#e7eaed',
    transition: 'color 0.15s ease'
};

const navLinkHoverStyle = {
    color: '#d0d2d5'  // Hover color requested
};

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
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#6c96a4ff' }}>
            <div className="container-fluid">
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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center flex-grow-1">
                        <li className="nav-item mx-3">
                            <Link 
                                to="/" 
                                className="nav-link fw-bold" 
                                style={navLinkStyle}
                                onMouseEnter={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                                onMouseLeave={(e) => e.currentTarget.style.color = navLinkStyle.color}
                            >Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link 
                                to="/courses" 
                                className="nav-link fw-bold" 
                                style={navLinkStyle}
                                onMouseEnter={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                                onMouseLeave={(e) => e.currentTarget.style.color = navLinkStyle.color}
                            >Courses</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link 
                                to="/prices" 
                                className="nav-link fw-bold" 
                                style={navLinkStyle}
                                onMouseEnter={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                                onMouseLeave={(e) => e.currentTarget.style.color = navLinkStyle.color}
                            >Pricelist</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <Link 
                            to="/cart"
                            className="text-decoration-none text-reset position-relative"
                            style={{ ...navLinkStyle, display: 'inline-block' }}
                            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = navLinkHoverStyle.color}
                            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = navLinkStyle.color}
                        >
                            <i className="bi bi-cart fs-3"></i>
                            {cartCount > 0 && (
                                <span 
                                  className="position-absolute translate-middle badge rounded-pill bg-danger"
                                  style={{ top: 0, left: '100%', fontSize: '0.65rem' }}
                                  aria-label={`Cart has ${cartCount} item${cartCount===1?'':'s'}`}
                                >
                                  {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}