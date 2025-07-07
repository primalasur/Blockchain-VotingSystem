import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const VotingForm = ({ walletAddress, contractAddress }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();

    try {
      if (!selectedCandidateId) {
        setError('Please select a candidate to vote for.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected address:", userAddress);

      if (!userAddress) {
        alert('Please connect your wallet.');
        return;
      }

      const contractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            { "internalType": "string", "name": "name", "type": "string" }
          ],
          "name": "addCandidate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "candidates",
          "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllCandidates",
          "outputs": [
            {
              "components": [
                { "internalType": "string", "name": "name", "type": "string" },
                { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
              ],
              "internalType": "struct Voting.Candidate[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }],
          "name": "getVoteCount",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "name": "hasVoted",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // ✅ Find the index of the selected candidate
      const candidateIndex = candidates.findIndex(c => c._id === selectedCandidateId);
      if (candidateIndex === -1) {
        setError("Invalid candidate selected.");
        return;
      }

      // ✅ Vote using the index (required by smart contract)
      const tx = await contract.vote(candidateIndex);
      await tx.wait();

      // ✅ Log vote to backend
      const response = await axios.post('http://localhost:5000/api/votes', {
        userId: walletAddress,
        candidateId: selectedCandidateId,
      });

      if (response.status === 200) {
        setMessage('✅ Vote successfully cast!');
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('❌ An error occurred while casting your vote. Please try again.');
      setMessage('');
    }
  };

  // --- Styles ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    padding: '30px',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4f46e5',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  };

  const errorStyle = {
    marginTop: '20px',
    color: 'red',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleVote} style={formStyle}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>🗳️ Vote for Your Candidate</h3>
        <label style={labelStyle}>
          Select Candidate:
          <select
            style={selectStyle}
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            required
          >
            <option value="" disabled>-- Select a Candidate --</option>
            {candidates.map((candidate) => (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name} ({candidate.party})
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={buttonStyle}>Submit Vote</button>
        {message && <p style={messageStyle}>{message}</p>}
        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
};

export default VotingForm;
