import React, { useState, useRef, useCallback, useEffect } from 'react';
import './speaking.css';

// Ikonkalar
const MicIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>;
const StopIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>;
const PlayIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" style={{marginRight: '8px'}}><path fill="currentColor" d="M8 5v14l11-7z"/></svg>;

const speakingSamples = [
  {
    part: 1,
    title: "Part 1: Home Town",
    question: "What do you like about your home town?",
    sample: "What I find most appealing about my hometown is the perfect balance between its rich historical heritage and modern amenities. The city has a vibrant atmosphere where ancient monuments coexist with contemporary cafes.",
    score: "7.5"
  },
  {
    part: 2,
    title: "Part 2: Beautiful Place",
    question: "Describe a beautiful place you have visited.",
    sample: "The most stunning location I have ever explored is the Zaamin National Park. It is renowned for its untouched pine forests and dramatic canyon views. The serenity of the landscape was truly unforgettable.",
    score: "7.5"
  },
  {
    part: 3,
    title: "Part 3: Tourism & Environment",
    question: "Do you think tourism always benefits the environment?",
    sample: "In my perspective, tourism is a double-edged sword. While it provides funding for conservation, excessive foot traffic can lead to habitat destruction. Sustainable management is essential.",
    score: "8.0"
  }
];

const Speaking = ({ data, onComplete }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const tasks = Array.isArray(data) ? data : [];
  const currentPart = tasks[currentPartIndex];

  // Savolni aniqlash logikasi (Har qanday formatga mos tushadi)
  const renderQuestion = () => {
    if (!currentPart) return "";
    if (currentPart.questions && currentPart.questions.length > 0) return currentPart.questions[0];
    if (currentPart.question) return currentPart.question;
    return currentPart.instruction || "No question provided";
  };

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setRecordTime(0);
    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);
  }, [stopTimer]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        stopStream();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTimer();
    } catch (err) {
      alert("Mikrofonga ruxsat berilmadi!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      stopStream();
    };
  }, [stopTimer, stopStream]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextPart = () => {
    if (currentPartIndex < tasks.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      setAudioUrl(null);
      setRecordTime(0);
    } else {
      setShowFinalModal(true);
    }
  };

  if (!currentPart) return null;

  return (
    <div className="speaking-main-layout">
      <div className="speaking-content-pane">
        <div className="speaking-card">
          <div className="card-header">
            <span className="part-indicator">PART {currentPartIndex + 1} / {tasks.length}</span>
            <h1 className="part-title">{currentPart.title}</h1>
          </div>
          
          <div className="card-body">
            <div className="questions-list">
              <div className="question-item">
                <span className="q-number">Q</span>
                <p>{renderQuestion()}</p>
              </div>
            </div>

            {currentPart.points && (
              <div className="cue-card-box">
                <p style={{fontWeight: 'bold', marginBottom: '10px'}}>You should say:</p>
                <ul>
                  {currentPart.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="speaking-control-pane">
        <div className="control-panel-card">
          <div className="recorder-display">
            <div className={`status-dot ${isRecording ? 'active' : ''}`}></div>
            <span className="timer-text">{formatTime(recordTime)}</span>
          </div>

          <div className="action-buttons">
            {!isRecording ? (
              <button className="btn-rec-start" onClick={startRecording}><MicIcon /> Record</button>
            ) : (
              <button className="btn-rec-stop" onClick={stopRecording}><StopIcon /> Stop</button>
            )}
          </div>

          {audioUrl && !isRecording && (
            <div className="audio-preview-section">
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#64748b'}}>
                <PlayIcon /> {/* PlayIcon endi bu yerda ishlatilyapti, warning yo'q! */}
                <span style={{fontSize: '14px', fontWeight: '500'}}>Review your recording</span>
              </div>
              <audio src={audioUrl} controls className="styled-audio-player" />
            </div>
          )}

          <div className="navigation-section">
            <button className="btn-next" onClick={handleNextPart}>
              {currentPartIndex < tasks.length - 1 ? "Next Part →" : "Finish Speaking ✔"}
            </button>
          </div>
        </div>
      </div>

      {showFinalModal && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal" style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h2>Speaking Section Review</h2>
              <p>Compare your responses with these 7.5+ Band samples:</p>
            </div>
            
            <div className="modal-content">
              {speakingSamples.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
                    {item.title} 
                    <span style={{ background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: 'var(--font-size-12)' }}>Band {item.score}</span>
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-14)', color: '#64748b', fontWeight: 'var(--font-weight-700)', marginBottom: '8px' }}>Question: {item.question}</p>
                  <p style={{ fontSize: 'var(--font-size-16)', color: '#334155', fontStyle: 'italic', lineHeight: '1.6' }}>
                    "{item.sample}"
                  </p>
                </div>
              ))}
            </div>

            <button className="close-modal-btn" onClick={onComplete} style={{ width: '100%', marginTop: '10px' }}>
              Exit and View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Speaking;