import React from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle = {
    color: '#33373a',
    transition: 'color 0.3s ease'
};

const navLinkHoverStyle = {
    color: '#565c61'  // Lighter version of the original color
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
                            <i className="bi bi-cart fs-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}