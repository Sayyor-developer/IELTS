import React, { useState, useEffect } from 'react';
import './cefrwriting.css';

const CefrWriting = ({ data, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // 1. Hooklar har doim tepada bo'lishi shart
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // 2. Data tekshiruvi (Hooklardan pastda)
  if (!data || !data.passages || !data.passages[currentStep]) {
    return <div className="loading">Writing ma'lumotlari yuklanmoqda...</div>;
  }

  const currentTask = data.passages[currentStep];

  // 3. Split xatosini oldini olish uchun "Optional Chaining" va "Fallback"
  // Agar prompt bo'lmasa, bo'sh string ishlatiladi, natijada split xato bermaydi
  const promptLines = (currentTask.prompt || "").split('\n').filter(line => line.trim() !== "");

  const handleTextChange = (e) => {
    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStep < data.passages.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const currentText = answers[currentTask.id] || "";
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;

  return (
    <div className="writing-container">
      <main className="writing-main">
        <section className="task-section">
          <div className="task-card">
            <span className="difficulty-tag">{currentTask.type || "Writing Task"}</span>
            <h1 className="task-title">{currentTask.title || "No Title"}</h1>
            <p className="instruction-text">{currentTask.instruction}</p>
            
            <div className="prompt-content">
              {/* XATOSIZ QISM: split muammosi hal qilingan */}
              {promptLines.length > 0 ? (
                promptLines.map((line, i) => (
                  <p key={i} className="prompt-line">{line}</p>
                ))
              ) : (
                <p className="prompt-line text-muted">No prompt provided.</p>
              )}
            </div>

            {currentTask.wordLimit && (
              <div className="word-requirement">
                Minimum Requirement: <strong>{currentTask.wordLimit} words</strong>
              </div>
            )}
          </div>
        </section>

        <section className="editor-section">
          <textarea
            className="writing-area"
            placeholder="Javobingizni shu yerga yozing..."
            value={currentText}
            onChange={handleTextChange}
            spellCheck="false"
          />
          
          <div className="editor-status">
            <div className={`word-badge ${wordCount >= (currentTask.wordLimit || 0) ? 'success' : 'pending'}`}>
              Words: {wordCount} {currentTask.wordLimit ? `/ ${currentTask.wordLimit}` : ""}
            </div>
          </div>

          <div className="action-area">
            <button 
              className="next-step-btn" 
              onClick={handleNext}
              disabled={wordCount < 1} // Kamida bitta so'z bo'lishi kerak
            >
              {currentStep === data.passages.length - 1 ? "Finish Writing" : "Next Section →"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CefrWriting;