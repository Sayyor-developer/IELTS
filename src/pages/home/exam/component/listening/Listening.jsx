import React, { useState, useEffect, useRef } from 'react';
import './listening.css';

const Listening = ({ data, onComplete }) => {
  const parts = Array.isArray(data) ? data : [data];
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef(null);

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(`listening_ans_session`);
    return saved ? JSON.parse(saved) : {};
  });

  const currentPart = parts[currentPartIndex];
  const audio_url = currentPart?.audio_url?.replace('../../public', '').replace('/public', '') || "";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setPlayCount(0);
    }
  }, [currentPartIndex, audio_url]);

  useEffect(() => {
    localStorage.setItem(`listening_ans_session`, JSON.stringify(answers));
  }, [answers]);

  const handleAudioEnded = () => setPlayCount(p => p + 1);

  const handleInputChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleNextPart = () => {
    if (currentPartIndex < parts.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      if (onComplete) onComplete(answers);
    }
  };

  if (!currentPart) return <div className="loader">Part loading...</div>;

  return (
    <div className="listening-wrapper">
      <div className="ielts-audio-bar">
        <div className="audio-info">
          <div className="headphone-box">🎧</div>
          <div>
            <span className="part-label">PART {currentPartIndex + 1} of {parts.length}</span>
            <h3 className="audio-title">{currentPart.title}</h3>
          </div>
        </div>

        <div className="audio-player-zone">
          {playCount < 2 ? (
            <div className="player-container">
              <audio ref={audioRef} controls onEnded={handleAudioEnded} controlsList="nodownload" className="ielts-player">
                <source src={audio_url} type="audio/mpeg" />
              </audio>
              <span className="play-limit">Remaining: {2 - playCount} times</span>
            </div>
          ) : (
            <div className="limit-reached">⚠️ Audio limit reached</div>
          )}
        </div>
      </div>

      <div className="ielts-questions-area">
        {currentPart.instruction && <div className="instruction-text">{currentPart.instruction}</div>}
        <div className="questions-container">
          {currentPart.questions?.map((q) => (
            <div key={q.id} className="q-row">
              <div className="q-meta"><span className="q-number">{q.question_number}</span></div>
              <div className="q-body">
                <p className="q-text">{q.question_text}</p>
                <input
                  type="text"
                  className="ielts-text-input"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="listening-footer">
          <button className="next-part-btn" onClick={handleNextPart}>
            {currentPartIndex < parts.length - 1 ? "Next Part →" : "Finish Section"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listening;