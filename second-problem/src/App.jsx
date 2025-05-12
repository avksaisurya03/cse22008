import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockPage from './pages/StockPage';
import CorrelationHeatmap from './pages/CorrelationHeatmap';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        {/* Navigation Links */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/stock" style={{ marginRight: '10px' }}>Stock Page</Link>
          <Link to="/heatmap">Correlation Heatmap</Link>
        </nav>

        {/* Route Handling */}
        <Routes>
          <Route path="/" element={<h2>Welcome to Stock Aggregator App</h2>} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/heatmap" element={<CorrelationHeatmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
