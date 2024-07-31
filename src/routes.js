import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdOutlineShoppingCart,
  MdAccountBalance,
  MdPayment,
  MdNetworkCheck,
  MdTrendingUp,
  MdGroup,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Transactions from "views/admin/TransactionManagement";
import Wallet from "views/admin/WalletManagement";
import Network from "views/admin/NetworkAnalysis";
import defi from "views/admin/DeFiandDAOIntegration";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Management",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Wallet Management",
    layout: "/admin",
    icon: <Icon as={MdAccountBalance} width='20px' height='20px' color='inherit' />,
    path: "/WalletManagement",
    component: Wallet,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/TransactionManagement",
    icon: <Icon as={MdPayment} width='20px' height='20px' color='inherit' />,
    component: Transactions,
  },
  {
    name: "Network Analysis",
    layout: "/admin",
    path: "/NetworkAnalysis",
    icon: <Icon as={MdNetworkCheck} width='20px' height='20px' color='inherit' />,
    component: Network,
  },
  {
    name: "DeFi and DAO Integration",
    layout: "/admin",
    path: "/DeFiandDAOIntegration",
    icon: <Icon as={MdTrendingUp} width='20px' height='20px' color='inherit' />,
    component: defi,
  },
];

export default routes;
