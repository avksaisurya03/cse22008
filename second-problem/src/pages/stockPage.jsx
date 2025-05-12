import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Button, TextField, Typography } from '@mui/material';

// ✅ Helper to format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();  // show time like 10:30:15
};

const StockPage = () => {
  const [ticker, setTicker] = useState('NVDA');  // default stock
  const [minutes, setMinutes] = useState(50);    // default minutes
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(0);

  // ✅ Function to fetch stock data from API
  const fetchStockData = async () => {
    try {
      const response = await fetch(`http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`);
      const json = await response.json();

      console.log('Fetched Data:', json);  // ✅ Log fetched data

      // ✅ Calculate average price
      const prices = json.map(item => item.price);
      const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;

      // ✅ Format data for recharts
      const chartData = json.map(item => ({
        price: item.price,
        time: formatTimestamp(item.lastUpdatedAt)
      }));

      setData(chartData);  // ✅ update chart data
      setAverage(avg);     // ✅ update average
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  // ✅ Auto-fetch on mount and when ticker/minutes change
  useEffect(() => {
    fetchStockData();
  }, [ticker, minutes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Stock Page</Typography>

      {/* Inputs */}
      <TextField
        label="Ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Minutes"
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" onClick={fetchStockData}>Fetch</Button>

      {/* Chart */}
      <div style={{ width: '100%', height: 400, marginTop: '30px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            <ReferenceLine y={average} label="Average" stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockPage;
