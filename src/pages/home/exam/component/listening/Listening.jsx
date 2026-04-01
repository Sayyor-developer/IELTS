import React, { useState, useEffect, useRef } from 'react';
import './listening.css';

const Listening = ({ data, onComplete }) => {
  // data bu yerda 4 ta partdan iborat massiv bo'lishi kerak
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef(null);

  // Javoblar state'i
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(`listening_ans_session`);
    return saved ? JSON.parse(saved) : {};
  });

  const currentPart = Array.isArray(data) ? data[currentPartIndex] : data;

  // LocalStorage saqlash
  useEffect(() => {
    localStorage.setItem(`listening_ans_session`, JSON.stringify(answers));
  }, [answers]);

  // Audio tugaganda playCountni oshirish
  const handleAudioEnded = () => {
    setPlayCount(prev => prev + 1);
  };

  // Audio boshqaruvini cheklash (Faqat 2 marta eshitish)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playCount >= 2) {
      audio.pause();
      audio.src = ""; // Audio o'chiriladi
    }
  }, [playCount]);

  const handleInputChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleNextPart = () => {
    if (currentPartIndex < data.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      setPlayCount(0); // Yangi part uchun playcountni nolga tushirish
      window.scrollTo(0, 0);
    } else {
      if (onComplete) onComplete();
    }
  };

  if (!currentPart) return <div className="loader">Loading Part...</div>;

  return (
    <div className="listening-wrapper">
      {/* FIXED AUDIO BAR */}
      <div className="ielts-audio-bar">
        <div className="audio-info">
          <div className="headphone-box">🎧</div>
          <div>
            <span className="part-label">PART {currentPartIndex + 1} of 4</span>
            <h3 className="audio-title">{currentPart.title || "Academic Listening"}</h3>
          </div>
        </div>
        
        <div className="audio-player-zone">
          {playCount < 2 ? (
            <>
              <audio 
                ref={audioRef}
                controls 
                onEnded={handleAudioEnded}
                controlsList="nodownload noplaybackrate"
                onPlay={() => {
                   // Seekbar (o'tkazib yuborish) ni bloklash ixtiyoriy, lekin IELTSda kerak
                }}
                src={currentPart.audio_url}
                className="ielts-player"
              />
              <span className="play-limit">Remaining: {2 - playCount} times</span>
            </>
          ) : (
            <span className="limit-reached">⚠️ Audio limit reached</span>
          )}
        </div>
      </div>

      {/* QUESTIONS AREA */}
      <div className="ielts-questions-area">
        <div className="section-intro">
          <p className="instruction">{currentPart.instruction || "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer."}</p>
        </div>

        <div className="questions-container">
          {currentPart.questions?.sort((a, b) => a.question_number - b.question_number).map((q) => (
            <div key={q.id} className="q-row">
              <div className="q-meta">
                <span className="q-number">{q.question_number}</span>
              </div>
              
              <div className="q-body">
                <p className="q-text">{q.question_text}</p>
                
                {q.options ? (
                  <div className="options-grid">
                    {q.options.map((opt, i) => (
                      <label key={i} className={`opt-box ${answers[q.id] === opt ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name={`q-${q.id}`} 
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                        />
                        <span className="opt-char">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input 
                    type="text" 
                    className="ielts-text-input"
                    placeholder="Your answer..."
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION FOOTER */}
        <div className="listening-footer">
          <button 
            className="next-part-btn" 
            onClick={handleNextPart}
          >
            {currentPartIndex < 3 ? "Next Part →" : "Finish Listening"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listening;