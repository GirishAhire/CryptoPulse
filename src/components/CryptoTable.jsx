import React from "react";

const CryptoTable = ({ coins, loading, error }) => {
  if (loading)
    return <p className="text-center text-gray-500">Loading data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Coin</th>
            <th className="py-3 px-6 text-right">Price</th>
            <th className="py-3 px-6 text-right">24h %</th>
            <th className="py-3 px-6 text-right">Market Cap</th>
            <th className="py-3 px-6 text-right">Volume</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-200">
          {coins.map((coin, index) => (
            <tr
              key={coin.id}
              className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6 flex items-center gap-2">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-5 h-5 rounded-full"
                />
                <div>
                  <span className="font-semibold">{coin.name}</span>
                  <span className="block text-xs text-gray-400">
                    ({coin.symbol.toUpperCase()})
                  </span>
                </div>
              </td>

              <td className="py-3 px-6 text-right font-medium text-sm">
                ${coin.current_price.toLocaleString()}
                </td>

              <td
                className={`py-3 px-6 text-right ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="py-3 px-6 text-right">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td className="py-3 px-6 text-right">
                ${coin.total_volume.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
