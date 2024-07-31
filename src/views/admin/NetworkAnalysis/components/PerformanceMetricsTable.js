import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Button, Stack, useToast } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from 'components/card/Card';

// Sample data for metrics
const sampleMetrics = [
  {
    name: 'Transaction Throughput',
    currentValue: 1200,
    averageValue: 800,
    historicalData: [
      { time: '1m', value: 1000 },
      { time: '5m', value: 1100 },
      { time: '10m', value: 1200 },
      { time: '30m', value: 900 },
      { time: '1h', value: 800 },
      { time: '2h', value: 750 },
      { time: '3h', value: 700 },
    ],
  },
  {
    name: 'Node CPU Usage',
    currentValue: 45,
    averageValue: 30,
    historicalData: [
      { time: '1m', value: 40 },
      { time: '5m', value: 45 },
      { time: '10m', value: 50 },
      { time: '30m', value: 35 },
      { time: '1h', value: 30 },
      { time: '2h', value: 25 },
      { time: '3h', value: 20 },
    ],
  },
  {
    name: 'Average Block Time',
    currentValue: 15,
    averageValue: 12,
    historicalData: [
      { time: '1m', value: 14 },
      { time: '5m', value: 15 },
      { time: '10m', value: 16 },
      { time: '30m', value: 13 },
      { time: '1h', value: 12 },
      { time: '2h', value: 11 },
      { time: '3h', value: 10 },
    ],
  },
];

const PerformanceMetricsTable = () => {
  const [metrics, setMetrics] = useState(sampleMetrics);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const toast = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random data for demonstration
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => ({
          ...metric,
          currentValue: metric.currentValue + Math.floor(Math.random() * 10 - 5),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle historical data chart display
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    toast({
      title: `Showing historical data for ${metric.name}`,
      status: 'info',
      duration: 3000,
    });
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
          Performance Metrics Table 📊
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Metric Name</Th>
              <Th>Current Value</Th>
              <Th>Average Value</Th>
              <Th>Historical Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            {metrics.map((metric, index) => (
              <Tr key={index}>
                <Td>{metric.name}</Td>
                <Td>{metric.currentValue}</Td>
                <Td>{metric.averageValue}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleMetricClick(metric)}
                  >
                    View Historical Data
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Historical Data Chart */}
        {selectedMetric && (
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              {selectedMetric.name} - Historical Data
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedMetric.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default PerformanceMetricsTable;
