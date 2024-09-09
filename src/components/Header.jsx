import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <div className="logo-container">
                {/* Left-aligned logo */}
                <img src="./assets/Featherlite_BW Logo_All BLK Font.png" alt="FeatherLite Logo" className="logo" />
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="search-bar-container">
                {/* Center-justified search bar */}
                <input
                    type="text"
                    placeholder="find your new favorite"
                    className="search-bar"
                />
            </div>

        </header>
    );
};

export default Header;
