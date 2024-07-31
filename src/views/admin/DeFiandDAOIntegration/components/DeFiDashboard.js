import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Flex,
  Button,
  IconButton,
  Tooltip,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Collapse,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { InfoIcon, AddIcon } from '@chakra-ui/icons';

// Sample Data
const stakedData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 4000 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 7000 },
];

const loanData = [
  { month: 'Jan', value: 2000 },
  { month: 'Feb', value: 1500 },
  { month: 'Mar', value: 3000 },
  { month: 'Apr', value: 2500 },
  { month: 'May', value: 3500 },
  { month: 'Jun', value: 4000 },
];

const farmingData = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 1400 },
  { month: 'Apr', value: 1600 },
  { month: 'May', value: 1800 },
  { month: 'Jun', value: 2000 },
];
const monthlyData = [
  { month: 'Jan', staked: 4000, loan: 2000, farming: 1000 },
  { month: 'Feb', staked: 3000, loan: 1500, farming: 1200 },
  { month: 'Mar', staked: 5000, loan: 3000, farming: 1400 },
  { month: 'Apr', staked: 4000, loan: 2500, farming: 1600 },
  { month: 'May', staked: 6000, loan: 3500, farming: 1800 },
  { month: 'Jun', staked: 7000, loan: 4000, farming: 2000 },
];
// Pie Chart Data
const pieData = [
  { name: 'Staked Assets', value: 7000 },
  { name: 'Loans', value: 4000 },
  { name: 'Yield Farming', value: 2000 },
];

// Sample Table Data
const initialTableData = [
  { type: 'Staked Assets', amount: 7000, percentage: '50%' },
  { type: 'Loans', amount: 4000, percentage: '30%' },
  { type: 'Yield Farming', amount: 2000, percentage: '20%' },
];

// Sample Transaction History
const transactionHistory = [
  { date: '2024-07-01', type: 'Staked', amount: 1000 },
  { date: '2024-07-02', type: 'Loan Repayment', amount: 500 },
  { date: '2024-07-03', type: 'Yield Farming', amount: 200 },
];

const DeFiDashboard = () => {
  const [stakedDataState, setStakedDataState] = useState(stakedData);
  const [loanDataState, setLoanDataState] = useState(loanData);
  const [farmingDataState, setFarmingDataState] = useState(farmingData);
  const [newStakedValue, setNewStakedValue] = useState('');
  const [newLoanValue, setNewLoanValue] = useState('');
  const [newFarmingValue, setNewFarmingValue] = useState('');
  const [tableData, setTableData] = useState(initialTableData);
  const [filteredData, setFilteredData] = useState(initialTableData);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [monthlyDataState, setMonthlyDataState] = useState(monthlyData);
  const [pieDataState, setPieDataState] = useState(pieData);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStakedData = stakedDataState.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 1000) - 500
      }));
      const updatedLoanData = loanDataState.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 500) - 250
      }));
      const updatedFarmingData = farmingDataState.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 300) - 150
      }));
      setStakedDataState(updatedStakedData);
      setLoanDataState(updatedLoanData);
      setFarmingDataState(updatedFarmingData);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [stakedDataState, loanDataState, farmingDataState]);

  useEffect(() => {
    let filtered = tableData;
    if (selectedFilter !== 'All') {
      filtered = tableData.filter(item => item.type === selectedFilter);
    }
    setFilteredData(filtered.sort((a, b) => (sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount)));
  }, [selectedFilter, sortOrder, tableData]);

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const chartBg = useColorModeValue('gray.100', 'gray.700');
  const pieColors = ['#8884d8', '#82ca9d', '#ffc658'];

  const totalStaked = stakedDataState.reduce((acc, item) => acc + item.value, 0);
  const totalLoans = loanDataState.reduce((acc, item) => acc + item.value, 0);
  const totalFarming = farmingDataState.reduce((acc, item) => acc + item.value, 0);

  const handleAddData = () => {
    setStakedDataState([...stakedDataState, { month: 'Jul', value: parseFloat(newStakedValue) }]);
    setLoanDataState([...loanDataState, { month: 'Jul', value: parseFloat(newLoanValue) }]);
    setFarmingDataState([...farmingDataState, { month: 'Jul', value: parseFloat(newFarmingValue) }]);
    setNewStakedValue('');
    setNewLoanValue('');
    setNewFarmingValue('');
    onClose();
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {/* Stats Overview */}
        <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" mb={4} color={textColor}>DeFi Portfolio Overview</Text>
          <StatGroup>
            <Stat>
              <StatLabel>Total Staked Assets</StatLabel>
              <StatNumber>${totalStaked.toLocaleString()}</StatNumber>
              <StatHelpText>Amount staked in all assets</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Total Loans</StatLabel>
              <StatNumber>${totalLoans.toLocaleString()}</StatNumber>
              <StatHelpText>Current outstanding loans</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Total Yield Farming</StatLabel>
              <StatNumber>${totalFarming.toLocaleString()}</StatNumber>
              <StatHelpText>Current yield farming earnings</StatHelpText>
            </Stat>
          </StatGroup>
   {/* Portfolio Performance Over Time */}
   <Text fontSize="xl" mt={8} mb={4} color={textColor}>Portfolio Performance Over Time</Text>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyDataState} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="staked" fill="#8884d8" />
              <Line type="monotone" dataKey="loan" stroke="#82ca9d" />
              <Area type="monotone" dataKey="farming" stroke="#ffc658" fill="#ffc658" />
              <ReferenceLine y={0} stroke="#000" />
            </ComposedChart>
          </ResponsiveContainer>

        </Card>

   {/* Portfolio Breakdown */}
   <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md" mt={8}>
            <Text fontSize="xl" mb={4} color={textColor}>Portfolio Breakdown</Text>
            <ResponsiveContainer width="100%" height={400}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={pieDataState}
                startAngle={180}
                endAngle={-180}
              >
                <RadialBar minAngle={15} background clockWise={true} dataKey="value">
                  {pieDataState.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </RadialBar>
                <RechartsTooltip />
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={{ left: 0, bottom: 0 }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Card>
        <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4} color={textColor}>Staked Assets vs. Loans</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stakedDataState.map((item, index) => ({
              month: item.month,
              staked: item.value,
              loan: loanDataState[index]?.value || 0
            }))} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="staked" fill="#8884d8" />
              <Bar dataKey="loan" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Additional Charts */}
        <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4} color={textColor}>Staked Assets Over Time</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stakedDataState} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4} color={textColor}>Loans Over Time</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanDataState} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4} color={textColor}>Yield Farming Over Time</Text>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={farmingDataState} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Area type="monotone" dataKey="value" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </SimpleGrid>

      {/* Data Tables */}
      <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md" mt={8}>
        <Text fontSize="xl" mb={4} color={textColor}>Detailed Data</Text>
        <HStack spacing={4} mb={4}>
          <Select placeholder="Filter by Type" onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Staked Assets">Staked Assets</option>
            <option value="Loans">Loans</option>
            <option value="Yield Farming">Yield Farming</option>
          </Select>
          <Select placeholder="Sort Order" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Percentage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item, index) => (
              <Tr key={index}>
                <Td>{item.type}</Td>
                <Td isNumeric>${item.amount.toLocaleString()}</Td>
                <Td isNumeric>{item.percentage}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Transaction History */}
      <Card bg={cardBg} p={4} borderRadius="md" boxShadow="md" mt={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="xl" color={textColor}>Transaction History</Text>
          <IconButton
            icon={showTransactionHistory ? <InfoIcon /> : <InfoIcon />}
            colorScheme="blue"
            aria-label="Toggle History"
            onClick={() => setShowTransactionHistory(!showTransactionHistory)}
            size="md"
            isRound
          />
        </Flex>
        <Collapse in={showTransactionHistory}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactionHistory.map((transaction, index) => (
                <Tr key={index}>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.type}</Td>
                  <Td isNumeric>${transaction.amount.toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Collapse>
      </Card>

      {/* Add New Data Modal */}
      <IconButton
        icon={<AddIcon />}
        colorScheme="blue"
        aria-label="Add Data"
        onClick={onOpen}
        size="lg"
        isRound
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Staked Assets Value</FormLabel>
                <Input
                  type="number"
                  value={newStakedValue}
                  onChange={(e) => setNewStakedValue(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Loan Value</FormLabel>
                <Input
                  type="number"
                  value={newLoanValue}
                  onChange={(e) => setNewLoanValue(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Yield Farming Value</FormLabel>
                <Input
                  type="number"
                  value={newFarmingValue}
                  onChange={(e) => setNewFarmingValue(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddData}>
              Add Data
            </Button>
            <Button ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeFiDashboard;

