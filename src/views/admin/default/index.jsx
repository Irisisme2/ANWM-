/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import TransactionHistory from "views/admin/default/components/TransactionHistory";
import RecentTransactions from "views/admin/default/components/RecentTransactions";
import QuickActions from "views/admin/default/components/QuickActions";
import PieCard from "views/admin/default/components/PieCard";
import NetworkActivity from "views/admin/default/components/NetworkActivity";
import AssetValueChart from "views/admin/default/components/AssetValueChart";
import PendingTransactionsChart from "views/admin/default/components/PendingTransactionsChart";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import Btc from "assets/img/icons/btc.png"; // Bitcoin icon
import Eth from "assets/img/icons/eth.png"; // Ethereum icon
import Usdt from "assets/img/icons/usdt.png"; // Tether icon
import Bnb from "assets/img/icons/bnb.png"; // Binance Coin icon
import Ada from "assets/img/icons/ada.png"; // Cardano icon
import Dot from "assets/img/icons/dot.png"; // Polkadot icon

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
         <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <Icon w='32px' h='32px' as={MdAccountBalanceWallet} color={brandColor} />
            }
          />
        }
        name='Total Balance'
        value='$10,000.00' // Update with actual total balance value
      />
      {/* Bitcoin Balance */}
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <img src={Btc} alt="Bitcoin" style={{ width: '32px', height: '32px' }} />
            }
          />
        }
        name='Bitcoin (BTC)'
        value='0.5 BTC' // Update with actual Bitcoin balance
      />
      {/* Ethereum Balance */}
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <img src={Eth} alt="Ethereum" style={{ width: '32px', height: '32px' }} />
            }
          />
        }
        name='Ethereum (ETH)'
        value='1.2 ETH' // Update with actual Ethereum balance
      />
      {/* Tether Balance */}
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <img src={Usdt} alt="Tether" style={{ width: '32px', height: '32px' }} />
            }
          />
        }
        name='Tether (USDT)'
        value='$500 USDT' // Update with actual Tether balance
      />
      {/* Binance Coin Balance */}
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <img src={Bnb} alt="Binance Coin" style={{ width: '32px', height: '32px' }} />
            }
          />
        }
        name='Binance Coin (BNB)'
        value='10 BNB' // Update with actual Binance Coin balance
      />
      {/* Cardano Balance */}
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <img src={Ada} alt="Cardano" style={{ width: '32px', height: '32px' }} />
            }
          />
        }
        name='Cardano (ADA)'
        value='300 ADA' // Update with actual Cardano balance
      />
    </SimpleGrid>

    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
        <AssetValueChart />
        <PendingTransactionsChart />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
        <TransactionHistory columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <PieCard />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1 }} spacing={4} mb={8}>
        <RecentTransactions columnsData={columnsDataComplex} tableData={tableDataComplex} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1 }} spacing={4} mb={8}>
        <NetworkActivity />
      </SimpleGrid>
      <QuickActions />
    </Box>
  );
};
