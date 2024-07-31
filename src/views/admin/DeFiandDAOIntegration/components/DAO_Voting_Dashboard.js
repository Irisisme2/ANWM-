import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  HeatMap
} from 'recharts';
import { Box, Card, Text, SimpleGrid, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// Realistic example data
const votingOptionsData = [
  { name: 'Proposal 1: New Governance Model', value: 600 },
  { name: 'Proposal 2: Funding for Ecosystem Growth', value: 450 },
  { name: 'Proposal 3: Protocol Upgrade', value: 300 },
  { name: 'Proposal 4: Community Rewards Program', value: 250 }
];

const resultsSummaryData = [
  { date: '2024-07-01', votes: 200 },
  { date: '2024-07-02', votes: 250 },
  { date: '2024-07-03', votes: 300 },
  { date: '2024-07-04', votes: 400 },
  { date: '2024-07-05', votes: 350 }
];

const proposalActivityData = [
  { proposal: 'New Governance Model', activity: 90 },
  { proposal: 'Funding for Ecosystem Growth', activity: 75 },
  { proposal: 'Protocol Upgrade', activity: 60 },
  { proposal: 'Community Rewards Program', activity: 50 }
];

const proposalDistributionData = [
  { category: 'Governance', value: 700 },
  { category: 'Funding', value: 450 },
  { category: 'Upgrade', value: 300 },
  { category: 'Community', value: 250 }
];

const votingTrendsData = [
  { month: 'Jan', votes: 1500 },
  { month: 'Feb', votes: 1600 },
  { month: 'Mar', votes: 1700 },
  { month: 'Apr', votes: 1800 },
  { month: 'May', votes: 1900 },
  { month: 'Jun', votes: 2000 }
];

const proposalDetailsData = [
  { proposal: 'New Governance Model', description: 'A proposal to overhaul the governance structure of the DAO.', votes: 600, status: 'Active' },
  { proposal: 'Funding for Ecosystem Growth', description: 'Funding allocated for growing the ecosystem and partnerships.', votes: 450, status: 'Completed' },
  { proposal: 'Protocol Upgrade', description: 'Upgrading the protocol to enhance security and efficiency.', votes: 300, status: 'Active' },
  { proposal: 'Community Rewards Program', description: 'Introducing a rewards program to incentivize community participation.', votes: 250, status: 'Pending' }
];

const votingActivityHeatmapData = [
  { day: '2024-07-01', hour: '00', votes: 15 },
  { day: '2024-07-01', hour: '01', votes: 25 },
  { day: '2024-07-01', hour: '02', votes: 5 },
  { day: '2024-07-01', hour: '03', votes: 8 },
  { day: '2024-07-01', hour: '04', votes: 20 },
  { day: '2024-07-02', hour: '00', votes: 18 },
  { day: '2024-07-02', hour: '01', votes: 28 },
  // Additional data here
];

const proposalSentimentData = [
  { proposal: 'New Governance Model', positive: 70, neutral: 20, negative: 10 },
  { proposal: 'Funding for Ecosystem Growth', positive: 55, neutral: 30, negative: 15 },
  { proposal: 'Protocol Upgrade', positive: 60, neutral: 25, negative: 15 },
  { proposal: 'Community Rewards Program', positive: 45, neutral: 35, negative: 20 }
];

const pieColors = ['#ff8c00', '#00c49f', '#0088fe', '#ffbb28'];
const barColors = ['#82ca9d'];
const lineColor = '#8884d8';
const areaColor = '#82ca9d';
const radarColor = '#ff8c00';

const DAO_Voting_Dashboard = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>

        {/* Voting Options Pie Chart */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Voting Options</Text>
          <PieChart width={400} height={300}>
            <Pie
              data={votingOptionsData}
              dataKey="value"
              outerRadius={120}
              fill="#8884d8"
            >
              {votingOptionsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <Legend />
          </PieChart>
        </Card>

        {/* Voting Results Summary Bar Chart */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Voting Results Summary</Text>
          <BarChart
            width={400}
            height={300}
            data={resultsSummaryData}
            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="votes" fill={barColors[0]} />
          </BarChart>
        </Card>

        {/* Proposal Activity Line Chart */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Proposal Activity</Text>
          <LineChart
            width={400}
            height={300}
            data={proposalActivityData}
            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="proposal" />
            <YAxis />
            <RechartsTooltip />
            <Line type="monotone" dataKey="activity" stroke={lineColor} />
            <Legend />
          </LineChart>
        </Card>

        {/* Proposal Distribution Radar Chart */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Proposal Distribution</Text>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" width={400} height={300} data={proposalDistributionData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 800]} />
            <Radar name="Proposal Distribution" dataKey="value" stroke={radarColor} fill={radarColor} fillOpacity={0.6} />
            <RechartsTooltip />
          </RadarChart>
        </Card>

        {/* Voting Trends Area Chart */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Voting Trends</Text>
          <AreaChart
            width={400}
            height={300}
            data={votingTrendsData}
            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Area type="monotone" dataKey="votes" stroke={lineColor} fill={areaColor} />
            <Legend />
          </AreaChart>
        </Card>

        {/* Proposal Details Table */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Proposal Details</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Proposal</Th>
                <Th>Description</Th>
                <Th isNumeric>Votes</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {proposalDetailsData.map((proposal, index) => (
                <Tr key={index}>
                  <Td>{proposal.proposal}</Td>
                  <Td>{proposal.description}</Td>
                  <Td isNumeric>{proposal.votes}</Td>
                  <Td>{proposal.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>

        {/* Voting Activity Heatmap */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Voting Activity Heatmap</Text>
          {/* Placeholder for Heatmap */}
          <Box width="100%" height="300px" border="1px" borderColor="gray.200" p={4}>
            <Text>No heatmap library included in this example.</Text>
          </Box>
        </Card>

        {/* Proposal Sentiment Analysis */}
        <Card bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Proposal Sentiment Analysis</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {proposalSentimentData.map((proposal, index) => (
              <Card key={index} bg="white" p={4} borderRadius="md" boxShadow="md">
                <Text fontSize="lg" mb={2}>{proposal.proposal}</Text>
                <Text>Positive: {proposal.positive}%</Text>
                <Text>Neutral: {proposal.neutral}%</Text>
                <Text>Negative: {proposal.negative}%</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DAO_Voting_Dashboard;
