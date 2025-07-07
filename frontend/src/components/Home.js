import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Add custom styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Blockchain Voting System</h1>
      <div className="home-buttons">
        <button onClick={() => navigate('/user-login')}>User Login</button>
        <button onClick={() => navigate('/admin-login')}>Admin Login</button>
      </div>
    </div>
  );
};

export default Home;
