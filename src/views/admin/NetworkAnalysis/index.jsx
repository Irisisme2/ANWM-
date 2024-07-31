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
import Banner from "views/admin/NetworkAnalysis/components/Banner";
import NetworkMap from "views/admin/NetworkAnalysis/components/NetworkMap";
import PerformanceMetricsTable from "views/admin/NetworkAnalysis/components/PerformanceMetricsTable";
import PerformanceMetrics from "views/admin/NetworkAnalysis/components/PerformanceMetrics";
import Storage from "views/admin/NetworkAnalysis/components/Storage";
import Upload from "views/admin/NetworkAnalysis/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    {/* Main Fields */}
    <Grid
      templateRows={{ base: "repeat(3, 1fr)", lg: "1fr" }}
      gap={{ base: "20px", xl: "20px" }}
      mb={{ base: "20px", xl: "30px" }}
    >
      <PerformanceMetrics />
    </Grid>

    {/* Network Map and Performance Metrics Table */}
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "repeat(2, 1fr)",
        "2xl": "1.34fr 1.62fr 1fr",
      }}
      templateRows={{
        base: "1fr",
        lg: "repeat(2, 1fr)",
        "2xl": "1fr",
      }}
      gap={{ base: "20px", xl: "20px" }}
    >
      <Box
        gridColumn={{ base: "1 / -1", lg: "1 / 2" }}
        mb={{ base: "20px", xl: "0" }}
      >
        <NetworkMap />
      </Box>
      <Box
        gridColumn={{ base: "1 / -1", lg: "2 / -1" }}
        mb={{ base: "20px", xl: "0" }}
      >
        <PerformanceMetricsTable />
      </Box>
    </Grid>
  </Box>
  );
}
