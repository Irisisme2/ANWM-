import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Flex, Box, Image, Select, useToast } from '@chakra-ui/react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import Card from 'components/card/Card'; // Adjust the import path as needed

// Import icons
import Btc from 'assets/img/icons/btc.png';
import Eth from 'assets/img/icons/eth.png';
import Usdt from 'assets/img/icons/usdt.png';
import Bnb from 'assets/img/icons/bnb.png';
import Ada from 'assets/img/icons/ada.png';
import Dot from 'assets/img/icons/dot.png';

// Sample data for wallet balances with icons
const data = [
  { name: 'Bitcoin (BTC)', symbol: 'BTC', amount: 1.5, usdValue: 30000, icon: Btc },
  { name: 'Ethereum (ETH)', symbol: 'ETH', amount: 10, usdValue: 1800, icon: Eth },
  { name: 'Tether (USDT)', symbol: 'USDT', amount: 5000, usdValue: 5000, icon: Usdt },
  { name: 'Binance Coin (BNB)', symbol: 'BNB', amount: 20, usdValue: 1500, icon: Bnb },
  { name: 'Cardano (ADA)', symbol: 'ADA', amount: 1000, usdValue: 1000, icon: Ada },
  { name: 'Polkadot (DOT)', symbol: 'DOT', amount: 500, usdValue: 500, icon: Dot },
 { name: 'Bitcoin (BTC)', symbol: 'BTC', amount: 1.5, usdValue: 30000, icon: Btc },
 { name: 'Bitcoin (BTC)', symbol: 'BTC', amount: 0.75, usdValue: 15000, icon: Btc },
 { name: 'Bitcoin (BTC)', symbol: 'BTC', amount: 2.0, usdValue: 40000, icon: Btc },
 { name: 'Ethereum (ETH)', symbol: 'ETH', amount: 10, usdValue: 1800, icon: Eth },
 { name: 'Ethereum (ETH)', symbol: 'ETH', amount: 5, usdValue: 9000, icon: Eth },
 { name: 'Ethereum (ETH)', symbol: 'ETH', amount: 7, usdValue: 12600, icon: Eth },
 { name: 'Tether (USDT)', symbol: 'USDT', amount: 5000, usdValue: 5000, icon: Usdt },
 { name: 'Tether (USDT)', symbol: 'USDT', amount: 3000, usdValue: 3000, icon: Usdt },
 { name: 'Tether (USDT)', symbol: 'USDT', amount: 2000, usdValue: 2000, icon: Usdt },
 { name: 'Binance Coin (BNB)', symbol: 'BNB', amount: 20, usdValue: 1500, icon: Bnb },
 { name: 'Binance Coin (BNB)', symbol: 'BNB', amount: 10, usdValue: 750, icon: Bnb },
 { name: 'Binance Coin (BNB)', symbol: 'BNB', amount: 5, usdValue: 375, icon: Bnb },
 { name: 'Cardano (ADA)', symbol: 'ADA', amount: 1000, usdValue: 1000, icon: Ada },
 { name: 'Cardano (ADA)', symbol: 'ADA', amount: 500, usdValue: 500, icon: Ada },
 { name: 'Cardano (ADA)', symbol: 'ADA', amount: 250, usdValue: 250, icon: Ada },
];

const columns = [
  {
    Header: 'Icon',
    accessor: 'icon',
    Cell: ({ cell: { value } }) => <Image src={value} alt="icon" boxSize="30px" />,
  },
  { Header: 'Asset Name', accessor: 'name' },
  { Header: 'Symbol', accessor: 'symbol' },
  { Header: 'Amount', accessor: 'amount' },
  { Header: 'USD Value', accessor: 'usdValue' },
];

const ViewWallet = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const toast = useToast();

  // React Table setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Current page data
    prepareRow,
    state: { pageIndex },
  } = useTable(
    { columns, data: filteredData, initialState: { pageIndex: currentPage, pageSize } },
    useFilters,
    useSortBy,
    usePagination
  );

  // Filtering and searching logic
  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newData = data.filter(row =>
      row.name.toLowerCase().includes(lowercasedSearchTerm) ||
      row.symbol.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredData(newData);
  };

  // Pagination handlers
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0); // Reset to first page when page size changes
  };

  const handleExportCSV = () => {
    const csvData = [
      ['Asset Name', 'Symbol', 'Amount', 'USD Value'],
      ...filteredData.map(item => [
        item.name,
        item.symbol,
        item.amount,
        item.usdValue
      ])
    ];

    const csvContent = csvData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', 'wallet_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Exported to CSV",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Reapply filters on page change
    setFilteredData(data);
  }, [currentPage, pageSize]);

  return (
    <Card>
      <Box p={4}>
        <Flex direction="column" mb={4}>
          <Input
            placeholder="Search by Asset Name or Symbol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Button onClick={handleSearch} mb={4}>Search</Button>
          <Select
            placeholder="Select Filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            mb={4}
          >
            <option value="All">All</option>
            <option value="Below 1000">Below 1000 USD</option>
            <option value="1000-5000">1000-5000 USD</option>
            <option value="Above 5000">Above 5000 USD</option>
          </Select>
          <Button onClick={handleExportCSV} mb={4}>Export to CSV</Button>
        </Flex>
        <Table {...getTableProps()} variant="striped" colorScheme="teal">
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map(row => {
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
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => (pageIndex + 1) < Math.ceil(filteredData.length / pageSize) ? prev + 1 : prev)}
            disabled={(pageIndex + 1) >= Math.ceil(filteredData.length / pageSize)}
          >
            Next
          </Button>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
    </Card>
  );
};

export default ViewWallet;
