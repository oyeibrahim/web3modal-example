import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

import {// Import Chains
  mainnet,
  bsc,
  base
} from "./util/chains";


// 1. Get projectId (https://cloud.walletconnect.com/)
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID

// 2. Set chains
// Imported Above

// 3. Create a metadata object
const metadata = {
  name: 'Bitwalka',
  description: 'Bitwalka Technological Solutions',
  url: 'https://bitwalka.com', // origin must match your domain & subdomain
  icons: ['https://www.bitwalka.com/frontend-assets/images/logo.png']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: 'https://mainnet.infura.io/v3/' + process.env.REACT_APP_INFURA_TOKEN, // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
  auth: {
    email: false,
    // socials: ['google', 'x', 'github', 'discord', 'apple'], // add social logins 
    // showWallets: true,
    // walletFeatures: false
  }
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bsc, base],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
