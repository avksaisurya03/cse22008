import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const CorrelationHeatmap = () => {
  const [stocks, setStocks] = useState({});
  const [correlationMatrix, setCorrelationMatrix] = useState([]);

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = async () => {
    try {
      const response = await axios.get('http://20.244.56.144/evaluation-service/stocks');
      setStocks(response.data.stocks);
      computeCorrelation(response.data.stocks);
    } catch (error) {
      console.error('Error fetching stock list', error);
    }
  };

  const computeCorrelation = async (stocksList) => {
    const tickers = Object.values(stocksList);
    const dataMap = {};

    // Fetch data for each stock
    for (const ticker of tickers) {
      const res = await axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=50`);
      dataMap[ticker] = res.data.map(item => item.price);
    }

    // Calculate correlation matrix
    const matrix = tickers.map((t1) => {
      return tickers.map((t2) => {
        return pearsonCorrelation(dataMap[t1], dataMap[t2]);
      });
    });

    setCorrelationMatrix(matrix);
  };

  // Pearson Correlation Formula
  const pearsonCorrelation = (x, y) => {
    const n = Math.min(x.length, y.length);
    const meanX = x.slice(0, n).reduce((a, b) => a + b, 0) / n;
    const meanY = y.slice(0, n).reduce((a, b) => a + b, 0) / n;

    let cov = 0, stdX = 0, stdY = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      cov += dx * dy;
      stdX += dx * dx;
      stdY += dy * dy;
    }

    return cov / Math.sqrt(stdX * stdY);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Stock Correlation Heatmap</Typography>

      {/* Heatmap Display */}
      {correlationMatrix.length > 0 && (
        <Box mt={4}>
          {/* Placeholder: replace with real Heatmap chart */}
          <pre>{JSON.stringify(correlationMatrix, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default CorrelationHeatmap;
