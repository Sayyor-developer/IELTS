import React, { useState, useMemo } from 'react';
// import { examData } from '../../../../../data/mockData'; // BU QATORNI O'CHIRAMIZ
import './reading.css';

const Reading = ({ data, onComplete }) => { // Data endi props orqali keladi
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // 1. Ma'lumotni props'dan kelgan data'dan olish (XATO SHU YERDA EDI)
  const passages = useMemo(() => {
    // Agar ota komponentdan data kelsa, o'shani ishlatamiz
    const sourceData = data || []; 
    if (sourceData.length === 0) return [];
    return [...sourceData].sort((a, b) => (a.difficulty_level || 0) - (b.difficulty_level || 0));
  }, [data]); // examData emas, data'ga bog'laymiz

  const currentPassage = passages[currentIndex];

  // 2. Matn va Sarlavhani ajratish mantiqi (O'ZGARMADI)
  const { displayTitle, displayBody } = useMemo(() => {
    if (!currentPassage) return { displayTitle: "Loading...", displayBody: "" };
    
    const rawText = currentPassage.content || currentPassage.passage_text || "";
    const title = currentPassage.title || "Reading Passage";

    if (!rawText) return { displayTitle: title, displayBody: "Matn yuklanmadi..." };

    const lines = String(rawText).split('\n').filter(line => line.trim() !== "");
    if (lines.length > 1 && lines[0].length < 100) {
      return { displayTitle: lines[0], displayBody: lines.slice(1).join('\n') };
    }
    
    return { displayTitle: title, displayBody: rawText };
  }, [currentPassage]);

  // 3. Savollar to'liqligini tekshirish (O'ZGARMADI)
  const isCurrentPassageComplete = useMemo(() => {
    const questions = currentPassage?.questions || [];
    if (questions.length === 0) return true;
    return questions.every(q => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== "");
  }, [currentPassage, selectedAnswers]);

  // 4. Global savol raqamini hisoblash (O'ZGARMADI)
  const getGlobalNumber = (idx) => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
      count += passages[i].questions?.length || 0;
    }
    return count + idx + 1;
  };

  // 5. Natijalarni hisoblash (O'ZGARMADI)
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

  // Yuklanish holati tekshiruvi
  if (passages.length === 0) return <div className="loader-container"><h3>No Reading Data Found...</h3></div>;
  if (!currentPassage) return <div className="loader-container"><h3>Loading Reading...</h3></div>;

  return (
    <div className="reading-wrapper">
      {/* DIZAYNGA TEGilmadi - Sening JSX'ing turibdi */}
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

      {/* MODAL QISMI (O'ZGARMADI) */}
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
                <p>Band Score</p>
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