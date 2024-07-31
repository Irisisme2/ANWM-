import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import Card from 'components/card/Card';

// Sample data
const data = [
  { date: '2024-07-01', recipient: '0x1234...abcd', amount: '1.5 BTC', status: 'Completed', transactionId: 'TX12345' },
  { date: '2024-07-02', recipient: '0x5678...efgh', amount: '2.0 ETH', status: 'Pending', transactionId: 'TX12346' },
  { date: '2024-07-03', recipient: '0x9abc...ijkl', amount: '500 USDT', status: 'Failed', transactionId: 'TX12347' },
  { date: '2024-07-04', recipient: '0xdefg...mnop', amount: '1.2 BNB', status: 'Completed', transactionId: 'TX12348' },
  { date: '2024-07-05', recipient: '0xhijk...qrst', amount: '300 ADA', status: 'Pending', transactionId: 'TX12349' },
];

const SendHistoryTable = () => {
  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'date' },
      { Header: 'Recipient Address', accessor: 'recipient' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Transaction ID', accessor: 'transactionId' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  return (
    <Card>
      <Box p={4}>
        <Box mb={4} display="flex" justifyContent="space-between">
          <Input
            placeholder="Search by Recipient Address"
            value={state.globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            width="300px"
          />
          <Select placeholder="Filter by Status" onChange={(e) => setGlobalFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </Select>
        </Box>
        <Table {...getTableProps()} variant="simple">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {/* Transaction Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalBody>
            {selectedTransaction && (
              <>
                <p>Date: {selectedTransaction.date}</p>
                <p>Recipient Address: {selectedTransaction.recipient}</p>
                <p>Amount: {selectedTransaction.amount}</p>
                <p>Status: {selectedTransaction.status}</p>
                <p>Transaction ID: {selectedTransaction.transactionId}</p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default SendHistoryTable;
