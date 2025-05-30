import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCryptos.css';

const AllCryptos = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'
        );
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching coins:', err);
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.current_price - b.current_price
        : b.current_price - a.current_price
    );

  if (loading) return <div className="all-cryptos-container">Loading...</div>;

  return (
    <div className="all-cryptos-container">
      <h2>All Cryptocurrencies</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort Price {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      <table className="all-cryptos-table">
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
          {filteredCoins.map((coin, index) => (
            <tr key={coin.id} onClick={() => navigate(`/coin/${coin.id}`)}>
              <td>{index + 1}</td>
              <td className="coin-info">
                <img src={coin.image} alt={coin.name} />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCryptos;
