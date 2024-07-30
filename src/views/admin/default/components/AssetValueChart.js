import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'components/card/Card'; // Adjust the import path as needed
import { Tabs, TabList, TabPanels, TabPanel, Tab, Box, Text } from '@chakra-ui/react'; // Import necessary Chakra UI components

// Sample data for asset value fluctuations
const data = {
  BTC: [
    { date: '2024-07-01', value: 40000 },
    { date: '2024-07-02', value: 40500 },
    { date: '2024-07-03', value: 41000 },
    { date: '2024-07-04', value: 40000 },
    { date: '2024-07-05', value: 42000 },
  ],
  ETH: [
    { date: '2024-07-01', value: 3000 },
    { date: '2024-07-02', value: 3050 },
    { date: '2024-07-03', value: 3100 },
    { date: '2024-07-04', value: 2950 },
    { date: '2024-07-05', value: 3200 },
  ],
  USDT: [
    { date: '2024-07-01', value: 2000 },
    { date: '2024-07-02', value: 2025 },
    { date: '2024-07-03', value: 2050 },
    { date: '2024-07-04', value: 1980 },
    { date: '2024-07-05', value: 2100 },
  ],
  BNB: [
    { date: '2024-07-01', value: 1500 },
    { date: '2024-07-02', value: 1550 },
    { date: '2024-07-03', value: 1600 },
    { date: '2024-07-04', value: 1500 },
    { date: '2024-07-05', value: 1650 },
  ],
  ADA: [
    { date: '2024-07-01', value: 1000 },
    { date: '2024-07-02', value: 1025 },
    { date: '2024-07-03', value: 1050 },
    { date: '2024-07-04', value: 980 },
    { date: '2024-07-05', value: 1100 },
  ],
  DOT: [
    { date: '2024-07-01', value: 500 },
    { date: '2024-07-02', value: 520 },
    { date: '2024-07-03', value: 550 },
    { date: '2024-07-04', value: 480 },
    { date: '2024-07-05', value: 600 },
  ],
  NFTs: [
    { date: '2024-07-01', value: 1200 }, // Art
    { date: '2024-07-02', value: 1250 },
    { date: '2024-07-03', value: 1300 },
    { date: '2024-07-04', value: 1150 },
    { date: '2024-07-05', value: 1400 },
  ],
  Collectibles: [
    { date: '2024-07-01', value: 800 }, // Collectibles
    { date: '2024-07-02', value: 850 },
    { date: '2024-07-03', value: 900 },
    { date: '2024-07-04', value: 750 },
    { date: '2024-07-05', value: 950 },
  ],
};

const AssetValueChart = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');

  return (
    <Card>
      <h2>Asset Value Fluctuations Over Time 📉</h2>
      <Tabs onChange={(index) => setSelectedAsset(['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'DOT', 'NFTs', 'Collectibles'][index])} isLazy>
        <TabList>
          <Tab>BTC</Tab>
          <Tab>ETH</Tab>
          <Tab>USDT</Tab>
          <Tab>BNB</Tab>
          <Tab>ADA</Tab>
          <Tab>DOT</Tab>
          <Tab>NFTs (Art)</Tab>
          <Tab>NFTs (Collectibles)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart width={600} height={300} data={data[selectedAsset]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#7f8c8d" />
            </LineChart>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mt="2" textAlign="center">
        <Text fontSize="sm" color="gray.600">
          Showing data for: {selectedAsset}
        </Text>
      </Box>
    </Card>
  );
};

export default AssetValueChart;
