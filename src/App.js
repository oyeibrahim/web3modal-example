
import './App.css';

import { useEffect, useState } from 'react';
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3ModalError,
  useWeb3Modal,
  useDisconnect
} from '@web3modal/ethers/react'

import { BrowserProvider, Contract, formatUnits, parseEther } from 'ethers'

// #################################################################
// Import from interact.js
// #################################################################
import {
  loadTokenTicker,
  loadEthBalance,
  loadTokenBalance,
  loadSendEth,
  loadSendTokens
} from "./util/interact.js";

// Improvised
import { getBaseCoinTicker } from "./util/chainsCoin.js"
import { getChainName } from "./util/chainsName.js"

function App() {

  // #################################################################
  // web3modal Hooks
  // #################################################################
  const { error } = useWeb3ModalError()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()




  const TOKEN_CONTRACT_ABI = require("./contracts/usdt-contract-abi.json");
  const TOKEN_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";


  //state variables
  const [status, setStatus] = useState("Web3modal usage");

  //for tracking smart contract update
  const [smUpdate, setSmUpdate] = useState("");
  const [spinner, setSpinner] = useState(false);

  const [tokenTicker, setTokenTicker] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [sendEthAddress, setSendEthAddress] = useState("");
  const [sendEthAmount, setSendEthAmount] = useState("");
  const [sendTokenAddress, setSendTokenAddress] = useState("");
  const [sendTokenAmount, setSendTokenAmount] = useState("");

  var notConnectedText = "You are not connected to the Blockchain, Please click the Connect Button";


  //connection dependent calls in conditional useEffect
  useEffect(() => {

    if (isConnected) {

      async function fetchBlockchainData() {
        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()
        // The Contract object
        const TOKEN_CONTRACT = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer)

        const ethBalance = await loadEthBalance(formatUnits, ethersProvider, address);
        setEthBalance(ethBalance);

        const tokenBalance = await loadTokenBalance(formatUnits, TOKEN_CONTRACT, address);
        setTokenBalance(tokenBalance);

        const tokenTicker = await loadTokenTicker(TOKEN_CONTRACT);
        setTokenTicker(tokenTicker);
      }
      fetchBlockchainData();

    }


    if (error) {
      setStatus(error.message);
    }

    // eslint-disable-next-line 
  }, [address, chainId, isConnected, smUpdate]);


  // error dependent calls in conditional useEffect
  useEffect(() => {

    if (error) {
      setStatus(error);
    }

  }, [error]);





  // #################################################################
  // Connect wallet buttons back code
  // #################################################################

  const connectWalletPressed = async () => {
    open({ view: 'Connect' })
    // List of views you can select:
    // https://docs.walletconnect.com/appkit/react/core/hooks
    // Connect - Principal view of the modal - default view when disconnected
    // Account - User profile - default view when connected
    // AllWallets - Shows the list of all available wallets
    // Networks - List of available networks - you can select and target a specific network before connecting
    // WhatIsANetwork - "What is a network" onboarding view
    // WhatIsAWallet - "What is a wallet" onboarding view
    // OnRampProviders - "OnRamp main view
  };
  // Logout
  const disconnectWalletPressed = async () => {
    disconnect()
  };




  // #################################################################
  // SET buttons function implementation
  // #################################################################
  const onSendEthPressed = async () => {
    setSpinner(true)
    if (isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      const { status, smUpdate } = await loadSendEth(signer, sendEthAddress, parseEther(String(sendEthAmount)));
      setStatus(status);
      setSmUpdate(smUpdate);
      setSendEthAmount(0);

      setSpinner(false)
    } else {
      setStatus(notConnectedText);
      setSpinner(false)
    }

  };
  const onSendTokenPressed = async () => {
    setSpinner(true)
    if (isConnected) {

      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const TOKEN_CONTRACT = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer)

      const { status, smUpdate } = await loadSendTokens(TOKEN_CONTRACT, sendTokenAddress, parseEther(String(sendTokenAmount)));
      setStatus(status);
      setSmUpdate(smUpdate);
      setSendTokenAmount(0);

      setSpinner(false)
    } else {
      setStatus(notConnectedText);
      setSpinner(false)
    }

  };



  return (
    <div className="App">
      <header className="App-header">
        <p>
          Status: <code>{status}</code>
        </p>
        <p>
          Address: <code>{address}</code>
        </p>

        <button className="btn btn-primary">
          Chain: {getChainName(chainId)}
        </button>

        <p>
          {getBaseCoinTicker(chainId)} Balance: <code>{ethBalance}</code>
        </p>
        <p>
          {tokenTicker} Balance: <code>{tokenBalance}</code>
        </p>

        <br />
        <w3m-network-button />
        <w3m-button size='md' balance='hide' />

        <br />
        <button className="btn btn-primary"
          onClick={connectWalletPressed}
          disabled={spinner}
        >
          Manual modal opener
        </button>
        <br />
        <button className="btn btn-primary"
          onClick={disconnectWalletPressed}
          disabled={spinner}
        >
          Manual Disconnect Wallet
        </button>

        <br />
        <div className="row mb-3">
          <div className="col">

            <input type="text"
              className="form-control mb-2"
              placeholder="Address"
              onChange={(e) => setSendEthAddress(e.target.value)}
              value={sendEthAddress}
            />

            <input type="text"
              className="form-control mb-2"
              placeholder="Amount in ETH"
              onChange={(e) => setSendEthAmount(e.target.value)}
              value={sendEthAmount}
            />

            <button className="btn btn-primary"
              onClick={onSendEthPressed}
              disabled={spinner}
            >
              Send ETH
            </button>

          </div>

          <div className="col">

            <input type="text"
              className="form-control mb-2"
              placeholder="Address"
              onChange={(e) => setSendTokenAddress(e.target.value)}
              value={sendTokenAddress}
            />

            <input type="text"
              className="form-control mb-2"
              placeholder="Amount in Tokens"
              onChange={(e) => setSendTokenAmount(e.target.value)}
              value={sendTokenAmount}
            />

            <button className="btn btn-primary"
              onClick={onSendTokenPressed}
              disabled={spinner}
            >
              Send Tokens
            </button>

          </div>
        </div>

      </header>

    </div>
  );
}

export default App;
