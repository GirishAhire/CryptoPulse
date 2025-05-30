import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gainers.css';

const Gainers = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1');
        const data = await res.json();
  
        // Sort manually by 24h percentage change
        const sorted = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setCoins(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gainers:', err);
        setLoading(false);
      }
    };
  
    fetchGainers();
  }, []);
  

  if (loading) return <div className="gainers-container">Loading...</div>;

  return (
    <div className="gainers-container">
      <h2>Top Gainers (24h)</h2>
      <table className="gainers-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id} onClick={() => navigate(`/coin/${coin.id}`)}>
              <td>{index + 1}</td>
              <td className="coin-info">
                <img src={coin.image} alt={coin.name} />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className="positive">{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gainers;
