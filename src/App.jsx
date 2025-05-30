import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gainers from './pages/Gainers';
import Losers from './pages/Losers';
import About from './pages/About';
import CoinDetail from './pages/CoinDetail';
import AllCryptos from './pages/AllCryptos'; // Adjust path if needed


const App = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/all-cryptos" element={<AllCryptos />} /> {/* Route for All Cryptos */}
          <Route path="/gainers" element={<Gainers />} />
          <Route path="/losers" element={<Losers />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
