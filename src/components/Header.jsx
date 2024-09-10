import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-container">
                    <img src="./assets/Featherlite_BW Logo_All BLK Font.png" alt="FeatherLite Logo" className="logo" />
                </div>
                <nav className="main-nav">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Find your new favorite"
                        className="search-bar"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;