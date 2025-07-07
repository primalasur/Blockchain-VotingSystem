import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import QRScanner from './components/QRScanner';
import VotingForm from './components/VotingForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import './styles/styles.css';


const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [qrData, setQrData] = useState('');
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Correct contract address

  return (
    <Router>
      <Routes>
        {/* Main home page with user and admin login options */}
        <Route path="/" element={<Home />} />

        {/* Admin login page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User login that leads to QR Scanner */}
        <Route 
          path="/user-login" 
          element={
            <>
              {!walletAddress && <ConnectWallet setWalletAddress={setWalletAddress} />}
              {walletAddress && !qrData && (
                <QRScanner onScan={(data) => setQrData(data)} />
              )}
              {qrData && (
                <VotingForm 
                  contractAddress={contractAddress} 
                  walletAddress={walletAddress} 
                />
              )}
            </>
          } 
        />

        {/* Admin dashboard page to see voting results */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
