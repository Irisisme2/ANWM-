import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Select, Box, Flex } from '@chakra-ui/react';
import { useTable, useFilters, useSortBy } from 'react-table';
import Card from 'components/card/Card';
import TransactionDetailModal from 'views/admin/TransactionManagement/components/TransactionDetailModal'; // Ensure this path is correct

// Expanded sample data for receive history
const sampleData = [
  { date: "2024-07-01", senderAddress: "0xABC123", amount: "$150.00", status: "Completed", id: "tx001", additionalInfo: "Payment for invoice #123" },
  { date: "2024-07-02", senderAddress: "0xDEF456", amount: "$200.00", status: "Pending", id: "tx002", additionalInfo: "Payment for invoice #124" },
  { date: "2024-07-03", senderAddress: "0xGHI789", amount: "$75.50", status: "Failed", id: "tx003", additionalInfo: "Payment for invoice #125" },
  { date: "2024-07-04", senderAddress: "0xJKL012", amount: "$300.00", status: "Completed", id: "tx004", additionalInfo: "Payment for invoice #126" },
  { date: "2024-07-05", senderAddress: "0xMNO345", amount: "$900.00", status: "Completed", id: "tx005", additionalInfo: "Payment for invoice #127" },
  { date: "2024-07-07", senderAddress: "0xPQR678", amount: "$100.00", status: "Failed", id: "tx006", additionalInfo: "Payment for invoice #128" },
  { date: "2024-07-11", senderAddress: "0xSTU901", amount: "$2200.00", status: "Completed", id: "tx007", additionalInfo: "Payment for invoice #129" },
  { date: "2024-07-12", senderAddress: "0xVWX234", amount: "$350.00", status: "Completed", id: "tx008", additionalInfo: "Payment for invoice #130" },
  { date: "2024-07-15", senderAddress: "0xYZA567", amount: "$500.00", status: "Pending", id: "tx009", additionalInfo: "Payment for invoice #131" },
  { date: "2024-07-17", senderAddress: "0xBCD890", amount: "$600.00", status: "Completed", id: "tx010", additionalInfo: "Payment for invoice #132" },
  { date: "2024-07-19", senderAddress: "0xEFG123", amount: "$150.00", status: "Failed", id: "tx011", additionalInfo: "Payment for invoice #133" },
  { date: "2024-07-20", senderAddress: "0xHIJ456", amount: "$400.00", status: "Completed", id: "tx012", additionalInfo: "Payment for invoice #134" },
];

const columns = [
  { Header: "Date", accessor: "date" },
  { Header: "Sender Address", accessor: "senderAddress" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Status", accessor: "status" },
];

const ReceiveHistoryTable = () => {
  const [data] = useState(sampleData); // No need to update data state
  const [filters, setFilters] = useState({ date: '', status: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Filter data based on date and status
  const filteredData = data.filter(item => {
    const matchesDate = filters.date ? item.date === filters.date : true;
    const matchesStatus = filters.status ? item.status === filters.status : true;
    return matchesDate && matchesStatus;
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useFilters, useSortBy);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle row click to open modal
  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  return (
    <>
      <Card>
        <Box p={4}>
          <Flex mb={4} gap={4}>
            <Input
              placeholder="Filter by Date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
            <Select
              placeholder="Filter by Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </Select>
          </Flex>
          <Table {...getTableProps()} variant="striped" colorScheme="teal">
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
                  <Tr
                    {...row.getRowProps()}
                    onClick={() => handleRowClick(row.original)} // Set up row click handler
                    cursor="pointer" // Change cursor to pointer for clickable
                  >
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

      {isModalOpen && selectedTransaction && (
        <TransactionDetailModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </>
  );
};

export default ReceiveHistoryTable;
