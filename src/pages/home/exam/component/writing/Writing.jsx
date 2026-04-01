import React, { useState } from 'react';
import './writing.css';

const Writing = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [essays, setEssays] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [analysis, setAnalysis] = useState({});

  const limits = { 1: 50, 2: 80, 3: 120 };

  // So'zlarni sanash funksiyasi
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  // AI Tekshirish simulyatsiyasi
  const analyzeEssay = (text) => {
    const mistakes = { grammar: [], spelling: [], suggestions: [] };
    if (!text || text.length < 5) return mistakes;

    // Imlo xatolari (namuna)
    const typos = { 
      "becuase": "because", 
      "recieve": "receive", 
      "thier": "their", 
      "goverment": "government",
      "definately": "definitely" 
    };
    
    Object.keys(typos).forEach(word => {
      if (text.toLowerCase().includes(word)) {
        mistakes.spelling.push(`"${word}" is misspelled. Correct: "${typos[word]}"`);
      }
    });

    // Grammatika (namuna)
    if (/\b(I|you|we|they) is\b/i.test(text)) mistakes.grammar.push('Use "are" instead of "is" with plural subjects.');
    if (/\b(he|she|it) are\b/i.test(text)) mistakes.grammar.push('Use "is" instead of "are" with singular subjects.');
    if (/\ba apple\b/i.test(text)) mistakes.grammar.push('Use "an" before vowel sounds ("an apple").');

    // Takliflar
    if (text.toLowerCase().includes("very good")) mistakes.suggestions.push('Use "exceptional" or "outstanding" for better vocabulary.');
    if (text.toLowerCase().includes("think")) mistakes.suggestions.push('Try "believe" or "maintain" to sound more academic.');

    if (mistakes.grammar.length === 0 && mistakes.spelling.length === 0) {
      mistakes.suggestions.push("Overall structure is good. Keep practicing complex sentences.");
    }

    return mistakes;
  };

  if (!data || data.length === 0) return <div className="loader">Loading Writing Tasks...</div>;

  const sortedTasks = [...data].sort((a, b) => a.difficulty_level - b.difficulty_level);
  const currentTask = sortedTasks[currentStep];
  
  const currentText = essays[currentTask.id] || '';
  const wordCount = countWords(currentText);
  const minLimit = limits[currentTask.difficulty_level] || 50;
  const isLimitReached = wordCount >= minLimit;

  const handleFinish = () => {
    const results = {};
    sortedTasks.forEach(task => {
      results[task.id] = analyzeEssay(essays[task.id] || '');
    });
    setAnalysis(results);
    setShowModal(true);
  };

  const handleNextPart = () => {
    if (currentStep < sortedTasks.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleFinish();
    }
  };

  return (
    <div className="writing-wrapper">
      {/* Progress Stepper */}
      <div className="writing-progress">
        {sortedTasks.map((_, index) => (
          <div key={index} className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
            {index < currentStep ? '✓' : index + 1}
          </div>
        ))}
      </div>

      {/* Main Essay Card */}
      <div className="essay-card animated-fade-in">
        <div className="essay-info">
          <span className={`level-badge lvl-${currentTask.difficulty_level}`}>Part {currentTask.difficulty_level}</span>
          <h3>{currentTask.title}</h3>
          <p className="instruction">{currentTask.instruction}</p>
        </div>

        <div className="question-box">
          {currentTask.questions?.[0]?.question_text || "No question provided."}
        </div>

        <div className="input-area">
          <textarea
            className="essay-input"
            value={currentText}
            onChange={(e) => setEssays({ ...essays, [currentTask.id]: e.target.value })}
            placeholder="Start typing your essay here..."
          />
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="writing-action">
        <div className={`word-counter ${isLimitReached ? 'success' : 'pending'}`}>
          Words: <strong>{wordCount}</strong> / {minLimit}
        </div>
        
        <button 
          className="next-task-btn" 
          onClick={handleNextPart}
          disabled={!isLimitReached}
        >
          {currentStep < sortedTasks.length - 1 ? 'Next Task →' : 'Finish & Review'}
        </button>
      </div>

      {/* AI ANALYSIS MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="writing-modal">
            <div className="modal-header">
              <h2>AI Writing Analysis Report</h2>
              <p>Review your mistakes before moving to the next section.</p>
            </div>
            
            <div className="modal-content">
              {sortedTasks.map((task, idx) => (
                <div key={task.id} className="review-section">
                  <h4>Part {idx + 1}: {task.title}</h4>
                  <div className="review-box">
                    <p className="original-text">"{essays[task.id] || 'No content written.'}"</p>
                    <div className="analysis-results">
                      {analysis[task.id]?.grammar.map((err, i) => <p key={i} className="err red">🔴 Grammar: {err}</p>)}
                      {analysis[task.id]?.spelling.map((err, i) => <p key={i} className="err orange">🟠 Spelling: {err}</p>)}
                      {analysis[task.id]?.suggestions.map((sug, i) => <p key={i} className="err blue">🔵 Suggestion: {sug}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Writing;