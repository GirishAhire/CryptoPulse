import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import './CoinDetail.css';

const timeOptions = [
  { label: '1D', value: '1' },
  { label: '30D', value: '30' },
  { label: '1Y', value: '365' },
  { label: 'All', value: 'max' }, // ⭐ Added All (lifetime)
];

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState('30'); // ⭐ Default to 30D

  const fetchChartData = async (coinId, days) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    const data = await res.json();

    return data.prices.map(([timestamp, price]) => ({
      time: formatTimestamp(timestamp, days),
      price: parseFloat(price.toFixed(2)),
    }));
  };

  const formatTimestamp = (timestamp, range) => {
    const date = new Date(timestamp);
    if (range === '1') {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`; // ⭐ 1D = time only
    } else if (range === 'max') {
      return date.getFullYear().toString(); // ⭐ All = year only
    } else {
      return date.toLocaleDateString(); // ⭐ other = full date
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const coinData = await coinRes.json();
        setCoin(coinData);

        const formattedData = await fetchChartData(id, days);
        setChartData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, days]);

  if (loading) return <div className="coin-detail-container">Loading...</div>;
  if (!coin) return <div className="coin-detail-container">Coin not found.</div>;

  return (
    <div className="coin-detail-container">
      <div className="coin-header">
        <img src={coin.image.large} alt={coin.name} className="coin-detail-logo" />
        <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
      </div>

      <div className="coin-stats-grid">
        <div><strong>Rank:</strong> #{coin.market_cap_rank}</div>
        <div><strong>Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</div>
        <div><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</div>
        <div><strong>Volume:</strong> ${coin.market_data.total_volume.usd.toLocaleString()}</div>
        <div><strong>24h Change:</strong>
          <span className={coin.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div><strong>Circulating:</strong> {coin.market_data.circulating_supply.toLocaleString()}</div>
        <div><strong>Total Supply:</strong> {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</div>
      </div>

      <div className="coin-desc" dangerouslySetInnerHTML={{ __html: coin.description.en?.split('. ')[0] + '.' }} />

      <div className="coin-chart">
        <h3>Price Chart</h3>
        <div className="chart-buttons">
          {timeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setDays(option.value)}
              className={days === option.value ? 'active' : ''}
            >
              {option.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              angle={-45} // ⭐ Rotated to avoid overlap
              textAnchor="end"
              height={60}
            />
            <YAxis dataKey="price" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke={coin.market_data.price_change_percentage_24h >= 0 ? "#16a34a" : "#dc2626"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinDetail;
