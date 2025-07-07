import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);

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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '40px 20px',
    background: '#f9fafa',
    minHeight: '100vh',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#333',
  };

  const tableStyle = {
    width: '100%',
    maxWidth: '800px',
    borderCollapse: 'collapse',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thTdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left',
    color: '#333',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#4f46e5',
    color: 'white',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🗳️ Admin Dashboard</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Candidate</th>
            <th style={thStyle}>Party</th>
            <th style={thStyle}>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td style={thTdStyle}>{candidate.name}</td>
              <td style={thTdStyle}>{candidate.party}</td>
              <td style={thTdStyle}>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
