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
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import SendFunds from "views/admin/TransactionManagement/components/SendFunds";
import ReceiveHistoryTable from "views/admin/TransactionManagement/components/ReceiveHistoryTable";
import TransactionHistory from "views/admin/TransactionManagement/components/TransactionHistory";
import SendHistoryTable from "views/admin/TransactionManagement/components/SendHistoryTable";
import ReceiveFunds from "views/admin/TransactionManagement/components/ReceiveFunds";
import Upload from "views/admin/TransactionManagement/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr", // Split into two equal columns on large screens
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "44px", xl: "20px" }}
        mb={{ base: "44px", xl: "40px" }} // Added margin-bottom
      >
        <SendFunds
          gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }} // Adjusted gridArea for small and large screens
        />
        <ReceiveFunds
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }} // Adjusted gridArea for small and large screens
        />
      </Grid>
      <Grid
        gap={{ base: "20px", xl: "20px" }}
        mt={{ base: "20px", xl: "40px" }} // Added margin-top
      >
        <SendHistoryTable />
        <ReceiveHistoryTable />
        <TransactionHistory />
      </Grid>
    </Box>
  );
}
