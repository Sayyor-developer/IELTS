import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <h1 className="main-title">Choose Your Practice Mode</h1>
      <div className="mode-grid">
        {/* IELTS Bloki */}
        <div className="mode-card" onClick={() => navigate('/sections/IELTS')}>
          <div className="mode-icon">GB</div>
          <h2>IELTS Mode</h2>
          <p>Academic & General training practice</p>
        </div>

        {/* CEFR Bloki */}
        <div className="mode-card" onClick={() => navigate('/sections/CEFR')}>
          <div className="mode-icon">EU</div>
          <h2>CEFR Mode</h2>
          <p>B1, B2, C1 level certification practice</p>
        </div>
      </div>
    </div>
  );
};

export default Home;