import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './result.css';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scores = location.state?.scores;

  useEffect(() => {
    if (!scores) {
      navigate('/');
    }
  }, [scores, navigate]);

  if (!scores) return null;

  const getStatusData = (score) => {
    const s = parseFloat(score);
    if (s >= 7.5) return { text: "Excellent!", color: "#22c55e", emoji: "🔥" };
    if (s >= 6.0) return { text: "Good Job!", color: "#3b82f6", emoji: "✅" };
    return { text: "Keep Practicing!", color: "#f59e0b", emoji: "📚" };
  };

  const status = getStatusData(scores.overall);

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <span className="emoji-status">{status.emoji}</span>
          <h1 style={{ color: status.color }}>{status.text}</h1>
          <p>Your IELTS Simulation Result</p>
        </div>

        <div className="overall-score-circle" style={{ borderColor: status.color }}>
          <span className="big-score">{scores.overall}</span>
          <span className="label">Overall Band</span>
        </div>

        <div className="individual-scores">
          {['Listening', 'Reading', 'Writing', 'Speaking'].map((s) => (
            <div className="score-item" key={s}>
              <span>{s}</span>
              <div className="score-bar">
                <div style={{
                  width: `${(scores[s.toLowerCase()] / 9) * 100}%`, 
                  background: status.color 
                }}></div>
              </div>
              <strong>{scores[s.toLowerCase()]}</strong>
            </div>
          ))}
        </div>

        <div className="result-actions">
          <button className="btn-restart" onClick={() => navigate('/')}>Back to Home</button>
          <button className="btn-review" onClick={() => window.print()}>Save Result</button>
        </div>
      </div>
    </div>
  );
};

export default Result;