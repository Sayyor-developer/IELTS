import React, { useState, useEffect, useRef } from 'react';
import './cefrlistening.css';

const Cefrlistening = ({ data, onComplete }) => {
  const [testIndex, setTestIndex] = useState(0); 
  const [answers, setAnswers] = useState({});
  const scrollRef = useRef(null);

  // --- MUHIM QISM: Ma'lumot massiv ekanligini tekshiramiz ---
  // Agar data massiv bo'lsa, testIndex bo'yicha olamiz, bo'lmasa o'zini olamiz
  const currentTestData = Array.isArray(data) ? data[testIndex] : data;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('listening_ans_session')) || {};
    setAnswers(saved);
    
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [testIndex, data]);

  const handleInputChange = (id, value) => {
    const key = `test_${testIndex}_q_${id}`;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    localStorage.setItem('listening_ans_session', JSON.stringify(newAnswers));
  };

  const nextStep = () => {
    if (Array.isArray(data) && testIndex < data.length - 1) {
      setTestIndex(testIndex + 1);
    } else {
      onComplete();
    }
  };

  // Agar ma'lumot hali kelmagan bo'lsa, oq ekran chiqmasligi uchun:
  if (!currentTestData) {
    return <div style={{padding: '20px', textAlign: 'center'}}>Ma'lumot yuklanmoqda...</div>;
  }

  return (
    <div className="listening-exam-container">
      <div className="listening-header">
        <div className="test-badge">Part {testIndex + 1}</div>
        <h2>{currentTestData.title}</h2>
        {currentTestData.audioUrl && (
          <div className="audio-section">
            <audio key={currentTestData.audioUrl} controls className="custom-audio-player">
              <source src={currentTestData.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}
      </div>

      <div className="listening-content" ref={scrollRef}>
        {/* QUESTIONS 1-6 */}
        {currentTestData.tableQuestions && (
          <div className="cefr-grid">
            {currentTestData.tableQuestions.map((q) => (
              <div key={q.id} className="cefr-question-card">
                <div className="card-badge">Q {q.id}</div>
                <p>{q.label}</p>
                <div className="card-input-area">
                   <span>{q.prefix}</span>
                   <input 
                    type="text" 
                    value={answers[`test_${testIndex}_q_${q.id}`] || ''} 
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="..."
                   />
                   <span>{q.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QUESTIONS 7-10 */}
        {currentTestData.sentences && (
          <div className="sentences-list">
            {currentTestData.sentences.map((s) => (
              <div key={s.id} className="sentence-card">
                <span className="q-num">{s.id}</span>
                <p>
                  {s.text.split('_________')[0]}
                  <input 
                    type="text" 
                    className="inline-input"
                    value={answers[`test_${testIndex}_q_${s.id}`] || ''}
                    onChange={(e) => handleInputChange(s.id, e.target.value)}
                  />
                  {s.text.split('_________')[1]}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="footer-nav">
          <button className="next-btn" onClick={nextStep}>
            {Array.isArray(data) && testIndex < data.length - 1 ? "Next Test →" : "Finish Listening"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cefrlistening;