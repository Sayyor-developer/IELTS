import React, { useState, useEffect, useRef } from 'react';
import './cefrreading.css';

const CefrReading = ({ data, onComplete }) => {
  // 1. Hooklar har doim eng tepada bo'lishi shart!
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const textPanelRef = useRef(null);

  // 2. useEffect shartli renderdan (if) TEPADA turishi kerak
  useEffect(() => {
    const scrollToTop = () => {
      if (textPanelRef.current) {
        textPanelRef.current.scrollTop = 0;
      }
    };
    
    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, [currentStep, data]); // Dependencyga 'data' qo'shildi

  // 3. SHARTLI RENDER (Ma'lumot yo'qligini tekshirish) ENDI SHU YERDA
  if (!data || !data.passages || !data.passages[currentStep]) {
    return <div className="loading">Loading Reading Content...</div>;
  }

  // 4. O'zgaruvchilarni endi e'lon qilamiz
  const currentPassage = data.passages[currentStep];

  const handleInputChange = (qId, value) => {
    setUserAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleNext = () => {
    if (currentStep < data.passages.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(userAnswers);
    }
  };

  return (
    <div className="reading-wrapper">
      <div className="reading-layout">
        <div className="passage-side" ref={textPanelRef}>
          <div className="passage-header">
            <p className="passage-number">READING PASSAGE {currentStep + 1}</p>
            <h1>{currentPassage.title || "Untitled"}</h1>
          </div>
          <article className="passage-text">
            {(currentPassage.text || "").split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>
        </div>

        <div className="questions-side">
          <div className="questions-container">
            {currentPassage.questions?.length > 0 && (
              <h3 className="q-instruction">
                Questions {currentPassage.questions[0]?.id} – {currentPassage.questions[currentPassage.questions.length - 1]?.id}
              </h3>
            )}
            
            {currentPassage.questions?.map((q) => (
              <div key={q.id} className="question-card">
                <div className="q-num-box">{q.id}</div>
                <div className="q-content">
                  <p className="q-text">{q.text}</p>
                  {q.options ? (
                    <div className="options-list">
                      {q.options.map((option, idx) => (
                        <label key={idx} className="option-item">
                          <input 
                            type="radio" 
                            name={`q-${q.id}`}
                            value={option.charAt(0)}
                            checked={userAnswers[q.id] === option.charAt(0)}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      className="q-input-field"
                      placeholder="Type your answer..."
                      value={userAnswers[q.id] || ""}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                    />
                  )}
                </div>
              </div>
            ))}

            <button className="control-btn next" onClick={handleNext}>
              {currentStep === data.passages.length - 1 ? "Finish and Submit" : "Next Passage →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CefrReading;