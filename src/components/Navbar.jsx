import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRocket, FaChartLine, FaArrowUp, FaArrowDown, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    
    { to: '/', label: 'Top 50', icon: <FaChartLine /> },
    { to: '/all-cryptos', label: 'All Cryptos', icon: <FaRocket /> },
    { to: '/gainers', label: 'Top Gainers', icon: <FaArrowUp /> },
    { to: '/losers', label: 'Top Losers', icon: <FaArrowDown /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <FaRocket className="navbar-logo-icon" />
          <span>CryptoPulse</span>
        </Link>

        {/* Hamburger Icon */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links */}
        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={`navbar-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
