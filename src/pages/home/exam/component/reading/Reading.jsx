import React, { useState, useMemo, useEffect } from 'react';
import './reading.css';

const Reading = ({ data, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Ma'lumotlarni qiyinchilik darajasi bo'yicha saralash
  const passages = useMemo(() => {
    const sourceData = data || [];
    return [...sourceData].sort((a, b) => (a.difficulty_level || 0) - (b.difficulty_level || 0));
  }, [data]);

  const currentPassage = passages[currentIndex];

  // Passaj o'zgarganda sahifani tepaga qaytarish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  // Javoblarni saqlash funksiyasi
  const handleAnswerChange = (qId, value) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: value }));
  };

  // Hamma savollarga javob berilganini tekshirish
  const isCurrentPassageComplete = useMemo(() => {
    const questions = currentPassage?.questions || [];
    if (questions.length === 0) return true;
    return questions.every(q => 
      selectedAnswers[q.id] !== undefined && 
      selectedAnswers[q.id].toString().trim() !== ""
    );
  }, [currentPassage, selectedAnswers]);

  // Umumiy savol raqamini hisoblash (1-40 oralig'ida)
  const getGlobalNumber = (idx) => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
      count += passages[i].questions?.length || 0;
    }
    return count + idx + 1;
  };

  // Natijalarni hisoblash
  const results = useMemo(() => {
    if (!showResult) return null;
    let correct = 0;
    let total = 0;
    const details = [];

    passages.forEach((p) => {
      const sortedQs = [...(p.questions || [])].sort((a, b) => a.question_number - b.question_number);
      sortedQs.forEach((q) => {
        total++;
        const userAns = selectedAnswers[q.id] || "";
        const isCorrect = userAns.toString().trim().toLowerCase() === q.correct_answer.toString().trim().toLowerCase();
        
        if (isCorrect) correct++;
        details.push({ 
          num: total, 
          userAnswer: userAns, 
          correctAnswer: q.correct_answer, 
          isCorrect 
        });
      });
    });

    const bandScore = total > 0 ? (Math.round((correct / total) * 9 * 10) / 10) : 0;
    return { correct, total, score: bandScore, details };
  }, [showResult, passages, selectedAnswers]);

  if (passages.length === 0) return <div className="loader">Loading Reading Section...</div>;

  return (
    <div className="ielts-reading-container">
      {/* CHAP TOMON: MATN QISMI */}
      <div className="ielts-reading-passage-pane">
        <div className="ielts-reading-passage-content">
          <div className="passage-header">
            <span className="ielts-reading-badge">Reading Passage {currentIndex + 1}</span>
          </div>
          <h1 className="ielts-reading-title">{currentPassage.title}</h1>
          <div className="ielts-reading-text-body">
            {currentPassage.passage_text?.split('\n').filter(p => p.trim() !== "").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* O'NG TOMON: SAVOLLAR QISMI */}
      <div className="ielts-reading-questions-pane">
        <div className="ielts-reading-questions-wrapper">
          <div className="ielts-reading-instruction">
            <strong>{currentPassage.instruction || "Answer the following questions"}</strong>
          </div>

          {/* LIST OF HEADINGS: Agar passajda mavjud bo'lsa ko'rsatiladi */}
          {currentPassage.list_of_headings && currentPassage.list_of_headings.length > 0 && (
            <div className="ielts-reading-headings-box">
              <h3 className="headings-title">List of Headings</h3>
              <ul className="headings-list">
                {currentPassage.list_of_headings.map((heading, hIdx) => (
                  <li key={hIdx} className="heading-item">{heading}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="ielts-reading-list">
            {[...(currentPassage.questions || [])].sort((a,b) => a.question_number - b.question_number).map((q, idx) => (
              <div key={q.id} className={`ielts-reading-q-card ${selectedAnswers[q.id] ? 'answered' : ''}`}>
                <div className="ielts-reading-q-header">
                  <span className="ielts-reading-q-num">{getGlobalNumber(idx)}</span>
                  <div className="q-text-content">{q.question_text}</div>
                </div>

                <div className="ielts-reading-answer-zone">
                  {q.options && q.options.length > 0 ? (
                    /* SELECT DROPDOWN: Agar variantlar 4 tadan ko'p bo'lsa (Headings uchun) */
                    q.options.length > 4 ? (
                      <div className="select-container">
                        <select 
                          className="ielts-reading-select"
                          value={selectedAnswers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        >
                          <option value="">Select...</option>
                          {q.options.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      /* RADIO BUTTONS: Kam variantli savollar uchun (A,B,C yoki True/False) */
                      <div className="ielts-reading-options">
                        {q.options.map((opt, i) => (
                          <label 
                            key={i} 
                            className={`ielts-reading-opt-label ${selectedAnswers[q.id] === opt ? 'checked' : ''}`}
                          >
                            <input 
                              type="radio" 
                              name={`question-${q.id}`}
                              value={opt}
                              checked={selectedAnswers[q.id] === opt}
                              onChange={() => handleAnswerChange(q.id, opt)} 
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )
                  ) : (
                    /* TEXT INPUT: Summary completion yoki qisqa javoblar uchun */
                    <input 
                      type="text" 
                      className="ielts-reading-input"
                      placeholder="Type answer..."
                      value={selectedAnswers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="ielts-reading-footer">
            {currentIndex < passages.length - 1 ? (
              <button 
                className="ielts-reading-btn next" 
                disabled={!isCurrentPassageComplete} 
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Next Passage →
              </button>
            ) : (
              <button 
                className="ielts-reading-btn finish" 
                disabled={!isCurrentPassageComplete} 
                onClick={() => setShowResult(true)}
              >
                Finish Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULT MODAL */}
      {showResult && results && (
        <div className="ielts-reading-modal">
          <div className="ielts-reading-modal-box">
             <div className="result-header">
                <h2>Test Summary</h2>
                <div className="band-circle">{results.score}</div>
                <p>{results.correct} / {results.total} correct answers</p>
             </div>
             
             <div className="ielts-reading-table-scroll">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Status</th>
                      <th>Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.details.map((item, i) => (
                      <tr key={i} className={item.isCorrect ? 'row-correct' : 'row-wrong'}>
                        <td>{item.num}</td>
                        <td>{item.isCorrect ? '✅' : '❌'}</td>
                        <td>{item.correctAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div className="modal-actions">
               <button className="close-btn" onClick={() => { setShowResult(false); if(onComplete) onComplete(); }}>
                 Finish
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading;