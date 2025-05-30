import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Failed to fetch coins:', error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Top 50 Cryptocurrencies</h2>
      <div className="coin-grid">
        {coins.map((coin) => (
          <Link to={`/coin/${coin.id}`} key={coin.id} className="coin-card">
            <img src={coin.image} alt={coin.name} className="coin-logo" />
            <div className="coin-info">
              <h3>{coin.name}</h3>
              <p>${coin.current_price.toLocaleString()}</p>
              <p className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="more-btn-container">
        <Link to="/all-cryptos" className="more-btn">View All Cryptos</Link>
      </div>
    </div>
  );
};

export default Home;
