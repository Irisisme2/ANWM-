import React, { useState } from 'react';
import Card from 'components/card/Card'; // Adjust the import path as needed
import { Table, Thead, Tbody, Tr, Th, Td, Input, Select, Button, Flex } from '@chakra-ui/react'; // Chakra UI components
import { useTable } from 'react-table';

// Sample data for transactions
const sampleData = [
  { transactionId: "1", amount: "$150.00", date: "2024-07-01", type: "Incoming", status: "Completed" },
  { transactionId: "2", amount: "$200.00", date: "2024-07-02", type: "Outgoing", status: "Pending" },
  { transactionId: "3", amount: "$75.50", date: "2024-07-03", type: "Incoming", status: "Failed" },
  { transactionId: "4", amount: "$300.00", date: "2024-07-04", type: "Outgoing", status: "Completed" },
  { transactionId: "5", amount: "$900.00", date: "2024-07-05", type: "Outgoing", status: "Completed" },
  { transactionId: "6", amount: "$100.00", date: "2024-07-07", type: "Outgoing", status: "Failed" },
  { transactionId: "7", amount: "$2200.00", date: "2024-07-11", type: "Incoming", status: "Completed" },
];

const columns = [
  { Header: "Transaction ID", accessor: "transactionId" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Date", accessor: "date" },
  { Header: "Type", accessor: "type" },
  { Header: "Status", accessor: "status" }
];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and search logic
  const filterTransactions = () => {
    let filteredData = sampleData;

    if (searchTerm) {
      filteredData = filteredData.filter(transaction =>
        transaction.transactionId.includes(searchTerm)
      );
    }

    if (selectedType !== 'All') {
      filteredData = filteredData.filter(transaction =>
        transaction.type === selectedType
      );
    }

    if (selectedStatus !== 'All') {
      filteredData = filteredData.filter(transaction =>
        transaction.status === selectedStatus
      );
    }

    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter(transaction =>
        new Date(transaction.date) >= new Date(dateRange.start) &&
        new Date(transaction.date) <= new Date(dateRange.end)
      );
    }

    setTransactions(filteredData);
  };

  // React Table setup
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: transactions });

  return (
    <Card>
      <h2>Transaction History 📅</h2>
      <Flex direction="column" mb={4}>
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
            <option value="Failed">Failed</option>
          </Select>
        </Flex>
        <Flex mb={2} gap={4}>
          <Input
            type="date"
            placeholder="Start Date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <Input
            type="date"
            placeholder="End Date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
          <Button onClick={filterTransactions}>Filter</Button>
        </Flex>
      </Flex>
      <Table {...getTableProps()} variant="striped" colorScheme="teal">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default TransactionHistory;
