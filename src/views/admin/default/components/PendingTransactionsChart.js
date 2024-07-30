import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'components/card/Card'; // Adjust the import path as needed

// Sample data for pending transactions
const data = [
  { date: '2024-07-01', pending: 5 },
  { date: '2024-07-02', pending: 8 },
  { date: '2024-07-03', pending: 4 },
  { date: '2024-07-04', pending: 7 },
  { date: '2024-07-05', pending: 6 },
  // More data points...
];

const PendingTransactionsChart = () => {
  return (
    <Card>
      <h2>Pending Transactions Over Time ⏳</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pending" stroke="#27ae60" />
      </LineChart>
    </Card>
  );
};

export default PendingTransactionsChart;
