import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList
} from 'recharts';
import { Box, Text, Select, Flex, Stack, Button, Tooltip as ChakraTooltip, useToast, Divider } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Sample data for charts
const transactionThroughputData = [
  { time: '1m', transactions: 120 },
  { time: '5m', transactions: 300 },
  { time: '10m', transactions: 450 },
  { time: '30m', transactions: 600 },
  { time: '1h', transactions: 850 },
  { time: '2h', transactions: 1000 },
  { time: '3h', transactions: 1200 },
];

const nodeHealthData = [
  { time: '1m', cpu: 20, memory: 30 },
  { time: '5m', cpu: 25, memory: 35 },
  { time: '10m', cpu: 30, memory: 40 },
  { time: '30m', cpu: 35, memory: 45 },
  { time: '1h', cpu: 40, memory: 50 },
  { time: '2h', cpu: 45, memory: 55 },
  { time: '3h', cpu: 50, memory: 60 },
];

const avgBlockTimeData = [
  { time: '1m', avgTime: 10 },
  { time: '5m', avgTime: 12 },
  { time: '10m', avgTime: 11 },
  { time: '30m', avgTime: 14 },
  { time: '1h', avgTime: 15 },
  { time: '2h', avgTime: 16 },
  { time: '3h', avgTime: 17 },
];

const networkLatencyData = [
  { time: '1m', latency: 50 },
  { time: '5m', latency: 55 },
  { time: '10m', latency: 60 },
  { time: '30m', latency: 65 },
  { time: '1h', latency: 70 },
  { time: '2h', latency: 75 },
  { time: '3h', latency: 80 },
];

const transactionSuccessRateData = [
  { time: '1m', successRate: 98 },
  { time: '5m', successRate: 96 },
  { time: '10m', successRate: 95 },
  { time: '30m', successRate: 94 },
  { time: '1h', successRate: 93 },
  { time: '2h', successRate: 92 },
  { time: '3h', successRate: 90 },
];

const nodeUptimeData = [
  { time: '1m', uptime: 99.9 },
  { time: '5m', uptime: 99.8 },
  { time: '10m', uptime: 99.7 },
  { time: '30m', uptime: 99.6 },
  { time: '1h', uptime: 99.5 },
  { time: '2h', uptime: 99.4 },
  { time: '3h', uptime: 99.3 },
];

const PerformanceMetrics = () => {
  const [timeRange, setTimeRange] = useState('30m');
  const toast = useToast();

  // Filter data based on selected time range
  const filterData = (data) => {
    return data.filter(item => item.time === timeRange || timeRange === '1h');
  };

  // Export data as CSV
  const exportToCSV = (data, filename) => {
    const csvData = data.map(row => ({
      ...row,
      time: row.time,
      transactions: row.transactions || '',
      cpu: row.cpu || '',
      memory: row.memory || '',
      avgTime: row.avgTime || '',
      latency: row.latency || '',
      successRate: row.successRate || '',
      uptime: row.uptime || '',
    }));
    return csvData;
  };

  // Export data as PDF
  const exportToPDF = (data, title) => {
    const doc = new jsPDF();
    doc.text(title, 14, 16);
    doc.autoTable({
      startY: 24,
      head: [['Time', 'Transactions', 'CPU Usage (%)', 'Memory Usage (%)', 'Average Block Time (s)', 'Network Latency (ms)', 'Success Rate (%)', 'Node Uptime (%)']],
      body: data.map(row => [
        row.time,
        row.transactions || '',
        row.cpu || '',
        row.memory || '',
        row.avgTime || '',
        row.latency || '',
        row.successRate || '',
        row.uptime || '',
      ]),
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
          Network Performance Metrics 📊
        </Text>
        <Flex mb={4} align="center" justify="space-between">
          <Text fontWeight="medium">Time Range:</Text>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} width="200px">
            <option value="1m">Last 1 minute</option>
            <option value="5m">Last 5 minutes</option>
            <option value="10m">Last 10 minutes</option>
            <option value="30m">Last 30 minutes</option>
            <option value="1h">Last 1 hour</option>
            <option value="2h">Last 2 hours</option>
            <option value="3h">Last 3 hours</option>
          </Select>
        </Flex>
        <Stack spacing={6}>
          {/* Transaction Throughput Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Transaction Throughput</Text>
            <ResponsiveContainer>
              <LineChart data={filterData(transactionThroughputData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="transactions" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Node Health Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Node Health</Text>
            <ResponsiveContainer>
              <BarChart data={filterData(nodeHealthData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cpu" fill="#82ca9d">
                  <LabelList dataKey="cpu" position="top" />
                </Bar>
                <Bar dataKey="memory" fill="#8884d8">
                  <LabelList dataKey="memory" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Average Block Time Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Average Block Time</Text>
            <ResponsiveContainer>
              <LineChart data={filterData(avgBlockTimeData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgTime" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Network Latency Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Network Latency</Text>
            <ResponsiveContainer>
              <LineChart data={filterData(networkLatencyData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="latency" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Transaction Success Rate Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Transaction Success Rate</Text>
            <ResponsiveContainer>
              <LineChart data={filterData(transactionSuccessRateData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="successRate" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Node Uptime Chart */}
          <Box height={300}>
            <Text fontSize="md" fontWeight="semibold" mb={2}>Node Uptime</Text>
            <ResponsiveContainer>
              <LineChart data={filterData(nodeUptimeData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uptime" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

        </Stack>
        <Divider my={4} />
        <Flex justify="center" mt={4}>
          <ChakraTooltip label="Export to CSV">
            <Button
              colorScheme="blue"
              mr={4}
              onClick={() => {
                const data = exportToCSV(transactionThroughputData, 'Transaction_Throughput');
                toast({ title: "CSV export initiated.", status: "info", duration: 3000 });
              }}
            >
              Export CSV
            </Button>
          </ChakraTooltip>
          <ChakraTooltip label="Export to PDF">
            <Button
              colorScheme="green"
              onClick={() => {
                exportToPDF(transactionThroughputData, 'Transaction_Throughput');
                toast({ title: "PDF export initiated.", status: "info", duration: 3000 });
              }}
            >
              Export PDF
            </Button>
          </ChakraTooltip>
        </Flex>
      </Box>
    </Card>
  );
};

export default PerformanceMetrics;
