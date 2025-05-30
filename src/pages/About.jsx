import React from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaChartLine,
  FaDatabase,
  FaDollarSign,
  FaInfoCircle,
  FaFilter,
  FaMobileAlt,
} from "react-icons/fa"; // Importing icons
import "./About.css"; // Import the CSS for styling the About page

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About CryptoPulse</h1>
      <p className="about-description">
        CryptoPulse is a modern cryptocurrency tracking app that allows you to
        stay updated with real-time prices, market data, and trends for your
        favorite cryptocurrencies. Built with React and powered by CoinGecko
        API, CryptoPulse gives you all the information you need to make informed
        decisions about your crypto investments.
      </p>

      <section className="about-section">
        <h2>Technologies Used</h2>
        <div className="tech-icons">
          <div className="tech-item">
            <div className="tech-icon-box">
              <FaReact size={40} color="#61DAFB" />
            </div>
            <p>React.js</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon-box">
              <FaCss3Alt size={40} color="#264de4" />
            </div>
            <p>CSS3</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon-box">
              <FaChartLine size={40} color="#3b82f6" />
            </div>
            <p>Chart.js</p>
          </div>
          <div className="tech-item">
            <div className="tech-icon-box">
              <FaDatabase size={40} color="#8A2BE2" />
            </div>
            <p>API</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <FaDollarSign size={30} color="#22c55e" />
            <p>Track live prices for top cryptocurrencies</p>
          </div>
          <div className="feature-item">
            <FaInfoCircle size={30} color="#3b82f6" />
            <p>View detailed coin information with charts and stats</p>
          </div>
          <div className="feature-item">
            <FaChartLine size={30} color="#facc15" />
            <p>Interactive chart for real-time price trends</p>
          </div>
          <div className="feature-item">
            <FaFilter size={30} color="#ec4899" />
            <p>Filter and search coins quickly</p>
          </div>
          <div className="feature-item">
            <FaMobileAlt size={30} color="#8b5cf6" />
            <p>Responsive UI for all screen sizes</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Created By</h2>
        <p className="creator-name">Girish Ahire</p>
        <p>Built with love and passion for cryptocurrency.</p>
      </section>
    </div>
  );
};

export default About;
