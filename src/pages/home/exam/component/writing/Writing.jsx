import React, { useState, useEffect } from 'react';
import './writing.css';

const sampleAnswers = {
  w1: {
    title: 'Part 1: Daily Routine',
    text: "My typical day at university begins at 8:00 AM with a series of lectures focusing on computer science. As a student, my primary responsibility involves attending seminars and participating in practical coding sessions. During the afternoon, I usually dedicate three to four hours to library research or collaborative projects with my peers. Most often, I perform tasks such as debugging code, writing technical reports, and preparing presentations for my weekly assessments. In the evenings, I balance my academic life by reviewing the day's notes to ensure a thorough understanding of complex concepts.",
    score: "7.5"
  },
  w2: {
    title: 'Part 2: Global Issues',
    text: "International travel possesses a multifaceted impact on local cultures, yielding both constructive and detrimental outcomes. On the positive side, it fosters cultural exchange and provides a vital economic stimulus that can be used to preserve historical landmarks. For instance, tourism revenue often funds the restoration of heritage sites that might otherwise fall into decay. However, there is a risk of 'cultural erosion' where local traditions are commercialized to suit tourist expectations. Despite this, I believe the overall effect is positive as it promotes global understanding and mutual respect between diverse populations.",
    score: "7.5"
  },
  w3: {
    title: 'Part 3: Technology',
    text: "The debate regarding whether social media is more detrimental than beneficial to the younger generation is highly contentious. In my opinion, while there are significant risks, I disagree that it does more harm than good. Proponents of the 'harm' argument point towards issues like cyberbullying and the negative impact on mental health due to social comparison. Nevertheless, social media serves as a powerful tool for education and social connectivity. It allows teenagers to access vast amounts of information and join supportive communities that might not exist in their immediate physical surroundings.",
    score: "7.5"
  }
};

const Writing = ({ data, onComplete }) => {
  const tasks = Array.isArray(data) ? data : [data];
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [essay, setEssay] = useState('');
  const [showFinalModal, setShowFinalModal] = useState(false);

  const currentTask = tasks[currentTaskIndex];
  const wordCount = essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length;

  useEffect(() => {
    setEssay('');
  }, [currentTaskIndex]);

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  const handleFinish = () => {
    setShowFinalModal(true);
  };

  return (
    <div className="writing-wrapper">
      <div className="writing-container">
        <div className="writing-question-panel">
          <span className="task-label">TASK {currentTaskIndex + 1}</span>
          <h2>{currentTask.title}</h2>
          <p className="instruction">{currentTask.instruction}</p>
          <div className="question-box">
            {currentTask.question_text}
          </div>
        </div>

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
          />

          <div className="editor-footer">
            {currentTaskIndex < tasks.length - 1 ? (
              <button className="next-task-btn" onClick={handleNext}>Next Writing Task</button>
            ) : (
              <button className="next-task-btn" onClick={handleFinish}>Finish Writing</button>
            )}
          </div>
        </div>
      </div>

      {showFinalModal && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h2>Writing Performance Review</h2>
              <p>Review the 7.5 Band Model Answers for your tasks:</p>
            </div>

            <div className="modal-content">
              {Object.keys(sampleAnswers).map((key) => (
                <div key={key} style={{ marginBottom: '25px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>
                    {sampleAnswers[key].title}
                    <span style={{ float: 'right', background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      Band {sampleAnswers[key].score}
                    </span>
                  </h4>
                  <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                    {sampleAnswers[key].text}
                  </p>
                </div>
              ))}
            </div>

            <button className="close-modal-btn" onClick={onComplete}>Close and Finish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Writing;