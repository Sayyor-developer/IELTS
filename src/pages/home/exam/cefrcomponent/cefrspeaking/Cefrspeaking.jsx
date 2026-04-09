import React, { useState, useEffect, useRef } from 'react';
import './cefrspeaking.css';

// CEFR Speaking namunaviy javoblar (B2/C1)
const speakingSamples = [
  {
    part: "Part 1",
    title: "Introduction",
    sample: "I currently reside in Samarkand, a city steeped in history. It's renowned for its stunning architectural heritage, like the Registan Square, but what I love most is the seamless blend of ancient traditions with a rapidly developing modern infrastructure.",
  },
  {
    part: "Part 2",
    title: "Cue Card",
    sample: "Last summer, I embarked on a journey to the Zaamin mountains by car. What rendered this trip truly memorable wasn't just the breathtaking alpine scenery, but the opportunity to disconnect from the digital world and bond with my closest friends in such a serene environment.",
  },
  {
    part: "Part 3",
    title: "Discussion",
    sample: "In my view, travel habits have undergone a radical transformation due to technological advancements. While high-speed trains have made domestic travel incredibly efficient, we must also address the environmental impact that increased tourism brings to fragile ecosystems.",
  }
];

const CefrSpeaking = ({ data, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recordings, setRecordings] = useState({});
  const [showFinalModal, setShowFinalModal] = useState(false);
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const currentTask = data.passages[currentStep];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setRecordings(prev => ({ ...prev, [currentTask.id]: URL.createObjectURL(audioBlob) }));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setTimer(0);
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } catch (err) {
      alert("Microphone access is required.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleNext = () => {
    stopRecording();
    if (currentStep < data.passages.length - 1) {
      setCurrentStep(s => s + 1);
      setTimer(0);
    } else {
      setShowFinalModal(true);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="sp-wrapper">
      <nav className="sp-header">
        <div className="sp-nav-inner">
          <span className="sp-brand">SPEAKING <b>PORTAL</b></span>
          <div className={`sp-indicator ${isRecording ? 'active' : ''}`}>
            {isRecording ? "● RECORDING" : "STANDBY"}
          </div>
        </div>
      </nav>

      <div className="sp-body">
        <div className="sp-left-panel">
          <div className="panel-content">
            <span className="sp-badge">{currentTask.part}</span>
            <h1 className="sp-title">{currentTask.title}</h1>
            
            <div className="sp-questions-box">
              {currentTask.questions ? (
                <ul className="sp-q-list">
                  {currentTask.questions.map((q, i) => (
                    <li key={i} className="sp-q-item">
                      {/* Sening so'ragan qisming: Savol raqami Step bo'yicha */}
                      <span className="q-num">{currentStep + 1}</span>
                      <p>{q}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="sp-cue-card">
                  <p>{currentTask.instruction}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sp-right-panel">
          <div className="sp-control-card">
            <div className="sp-timer-circle">
              <span className="sp-time-val">{formatTime(timer)}</span>
              <span className="sp-time-label">DURATION</span>
            </div>

            <div className="sp-action-zone">
              {!isRecording ? (
                <button className="sp-main-btn start" onClick={startRecording}>
                  <span className="btn-icon">🎤</span>
                  Start Answer
                </button>
              ) : (
                <button className="sp-main-btn stop" onClick={stopRecording}>
                  <span className="btn-icon">⏹</span>
                  Stop Answer
                </button>
              )}
            </div>

            {recordings[currentTask.id] && !isRecording && (
              <div className="sp-preview-box">
                <p>Listen back:</p>
                <audio src={recordings[currentTask.id]} controls className="sp-audio" />
              </div>
            )}

            <button className="sp-submit-btn" onClick={handleNext}>
              {currentStep === data.passages.length - 1 ? "FINISH MODULE" : "NEXT TASK →"}
            </button>
          </div>
        </div>
      </div>

      {/* FINAL MODAL */}
      {showFinalModal && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal">
            <h2>CEFR Speaking: Model Answers</h2>
            <div className="modal-scroll-area">
              {speakingSamples.map((item, index) => (
                <div key={index} className={`sample-box ${index % 2 === 0 ? 't1' : 't2'}`}>
                  <h4>{item.part}: {item.title}</h4>
                  <p className="sample-inner">"{item.sample}"</p>
                </div>
              ))}
            </div>
            <button className="finish-btn" onClick={() => onComplete(recordings)}>
              Exit and Save Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CefrSpeaking;