import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import Card from 'components/card/Card'; // Adjust the import path as needed
import { Box, Text, Center, Flex, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Select, useBreakpointValue } from '@chakra-ui/react'; // Import Chakra UI components

// Icons for assets
import Btc from "assets/img/icons/btc.png";
import Eth from "assets/img/icons/eth.png";
import Usdt from "assets/img/icons/usdt.png";
import Bnb from "assets/img/icons/bnb.png";
import Ada from "assets/img/icons/ada.png";

// Sample data
const totalBalanceData = [
  { name: 'Bitcoin (BTC)', value: 50000 },
  { name: 'Ethereum (ETH)', value: 30000 },
  { name: 'Tether (USDT)', value: 15000 },
  { name: 'Binance Coin (BNB)', value: 10000 },
  { name: 'Cardano (ADA)', value: 5000 },
];

const assetAllocationData = [
  { name: 'Bitcoin (BTC)', value: 50 },
  { name: 'Ethereum (ETH)', value: 30 },
  { name: 'Tether (USDT)', value: 10 },
  { name: 'Binance Coin (BNB)', value: 7 },
  { name: 'Cardano (ADA)', value: 3 },
];

const recentActivityData = [
  { date: '2024-07-01', balance: 100000 },
  { date: '2024-07-02', balance: 95000 },
  { date: '2024-07-03', balance: 96000 },
  { date: '2024-07-04', balance: 97000 },
  { date: '2024-07-05', balance: 98000 },
];

const topPerformersData = [
  { name: 'Bitcoin (BTC)', performance: 25 },
  { name: 'Ethereum (ETH)', performance: 18 },
  { name: 'Binance Coin (BNB)', performance: 12 },
  { name: 'Cardano (ADA)', performance: 8 },
];

const recentTransactionsData = [
  { id: 1, date: '2024-07-01', amount: 2000, type: 'Incoming', status: 'Completed' },
  { id: 2, date: '2024-07-02', amount: 1500, type: 'Outgoing', status: 'Pending' },
  { id: 3, date: '2024-07-03', amount: 1800, type: 'Incoming', status: 'Completed' },
  { id: 4, date: '2024-07-04', amount: 2200, type: 'Outgoing', status: 'Completed' },
  { id: 5, date: '2024-07-05', amount: 2500, type: 'Incoming', status: 'Completed' },
];

// Mapping of asset names to icons
const iconMap = {
  'Bitcoin (BTC)': Btc,
  'Ethereum (ETH)': Eth,
  'Tether (USDT)': Usdt,
  'Binance Coin (BNB)': Bnb,
  'Cardano (ADA)': Ada,
};

const COLORS = ['#7f8c8d', '#95a5a6', '#16a085', '#1abc9c', '#2ecc71'];

const WalletOverview = () => {
  const [filteredData, setFilteredData] = useState(recentTransactionsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter transactions based on user input
  const filterTransactions = () => {
    let data = recentTransactionsData;

    if (searchTerm) {
      data = data.filter(transaction => transaction.id.toString().includes(searchTerm));
    }

    if (selectedType !== 'All') {
      data = data.filter(transaction => transaction.type === selectedType);
    }

    if (selectedStatus !== 'All') {
      data = data.filter(transaction => transaction.status === selectedStatus);
    }

    setFilteredData(data);
  };

  // Export data to CSV
  const exportToCSV = () => {
    const csvData = [
      ['ID', 'Date', 'Amount', 'Type', 'Status'],
      ...filteredData.map(item => [item.id, item.date, item.amount, item.type, item.status]),
    ];
    const csvContent = csvData.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  // Responsive chart dimensions
  const chartWidth = useBreakpointValue({ base: 300, md: 500 });
  const chartHeight = useBreakpointValue({ base: 200, md: 300 });

  return (
    <Card>
      <Box p={4}>
        {/* Wallet Summary Details */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Wallet Summary Details
          </Text>
          <Flex direction="column" align="center" gap={4}>
            {totalBalanceData.map((asset) => (
              <Flex key={asset.name} align="center" justify="space-between" p={3} borderWidth="1px" borderRadius="md" width="100%" maxW="400px">
                <Flex align="center">
                  <img src={iconMap[asset.name]} alt={asset.name} style={{ width: 24, height: 24, marginRight: 8 }} />
                  <Text fontWeight="bold">{asset.name}</Text>
                </Flex>
                <Text>${asset.value.toLocaleString()}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Asset Allocation Pie Chart */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Asset Allocation
          </Text>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={assetAllocationData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                fill="#8884d8"
                label
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Recent Activity Line Chart */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Recent Activity
          </Text>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={recentActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Top Performers Bar Chart */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Top Performers
          </Text>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={topPerformersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Recent Transactions Table */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Recent Transactions
          </Text>
          <Flex direction="column" mb={4} gap={4}>
            <Flex mb={2} gap={4}>
              <Input
                placeholder="Search by Transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                placeholder="Select Type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
              </Select>
              <Select
                placeholder="Select Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </Select>
              <Button onClick={filterTransactions}>Filter</Button>
              <Button onClick={exportToCSV}>Export to CSV</Button>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.id}</Td>
                    <Td>{transaction.date}</Td>
                    <Td>${transaction.amount.toLocaleString()}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
};

export default WalletOverview;
