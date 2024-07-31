import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Card from 'components/card/Card';

// Sample data for transaction history
const sampleData = [
  { date: '2024-07-01', type: 'Send', amount: '$150.00', assetType: 'BTC', status: 'Completed', transactionId: '1A2B3C' },
  { date: '2024-07-02', type: 'Receive', amount: '$200.00', assetType: 'ETH', status: 'Pending', transactionId: '4D5E6F' },
  { date: '2024-07-03', type: 'Send', amount: '$75.50', assetType: 'USDT', status: 'Failed', transactionId: '7G8H9I' },
  { date: '2024-07-04', type: 'Receive', amount: '$300.00', assetType: 'BNB', status: 'Completed', transactionId: '0J1K2L' },
  { date: '2024-07-05', type: 'Send', amount: '$900.00', assetType: 'ADA', status: 'Completed', transactionId: '3M4N5O' },
  { date: '2024-07-07', type: 'Receive', amount: '$100.00', assetType: 'BTC', status: 'Failed', transactionId: '6P7Q8R' },
  { date: '2024-07-11', type: 'Send', amount: '$2200.00', assetType: 'ETH', status: 'Completed', transactionId: '9S0T1U' },
  { date: '2024-07-12', type: 'Receive', amount: '$300.00', assetType: 'USDT', status: 'Completed', transactionId: '1V2W3X' },
  { date: '2024-07-13', type: 'Send', amount: '$1500.00', assetType: 'BNB', status: 'Pending', transactionId: '4Y5Z6A' },
  { date: '2024-07-14', type: 'Receive', amount: '$250.00', assetType: 'ADA', status: 'Completed', transactionId: '7B8C9D' },
];

const columns = [
  { Header: 'Date', accessor: 'date' },
  { Header: 'Type', accessor: 'type' },
  { Header: 'Amount', accessor: 'amount' },
  { Header: 'Asset Type', accessor: 'assetType' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Transaction ID', accessor: 'transactionId' },
];

const TransactionHistory = () => {
  const [data, setData] = useState(sampleData);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', type: 'All', status: 'All' });

  // Filter data based on search and date range
  const filteredData = data.filter(item => {
    const matchesSearch = filters.search
      ? Object.values(item).some(value => value.toLowerCase().includes(filters.search.toLowerCase()))
      : true;
    const matchesStartDate = filters.startDate ? new Date(item.date) >= new Date(filters.startDate) : true;
    const matchesEndDate = filters.endDate ? new Date(item.date) <= new Date(filters.endDate) : true;
    const matchesType = filters.type !== 'All' ? item.type === filters.type : true;
    const matchesStatus = filters.status !== 'All' ? item.status === filters.status : true;

    return matchesSearch && matchesStartDate && matchesEndDate && matchesType && matchesStatus;
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: filteredData }, useFilters, useSortBy);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#transaction-table' });
    doc.save('transaction-history.pdf');
  };

  return (
    <Card>
      <Box p={4}>
        <Flex mb={4} gap={4} flexWrap="wrap">
          <Input
            placeholder="Search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <Input
            type="date"
            placeholder="Start Date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
          <Input
            type="date"
            placeholder="End Date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
          <Select
            placeholder="Filter by Type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Send">Send</option>
            <option value="Receive">Receive</option>
          </Select>
          <Select
            placeholder="Filter by Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </Select>
        </Flex>
        <Flex mb={4} gap={4}>
          <Button>
            <CSVLink data={filteredData} filename={"transaction-history.csv"}>
              Export to CSV
            </CSVLink>
          </Button>
          <Button onClick={exportToPDF}>Export to PDF</Button>
        </Flex>
        <Table id="transaction-table" {...getTableProps()} variant="striped" colorScheme="teal">
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </Th>
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
      </Box>
    </Card>
  );
};

export default TransactionHistory;
