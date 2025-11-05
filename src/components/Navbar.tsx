import React from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle = {
    color: '#e7eaed',
    transition: 'color 0.15s ease'
};

const navLinkHoverStyle = {
    color: '#d0d2d5'  // Hover color requested
};

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#6c96a4ff' }}>
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
                    <div className="d-flex">
                        <button 
                            className="btn"
                            style={navLinkStyle}
                            onMouseEnter={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                            onMouseLeave={(e) => e.currentTarget.style.color = navLinkStyle.color}
                        >
                            <Link 
                                to="/cart" 
                                className="text-decoration-none text-reset"
                                ><i className="bi bi-cart fs-3"></i></Link>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}