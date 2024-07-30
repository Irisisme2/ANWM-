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
import { Box, SimpleGrid } from "@chakra-ui/react";
import ViewWallet from "views/admin/WalletManagement/components/ViewWallet";
import WalletOverview from "views/admin/WalletManagement/components/WalletOverview";
import Management from "views/admin/WalletManagement/components/Management";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/WalletManagement/variables/columnsData";
import tableDataDevelopment from "views/admin/WalletManagement/variables/tableDataDevelopment.json";
import AddRemoveWallets from "views/admin/WalletManagement/components/AddRemoveWallets";
import tableDataColumns from "views/admin/WalletManagement/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/WalletManagement/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
        mb='10px'
        minHeight="calc(1vh - 10px)" // Adjust to your needs
      >
        {/* Left column with vertical stack */}
        <SimpleGrid
          columns={1}
          spacing={{ base: "20px", xl: "20px" }}
          minHeight="10%"
        >
          <ViewWallet />
          <Management />
          <AddRemoveWallets/>
        </SimpleGrid>

        {/* Right column taking full height */}
        <Box>
          <WalletOverview />
        </Box>
      </SimpleGrid>
    </Box>
  );
};