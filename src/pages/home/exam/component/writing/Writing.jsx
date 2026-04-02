import React, { useState, useEffect } from 'react';
import './writing.css';

const Writing = ({ data, onComplete }) => {
  const tasks = Array.isArray(data) ? data : [data];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [essay, setEssay] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const currentTask = tasks[currentTaskIndex];

  // So'zlarni sanash funksiyasi
  const wordCount = essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length;

  // Har bir task o'zgarganda essayni tozalash
  useEffect(() => {
    setEssay('');
    setAnalysis(null);
  }, [currentTaskIndex]);

  // Copy-Paste ni taqiqlash
  const handlePaste = (e) => {
    e.preventDefault();
    alert("IELTS imtihonida nusxa ko'chirish taqiqlangan!");
  };

  // AI Tahlil simulyatsiyasi
  const analyzeEssay = () => {
    if (wordCount < (currentTaskIndex === 0 ? 50 : currentTaskIndex === 1 ? 80 : 120)) {
      alert("So'zlar soni yetarli emas!");
      return;
    }

    // Bu yerda simulyatsiya qilingan tahlil natijalari
    const mockAnalysis = {
      score: Math.floor(Math.random() * (9 - 5 + 1) + 5), // 5 dan 9 gacha band
      grammar: ["Check your articles (a, an, the).", "Possible subject-verb agreement error."],
      vocabulary: ["Try to use more academic synonyms.", "Repetitive use of words detected."],
      cohesion: "Good paragraph structure, but needs more transition words."
    };

    setAnalysis(mockAnalysis);
    setShowModal(true);
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      onComplete(); // Exam.jsx dagi keyingi bo'limga o'tish
    }
  };

  return (
    <div className="writing-wrapper">
      <div className="writing-container">
        {/* Chap tomon: Savol */}
        <div className="writing-question-panel">
          <span className="task-label">TASK {currentTaskIndex + 1}</span>
          <h2>{currentTask.title}</h2>
          <p className="instruction">{currentTask.instruction}</p>
          <div className="question-box">
            {currentTask.question_text}
          </div>
        </div>

        {/* O'ng tomon: Editor */}
        <div className="writing-editor-panel">
          <div className="editor-header">
            <span>Words: <strong>{wordCount}</strong></span>
            <span className="min-req">Target: {currentTaskIndex === 0 ? 50 : currentTaskIndex === 1 ? 80 : 120} words</span>
          </div>
          
          <textarea
            className="writing-textarea"
            placeholder="Start writing your essay here..."
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            onPaste={handlePaste}
            onContextMenu={(e) => e.preventDefault()} // O'ng tugmani taqiqlash
          />

          <div className="editor-footer">
            <button className="analyze-btn" onClick={analyzeEssay}>AI Feedback & Score</button>
            <button className="next-task-btn" onClick={handleNext}>
              {currentTaskIndex < tasks.length - 1 ? "Next Writing Task" : "Finish Writing"}
            </button>
          </div>
        </div>
      </div>

      {/* AI ANALYSIS MODAL */}
      {showModal && analysis && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal">
            <div className="modal-header">
              <h2>AI Performance Review</h2>
              <div className="score-badge">Estimated Band: {analysis.score}</div>
            </div>
            
            <div className="modal-content">
              <section>
                <h4>📋 Grammar & Punctuation</h4>
                <ul>{analysis.grammar.map((err, i) => <li key={i}>{err}</li>)}</ul>
              </section>
              <section>
                <h4>📚 Vocabulary & Lexical Resource</h4>
                <p>{analysis.vocabulary}</p>
              </section>
              <section>
                <h4>🔗 Cohesion & Coherence</h4>
                <p>{analysis.cohesion}</p>
              </section>
            </div>

            <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close Review</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Writing;