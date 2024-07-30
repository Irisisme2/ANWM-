import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Flex, Text, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import path as needed

// Sample data for network stats
const networkStats = {
  hashRate: '5.2 TH/s',
  transactionThroughput: '1500 tx/s',
  nodeHealth: '98%'
};

// Sample data for recent network transactions
const transactionData = [
  { date: '2024-07-01', transactions: 120 },
  { date: '2024-07-02', transactions: 150 },
  { date: '2024-07-03', transactions: 180 },
  { date: '2024-07-04', transactions: 160 },
  { date: '2024-07-05', transactions: 200 },
];

const NetworkActivity = () => {
  return (
    <Card>
      <Flex direction="column" gap={4}>
        <Text fontSize="2xl" fontWeight="bold">Network Activity 🌐</Text>
        
        {/* Network Stats */}
        <Flex direction="row" gap={6} mb={4}>
          <Stat>
            <StatLabel>Hash Rate</StatLabel>
            <StatNumber>{networkStats.hashRate}</StatNumber>
            <StatHelpText>Measure of network processing power.</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Transaction Throughput</StatLabel>
            <StatNumber>{networkStats.transactionThroughput}</StatNumber>
            <StatHelpText>Transactions processed per second.</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Node Health</StatLabel>
            <StatNumber>{networkStats.nodeHealth}</StatNumber>
            <StatHelpText>Percentage of healthy nodes.</StatHelpText>
          </Stat>
        </Flex>
        
        {/* Transaction Graph */}
        <Text fontSize="xl" fontWeight="bold" mb={2}>Recent Transactions 📉</Text>
        <LineChart width={800} height={400} data={transactionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="transactions" stroke="#3498db" />
        </LineChart>
      </Flex>
    </Card>
  );
};

export default NetworkActivity;
