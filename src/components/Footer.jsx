import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} <span className="footer-brand">CryptoPulse</span>. Built with ❤️ using React & CoinGecko API.
      </p>
    </footer>
  );
};

export default Footer;
