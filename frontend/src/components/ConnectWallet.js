import React, { useState } from 'react';

const ConnectWallet = ({ setWalletAddress }) => {
  const [isConnecting, setIsConnecting] = useState(false); // Track connection status

  const connectWallet = async () => {
    if (isConnecting) {
      console.log("Connection request already in progress. Please wait.");
      return;
    }

    setIsConnecting(true); // Mark as connecting
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]); // Set wallet address
        console.log("Wallet connected:", accounts[0]);
      } else {
        alert('MetaMask is not installed. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false); // Reset connection status
    }
  };

  return (
    <div>
      <button onClick={connectWallet} disabled={isConnecting}>
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;
