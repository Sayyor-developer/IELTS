import React, { useState, useRef, useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './speaking.css';

// Ikonkalar
const MicIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>;
const StopIcon = () => <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>;

// IELTS Band Score jadvali
const getIELTSBand = (correct) => {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 32) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  return 4.0;
};

// Namunaviy javoblar
const speakingSamples = [
  {
    part: 1,
    title: "Part 1: Personal Background & Hometown",
    sample: "To be honest, my hometown is a place of remarkable contrasts. What I find most intriguing is the seamless integration of historical architecture with contemporary urban infrastructure. For instance, the central district is adorned with ancient structures that have stood the test of time, yet just a stone's throw away, you'll encounter state-of-the-art skyscrapers.",
    score: "8.5"
  },
  {
    part: 2,
    title: "Part 2: A Memorable Educational Experience",
    sample: "If I were to describe a significant learning experience, I would highlight a specialized research project I undertook during my university years. The project focused on environmental sustainability, which required a high level of analytical rigor and dedication. I recall spending countless hours in the laboratory, meticulously collecting data and evaluating complex variables.",
    score: "9.0"
  },
  {
    part: 3,
    title: "Part 3: Technology and Society",
    sample: "From my perspective, the proliferation of digital technology in modern society is a double-edged sword. While it has undeniably facilitated global connectivity and democratized access to information, it has also introduced significant challenges regarding data privacy and mental well-being.",
    score: "8.5"
  }
];

// Lead Form Komponenti (Yo'nalish saqlab qolindi)
const LeadForm = ({ onSubmit, userData, setUserData }) => (
  <div className="lead-modal-overlay">
    <div className="lead-modal">
      <div className="lead-header">
        <h2>Imtihonni Yakunlash</h2>
        <p>Ma'lumotlaringizni kiriting va natijani oling:</p>
      </div>
      <form onSubmit={onSubmit} className="lead-form">
        <div className="form-group">
          <label>To'liq ismingiz</label>
          <input 
            type="text" 
            placeholder="Ismingizni kiriting"
            value={userData.name}
            onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
          />
        </div>
        <div className="form-group">
          <label>Telefon raqamingiz</label>
          <input 
            type="tel" 
            placeholder="+998XXXXXXXXX"
            maxLength={13}
            value={userData.phone}
            onChange={(e) => setUserData(prev => ({...prev, phone: e.target.value}))}
          />
        </div>
        <div className="form-group">
          <label>Yo'nalish</label>
          <input 
            type="text" 
            placeholder="Yo'nalishingizni kiriting"
            value={userData.text}
            onChange={(e) => setUserData(prev => ({...prev, text: e.target.value}))}
          />
        </div>
        <div className="form-group">
          <label>Yo'nalish</label>
          <select 
            value={userData.direction}
            onChange={(e) => setUserData(prev => ({...prev, direction: e.target.value}))}
            className="direction-select"
            style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
          >
            <option value="">Tanlang...</option>
            <option value="IELTS">IELTS</option>
            <option value="CEFR">CEFR</option>
          </select>
        </div>
        <button type="submit" className="see-result-btn">
          Natijani Yuborish 🚀
        </button>
      </form>
    </div>
  </div>
);

const Speaking = ({ data, onComplete }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '', direction: '' });
  const [recordings, setRecordings] = useState({});
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const tasks = Array.isArray(data) ? data : [];
  const currentPart = tasks[currentPartIndex];

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
  }, []);

  const sendOverallToTelegram = async (user) => {
    const BOT_TOKEN = "8323489848:AAEHUgjshoTobamN-tIDtXi01rCeb4OXBao";
    const CHAT_ID = "8162236227";

    const rCorrect = parseInt(localStorage.getItem('readingCorrect')) || 0;
    const lCorrect = parseInt(localStorage.getItem('listeningCorrect')) || 0;
    
    // IELTS mantiqi bo'yicha hisoblash
    const rBand = getIELTSBand(rCorrect);
    const lBand = getIELTSBand(lCorrect);
    const wBand = 2.0; 
    const sBand = 2.5; 
    const overall = Math.round(((rBand + lBand + wBand + sBand) / 4) * 2) / 2;

    const message = `
🌟 **YANGI TEST NATIJASI**

👤 **Talaba:** ${user.name}
📞 **Tel:** ${user.phone}
📚 **Yo'nalish:** ${user.text}
📚 **Yo'nalish:** ${user.direction}
📊 **HISOB-KITOB (IELTS Scale):**
🎧 Listening: ${lBand} (${lCorrect} correct)
📖 Reading: ${rBand} (${rCorrect} correct)
--------------------------
🏆 **OVERALL BAND: ${overall.toFixed(1)}**
--------------------------
📅 **Sana:** ${new Date().toLocaleString()}
💻 **Loyixa:** IELTS MODE
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
      });
      return response.ok;
    } catch { return false; }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecordings(prev => ({ ...prev, [currentPartIndex]: url }));
        stopStream();
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordTime(0);
      timerRef.current = setInterval(() => setRecordTime(p => p + 1), 1000);
    } catch { toast.error("Mikrofonga ruxsat berilmadi!"); }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  }, [isRecording, stopTimer]);

  useEffect(() => { return () => { stopTimer(); stopStream(); }; }, [stopTimer, stopStream]);

  const handleNextPart = () => {
    stopRecording();
    if (currentPartIndex < tasks.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      setAudioUrl(null);
      setRecordTime(0);
    } else {
      setShowFinalModal(true);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone || !userData.text || !userData.direction) {
      return toast.error("Iltimos, barcha maydonlarni to'ldiring!");
    }
    const loadId = toast.loading("Natijalar yuborilmoqda...");
    const success = await sendOverallToTelegram(userData);
    if (success) {
      toast.success("Muvaffaqiyatli yuborildi!", { id: loadId });
      setShowLeadForm(false);
      onComplete({ recordings, user: userData });
    } else {
      toast.error("Xatolik yuz berdi!", { id: loadId });
    }
  };

  if (!currentPart) return null;

  return (
    <div className="speaking-main-layout">
      <Toaster position="top-center" containerStyle={{ zIndex: 999999 }} />
      
      <div className="speaking-content-pane">
        <div className="speaking-card">
          <div className="card-header">
            <span className="part-indicator">PART {currentPartIndex + 1} / {tasks.length}</span>
            <h1 className="part-title">{currentPart.title}</h1>
          </div>
          <div className="card-body">
            <div className="question-item">
              <span className="q-number">Q</span>
              <p>{currentPart.questions?.[0] || currentPart.question || currentPart.instruction}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="speaking-control-pane">
        <div className="control-panel-card">
          <div className="recorder-display">
            <div className={`status-dot ${isRecording ? 'active' : ''}`}></div>
            <span className="timer-text">
              {Math.floor(recordTime/60)}:{(recordTime%60).toString().padStart(2,'0')}
            </span>
          </div>
          <div className="action-buttons">
            {!isRecording ? 
              <button className="btn-rec-start" onClick={startRecording}><MicIcon /> Record</button> : 
              <button className="btn-rec-stop" onClick={stopRecording}><StopIcon /> Stop</button>
            }
          </div>
          
          {audioUrl && !isRecording && (
            <div className="audio-preview-section">
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
          <div className="analysis-modal" style={{maxWidth: '700px', maxHeight: '85vh', overflowY: 'auto'}}>
            <h2 style={{marginBottom: '20px'}}>Model Answers</h2>
            <div className="samples-container">
              {speakingSamples.map((sample, idx) => (
                <div key={idx} style={{marginBottom: '15px', padding: '15px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #3b82f6'}}>
                  <h4 style={{marginBottom: '5px'}}>{sample.title}</h4>
                  <p style={{fontSize: '14px', color: '#475569', fontStyle: 'italic'}}>"{sample.sample}"</p>
                </div>
              ))}
            </div>
            <button className="finish-btn" onClick={() => { setShowFinalModal(false); setShowLeadForm(true); }} style={{width: '100%', marginTop: '10px'}}>
              Natijani Hisoblash
            </button>
          </div>
        </div>
      )}

      {showLeadForm && <LeadForm onSubmit={handleSubmitLead} userData={userData} setUserData={setUserData} />}
    </div>
  );
};

export default Speaking;