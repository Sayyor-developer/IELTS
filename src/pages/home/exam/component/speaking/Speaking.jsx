import React, { useState, useRef, useCallback, useEffect } from 'react';
import './speaking.css';

// Ikonkalar (SVG ko'rinishida, qo'shimcha library shart emas)
const MicIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>;
const StopIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>;
const PlayIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>;

const Speaking = ({ data, onComplete }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const [permissionError, setPermissionError] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null); // Streamni ref-da saqlaymiz

  const currentPart = data && Array.isArray(data) ? data[currentPartIndex] : null;

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

  // Mikrofon oqimini to'xtatish (toza yopish)
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startRecording = async () => {
    try {
      setPermissionError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // Streamni saqlab qo'yamiz
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        stopStream(); // Yozib bo'lingach mikrofonni o'chiramiz
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTimer();
    } catch (err) {
      setPermissionError(true);
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  // Komponent o'chganda (unmount) hammasini tozalash
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
    if (currentPartIndex < data.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      setAudioUrl(null);
      setRecordTime(0);
    } else {
      onComplete();
    }
  };

  if (!data || data.length === 0) return (
    <div className="speaking-error-container">
      <h3>IELTS Speaking data is missing.</h3>
      <p>Please check your ieltsData.js file.</p>
    </div>
  );

  if (!currentPart) return <div className="speaking-loading">Loading Part...</div>;

  return (
    <div className="speaking-main-layout">
      {/* CHAP TOMON: QISM VA SAVOLLAR */}
      <div className="speaking-content-pane">
        <div className="speaking-card">
          <div className="card-header">
            <span className="part-indicator">PART {currentPartIndex + 1} / {data.length}</span>
            <h1 className="part-title">{currentPart.title || "Speaking Task"}</h1>
          </div>
          
          <div className="card-body">
            {currentPart.instruction && (
              <p className="instruction-text">{currentPart.instruction}</p>
            )}

            {currentPart.questions && (
              <div className="questions-list">
                {currentPart.questions.map((q, i) => (
                  <div key={i} className="question-item">
                    <span className="q-number">{i + 1}</span>
                    <p>{q}</p>
                  </div>
                ))}
              </div>
            )}

            {currentPart.points && (
              <div className="cue-card-box">
                <h4>Describe a beautiful place you have visited.</h4>
                <p>You should say:</p>
                <ul>
                  {currentPart.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <p className="cue-card-note">Explain why you think it is beautiful.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* O'NG TOMON: REKORDER VA NAVIGATSIYA */}
      <div className="speaking-control-pane">
        <div className="control-panel-card">
          <h3>Your Answer</h3>
          
          <div className="recorder-display">
            <div className={`status-dot ${isRecording ? 'active' : ''}`}></div>
            <span className="timer-text">{formatTime(recordTime)}</span>
            {isRecording && <span className="rec-text">REC</span>}
          </div>

          <div className="action-buttons">
            {!isRecording ? (
              <button className="btn-rec-start" onClick={startRecording}>
                <MicIcon /> Record
              </button>
            ) : (
              <button className="btn-rec-stop" onClick={stopRecording}>
                <StopIcon /> Stop
              </button>
            )}
          </div>

          {permissionError && (
            <p className="mic-error">⚠️ Microphone access denied. Please check browser permissions.</p>
          )}

          {audioUrl && !isRecording && (
            <div className="audio-preview-section">
              <div className="preview-header">
                <PlayIcon />
                <span>Listen back</span>
              </div>
              <audio src={audioUrl} controls className="styled-audio-player" />
            </div>
          )}

          <div className="navigation-section">
            <button className="btn-next" onClick={handleNextPart}>
              {currentPartIndex < data.length - 1 ? "Next Part →" : "Finish Section ✔"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking;