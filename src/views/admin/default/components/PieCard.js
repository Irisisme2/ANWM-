import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import Card from 'components/card/Card'; // Adjust the import path as needed
import { Box, Text, useBreakpointValue, Flex } from '@chakra-ui/react';

// Sample data for assets including NFTs
const data = [
  { name: 'Bitcoin (BTC)', value: 4000 },
  { name: 'Ethereum (ETH)', value: 3000 },
  { name: 'Tether (USDT)', value: 2000 },
  { name: 'Binance Coin (BNB)', value: 1500 },
  { name: 'Cardano (ADA)', value: 1000 },
  { name: 'Polkadot (DOT)', value: 500 },
  { name: 'NFTs (Art)', value: 1200 },
  { name: 'NFTs (Collectibles)', value: 800 },
];

// Define subdued colors for each section
const COLORS = [
  '#7f8c8d', // Bitcoin (BTC) - Dark Gray
  '#95a5a6', // Ethereum (ETH) - Light Gray
  '#16a085', // Tether (USDT) - Teal
  '#1abc9c', // Binance Coin (BNB) - Lighter Teal
  '#2ecc71', // Cardano (ADA) - Green
  '#27ae60', // Polkadot (DOT) - Darker Green
  '#3498db', // NFTs (Art) - Blue
  '#2980b9', // NFTs (Collectibles) - Darker Blue
];

const AssetBreakdown = () => {
  // Adjust chart size based on screen size
  const chartWidth = useBreakpointValue({ base: 300, md: 400 });
  const chartHeight = useBreakpointValue({ base: 300, md: 400 });

  return (
    <Card>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" p={4}>
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={chartWidth / 4}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
        <Box ml={{ base: 0, md: 4 }} p={4} minW="200px">
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Asset Breakdown 📊
          </Text>
          <Legend
            verticalAlign="top"
            align="left"
            layout="vertical"
            wrapperStyle={{ position: 'relative', top: 0, left: 0 }}
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default AssetBreakdown;
