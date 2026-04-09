import React, { useState, useEffect } from 'react';
import './cefrwriting.css';

const cefrSamples = {
  task1: {
    title: "Task 1: Personal Experience (B2 Sample)",
    sample: "Dear Sarah, I hope you're doing well. I’m writing to tell you about my incredible weekend trip to the mountains. I went to the Zaamin National Park with my family. We spent most of our time hiking through the lush pine forests and enjoying the breathtaking panoramic views from the peaks. I truly enjoyed it because the fresh mountain air was a perfect escape from the city heat, and the scenery was simply unforgettable.",
    requirement: "60+ words"
  },
  task2: {
    title: "Task 2: AI in Education (C1 Sample)",
    sample: "The integration of Artificial Intelligence in education has sparked significant debate. On the one hand, AI-powered tools provide personalized learning experiences, allowing students to grasp complex concepts at their own pace. However, there is a substantial risk that learners may become overly dependent on technology, potentially weakening their critical thinking skills. In my opinion, while AI is an invaluable resource, it should supplement rather than replace traditional teaching.",
    requirement: "100+ words"
  }
};

const CefrWriting = ({ data, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFinalModal, setShowFinalModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  if (!data || !data.passages || !data.passages[currentStep]) {
    return <div className="loading">Writing ma'lumotlari yuklanmoqda...</div>;
  }

  const currentTask = data.passages[currentStep];
  const promptLines = (currentTask.prompt || "").split('\n').filter(line => line.trim() !== "");

  const handleTextChange = (e) => {
    setAnswers(prev => ({ ...prev, [currentTask.id]: e.target.value }));
  };

  const handleNext = () => {
    if (currentStep < data.passages.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowFinalModal(true);
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
            <h1 className="task-title">{currentTask.title}</h1>
            <p className="instruction-text">{currentTask.instruction}</p>
            <div className="prompt-content">
              {promptLines.map((line, i) => <p key={i} className="prompt-line">{line}</p>)}
            </div>
          </div>
        </section>

        <section className="editor-section">
          <textarea className="writing-area" value={currentText} onChange={handleTextChange} placeholder="Write here..." />
          <div className="editor-status">
            <div className={`word-badge ${wordCount >= (currentTask.wordLimit || 0) ? 'success' : 'pending'}`}>
              Words: {wordCount} / {currentTask.wordLimit}
            </div>
          </div>
          <div className="action-area">
            <button className="next-step-btn" onClick={handleNext} disabled={wordCount < 1}>
              {currentStep === data.passages.length - 1 ? "Finish & Samples" : "Next Section →"}
            </button>
          </div>
        </section>
      </main>

      {showFinalModal && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal">
            <h2>CEFR Model Answers</h2>
            <div className="sample-box t1">
              <h4>{cefrSamples.task1.title}</h4>
              <p className="sample-inner">"{cefrSamples.task1.sample}"</p>
            </div>
            <div className="sample-box t2">
              <h4>{cefrSamples.task2.title}</h4>
              <p className="sample-inner">"{cefrSamples.task2.sample}"</p>
            </div>
            <button className="finish-btn" onClick={() => onComplete(answers)}>Exit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CefrWriting;