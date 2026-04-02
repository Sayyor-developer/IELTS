import React, { useState, useMemo } from 'react';
import './reading.css';

const Reading = ({ data, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const passages = useMemo(() => {
    const sourceData = data || []; 
    if (sourceData.length === 0) return [];
    return [...sourceData].sort((a, b) => (a.difficulty_level || 0) - (b.difficulty_level || 0));
  }, [data]);

  const currentPassage = passages[currentIndex];

  const { displayTitle, displayBody } = useMemo(() => {
    if (!currentPassage) return { displayTitle: "Loading...", displayBody: "" };
    const rawText = currentPassage.content || currentPassage.passage_text || "";
    const title = currentPassage.title || "Reading Passage";
    const lines = String(rawText).split('\n').filter(line => line.trim() !== "");
    if (lines.length > 1 && lines[0].length < 100) {
      return { displayTitle: lines[0], displayBody: lines.slice(1).join('\n') };
    }
    return { displayTitle: title, displayBody: rawText };
  }, [currentPassage]);

  const isCurrentPassageComplete = useMemo(() => {
    const questions = currentPassage?.questions || [];
    if (questions.length === 0) return true;
    return questions.every(q => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== "");
  }, [currentPassage, selectedAnswers]);

  const getGlobalNumber = (idx) => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
      count += passages[i].questions?.length || 0;
    }
    return count + idx + 1;
  };

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
        details.push({ num: total, userAnswer: userAns || "Not Answered", correctAnswer: q.correct_answer, isCorrect });
      });
    });
    return { correct, total, score: total > 0 ? (Math.round((correct / total) * 9 * 10) / 10) : 0, details };
  }, [showResult, passages, selectedAnswers]);

  if (passages.length === 0) return <div className="ielts-reading-loader"><h3>No Data...</h3></div>;

  return (
    <div className="ielts-reading-container">
      <div className="ielts-reading-passage-pane">
        <div className="ielts-reading-passage-content">
          <span className="ielts-reading-badge">Passage {currentIndex + 1} of {passages.length}</span>
          <h1 className="ielts-reading-title">{displayTitle}</h1>
          <div className="ielts-reading-text-body">{displayBody}</div>
        </div>
      </div>

      <div className="ielts-reading-questions-pane">
        <div className="ielts-reading-questions-wrapper">
          <div className="ielts-reading-instruction">{currentPassage.instruction || "Answer all questions"}</div>

          <div className="ielts-reading-list">
            {(currentPassage.questions || []).sort((a, b) => a.question_number - b.question_number).map((q, idx) => (
              <div key={q.id} className={`ielts-reading-q-card ${selectedAnswers[q.id] ? 'ielts-reading-q-selected' : ''}`}>
                <div className="ielts-reading-q-header">
                  <span className="ielts-reading-q-num">{getGlobalNumber(idx)}</span>
                  <p>{q.question_text}</p>
                </div>
                <div className="ielts-reading-options">
                  {q.options?.map((opt, i) => (
                    <label key={i} className={`ielts-reading-opt-label ${selectedAnswers[q.id] === opt ? 'ielts-reading-opt-checked' : ''}`}>
                      <input type="radio" onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })} checked={selectedAnswers[q.id] === opt} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="ielts-reading-footer">
            {currentIndex < passages.length - 1 ? (
              <button className="ielts-reading-btn ielts-reading-btn-next" disabled={!isCurrentPassageComplete} onClick={() => setCurrentIndex(prev => prev + 1)}>
                {isCurrentPassageComplete ? "Next Passage →" : "Answer all to continue"}
              </button>
            ) : (
              <button className="ielts-reading-btn ielts-reading-btn-finish" disabled={!isCurrentPassageComplete} onClick={() => setShowResult(true)}>
                Finish Section
              </button>
            )}
          </div>
        </div>
      </div>

      {showResult && results && (
        <div className="ielts-reading-modal">
          <div className="ielts-reading-modal-box">
            <h2>Results: {results.score} Band</h2>
            <div className="ielts-reading-table-scroll">
               <table className="ielts-reading-table">
                  <thead><tr><th>#</th><th>Status</th><th>Correct</th></tr></thead>
                  <tbody>
                    {results.details.map((item, i) => (
                      <tr key={i} className={item.isCorrect ? 'ielts-reading-row-ok' : 'ielts-reading-row-no'}>
                        <td>{item.num}</td>
                        <td>{item.isCorrect ? '✅' : '❌'}</td>
                        <td>{item.correctAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
            <button className="ielts-reading-btn-close" onClick={() => setShowResult(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading;