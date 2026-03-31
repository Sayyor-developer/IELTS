import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './sections.css';

const Sections = () => {
  const { mode } = useParams(); // URL-dan 'IELTS' yoki 'CEFR' keladi
  const navigate = useNavigate();

  // Har bir mode uchun alohida sectionlar konfiguratsiyasi
  const modeConfigs = {
    IELTS: [
      { id: 'listening', title: 'Listening', icon: '🎧', desc: '40 questions, 30 min' },
      { id: 'reading', title: 'Reading', icon: '📖', desc: '40 questions, 60 min' },
      { id: 'writing', title: 'Writing', icon: '✍️', desc: '2 tasks, 60 min' },
      { id: 'speaking', title: 'Speaking', icon: '🎤', desc: '3 parts, 11-14 min' }
    ],
    CEFR: [
      { id: 'listening', title: 'Listening', icon: '🎧', desc: '30-35 questions' },
      { id: 'reading', title: 'Reading', icon: '📖', desc: '35 questions' },
      { id: 'writing', title: 'Writing', icon: '✍️', desc: '2 tasks' },
      { id: 'speaking', title: 'Speaking', icon: '🎤', desc: 'Interview' },
      { id: 'grammar', title: 'Grammar & Vocab', icon: '📚', desc: 'Lexical competence' } // CEFR-da ko'p bo'ladi
    ]
  };

  // Hozirgi tanlangan rejimga mos sectionlarni olamiz
  const currentSections = modeConfigs[mode] || [];

  return (
    <div className="sections-container">
      <div className="sections-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Modes</button>
        <h1 className="mode-title">{mode} Practice Sections</h1>
        <p className="mode-subtitle">Select a module to start practicing</p>
      </div>

      <div className="sections-grid">
        {currentSections.map((sec) => (
          <div 
            key={sec.id} 
            className="section-card"
            onClick={() => navigate(`/exams/${mode}/${sec.id}`)}
          >
            <div className="sec-icon-wrapper">{sec.icon}</div>
            <div className="sec-info">
              <h3>{sec.title}</h3>
              <p>{sec.desc}</p>
            </div>
            <div className="arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sections;