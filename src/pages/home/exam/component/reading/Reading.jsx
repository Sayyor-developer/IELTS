import React, { useState, useMemo, useEffect } from 'react';
import './reading.css';

const Reading = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // 1. Ma'lumotni massivga keltirish
  const passages = useMemo(() => {
    if (!data) return [];
    const dataArray = Array.isArray(data) ? data : [data];
    return [...dataArray].sort((a, b) => (a.difficulty_level || 0) - (b.difficulty_level || 0));
  }, [data]);

  const currentPassage = passages[currentIndex];

  // 2. MATNNI ANIQLASH (Xatolik tuzatilgan variant)
  const { displayTitle, displayBody } = useMemo(() => {
    if (!currentPassage) return { displayTitle: "Loading...", displayBody: "" };

    // Matnni xavfsiz olish
    const rawText = currentPassage.content || currentPassage.passage_text || currentPassage.text || "";
    const title = currentPassage.title || "Reading Passage";

    if (!rawText) {
      return { displayTitle: title, displayBody: "Matn yuklanmadi..." };
    }

    // Split qilishdan oldin text borligini yana bir bor tekshiramiz
    const safeText = String(rawText); 
    const lines = safeText.split('\n').filter(line => line.trim() !== "");

    if (lines.length > 1 && lines[0].length < 100) {
      return { displayTitle: lines[0], displayBody: lines.slice(1).join('\n') };
    }
    
    return { displayTitle: title, displayBody: safeText };
  }, [currentPassage]);

  // 3. Savollar yechilganini tekshirish
  const isCurrentPassageComplete = useMemo(() => {
    const questions = currentPassage?.questions || [];
    if (questions.length === 0) return true;
    return questions.every(
      q => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== ""
    );
  }, [currentPassage, selectedAnswers]);

  useEffect(() => {
    const pScroll = document.getElementById('passage-scroll');
    const qScroll = document.getElementById('questions-scroll');
    if (pScroll) pScroll.scrollTop = 0;
    if (qScroll) qScroll.scrollTop = 0;
  }, [currentIndex]);

  // 4. Natijalarni hisoblash (Global raqamlar bilan)
  const results = useMemo(() => {
    if (!showResult) return null;
    let correct = 0;
    let total = 0;
    const details = [];

    passages.forEach((p) => {
      const qs = p.questions || [];
      qs.sort((a, b) => a.question_number - b.question_number).forEach((q) => {
        total++;
        const userAns = selectedAnswers[q.id];
        const isCorrect = String(userAns).trim().toLowerCase() === String(q.correct_answer).trim().toLowerCase();
        if (isCorrect) correct++;
        details.push({
          num: total,
          userAnswer: userAns || "Not Answered",
          correctAnswer: q.correct_answer,
          isCorrect
        });
      });
    });

    return { 
      correct, 
      total, 
      score: total > 0 ? (Math.round((correct / total) * 9 * 10) / 10) : 0, 
      details 
    };
  }, [showResult, passages, selectedAnswers]);

  const getGlobalNumber = (idx) => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
      count += passages[i].questions?.length || 0;
    }
    return count + idx + 1;
  };

  if (!currentPassage) return <div className="loader-container"><h3>Loading Reading...</h3></div>;

  return (
    <div className="reading-wrapper">
      <div id="passage-scroll" className="passage-pane">
        <div className="passage-container">
          <span className="passage-badge">Passage {currentIndex + 1} of {passages.length}</span>
          <h1 className="passage-title">{displayTitle}</h1>
          <div className="passage-content" style={{ whiteSpace: 'pre-line' }}>
            {displayBody}
          </div>
        </div>
      </div>

      <div id="questions-scroll" className="questions-pane">
        <div className="questions-container">
          <div className="instruction-box">
            <h4>{currentPassage.instruction || "Answer the questions below"}</h4>
          </div>

          <div className="questions-list">
            {(currentPassage.questions || [])
              .sort((a, b) => a.question_number - b.question_number)
              .map((q, idx) => (
              <div key={q.id} className={`question-card ${selectedAnswers[q.id] ? 'selected' : ''}`}>
                <div className="question-header">
                  <span className={`question-number ${selectedAnswers[q.id] ? 'active' : ''}`}>
                    {getGlobalNumber(idx)}
                  </span>
                  <p className="question-text">{q.question_text}</p>
                </div>
                
                <div className="options-grid">
                  {q.options?.map((opt, i) => (
                    <label key={i} className={`option-label ${selectedAnswers[q.id] === opt ? 'checked' : ''}`}>
                      <input 
                        type="radio" 
                        name={`q-${q.id}`} 
                        checked={selectedAnswers[q.id] === opt} 
                        onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })}
                        style={{ display: 'none' }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="action-footer">
            {currentIndex < passages.length - 1 ? (
              <button 
                className={`next-btn ${!isCurrentPassageComplete ? 'btn-locked' : ''}`} 
                onClick={() => isCurrentPassageComplete && setCurrentIndex(prev => prev + 1)}
                disabled={!isCurrentPassageComplete}
              >
                {!isCurrentPassageComplete ? "Answer all to continue" : "Next Passage →"}
              </button>
            ) : (
              <button 
                className={`finish-btn ${!isCurrentPassageComplete ? 'btn-locked' : ''}`}
                onClick={() => isCurrentPassageComplete && setShowResult(true)}
                disabled={!isCurrentPassageComplete}
              >
                {!isCurrentPassageComplete ? "Complete all to finish" : "Finish Section"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showResult && results && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Reading Results</h2>
              <button className="close-x" onClick={() => setShowResult(false)}>×</button>
            </div>
            <div className="score-summary">
              <div className="score-card">
                <h3>{results.score}</h3>
                <p>IELTS Band</p>
              </div>
              <p>{results.correct} out of {results.total} correct</p>
            </div>
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr><th>#</th><th>Res</th><th>Your</th><th>Correct</th></tr>
                </thead>
                <tbody>
                  {results.details.map((item, index) => (
                    <tr key={index} className={item.isCorrect ? 'row-correct' : 'row-wrong'}>
                      <td>{item.num}</td>
                      <td>{item.isCorrect ? '✅' : '❌'}</td>
                      <td>{item.userAnswer}</td>
                      <td>{item.correctAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="retry-btn" onClick={() => window.location.reload()}>Restart Test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading;