import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './cefrspeaking.css';

// CEFR Darajasini aniqlash mantiqi
const getCEFRLevel = (total) => {
  if (total >= 85) return "C1 (Expert)";
  if (total >= 60) return "B2 (Upper-Intermediate)";
  if (total >= 40) return "B1 (Intermediate)";
  return "A2 (Pre-Intermediate)";
};

// CEFR Speaking namunaviy javoblar
const speakingSamples = [
  {
    part: "Part 1",
    title: "Introduction & Social Interaction",
    sample: "I currently reside in Samarkand, a city steeped in history and culture. It's renowned globally for its stunning architectural heritage, like the Registan Square. However, what I personally love most is the seamless blend of ancient traditions with a rapidly developing modern infrastructure, which makes life here both convenient and culturally rich.",
  },
  {
    part: "Part 2",
    title: "Cue Card / Individual Long Turn",
    sample: "Last summer, I embarked on a journey to the Zaamin mountains by car with a group of close friends. What rendered this trip truly memorable wasn't just the breathtaking alpine scenery and the fresh mountain air, but the rare opportunity to completely disconnect from the digital world. We spent our evenings around a campfire, sharing stories and bonding in such a serene environment, which was a refreshing escape from city life.",
  },
  {
    part: "Part 3",
    title: "Discussion / Thematic Analysis",
    sample: "In my view, global travel habits have undergone a radical transformation due to rapid technological advancements. While high-speed trains and affordable air travel have made domestic and international tourism incredibly efficient, we must also critically address the environmental impact. Increased foot traffic in fragile ecosystems often leads to degradation, so promoting sustainable and eco-friendly tourism is no longer optional—it's a necessity.",
  }
];

// Lead Form Komponenti (Update qilingan)
const LeadForm = ({ onSubmit, userData, setUserData }) => (
  <div className="lead-modal-overlay">
    <div className="lead-modal">
      <div className="lead-header">
        <h2>Imtihonni Yakunlash</h2>
        <p>Ma'lumotlaringizni kiriting va barcha bo'limlar bo'yicha umumiy ballni hisoblang:</p>
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
          <label>Imtihon turi</label>
          <select 
            value={userData.direction}
            onChange={(e) => setUserData(prev => ({...prev, direction: e.target.value}))}
            style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
          >
            <option value="">Tanlang...</option>
            <option value="CEFR">CEFR</option>
            <option value="IELTS">IELTS</option>
          </select>
        </div>
        <button type="submit" className="see-result-btn">
          Natijani Hisoblash va Yuborish 🚀
        </button>
      </form>
    </div>
  </div>
);

const CefrSpeaking = ({ data, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recordings, setRecordings] = useState({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '', direction: '' });

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const passages = data?.passages || [];
  const currentTask = passages[currentStep];

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
  }, []);

  // TELEGRAMGA TO'LIQ NATIJANI YUBORISH MANTIG'I
  const sendOverallToTelegram = async (user) => {
    const BOT_TOKEN = "8323489848:AAEHUgjshoTobamN-tIDtXi01rCeb4OXBao";
    const CHAT_ID = "8162236227";

    // Oldingi modullardan (Reading/Listening) kelgan ballarni olish
    const rCorrect = parseInt(localStorage.getItem('readingCorrect')) || 0;
    const lCorrect = parseInt(localStorage.getItem('listeningCorrect')) || 0;
    
    let resultMsg = "";

    if (user.direction === "CEFR") {
      // CEFR Ball hisoblash (taxminiy)
      const wScore = 10; // Writing balli (manual yoki static)
      const sScore = 10; // Speaking balli (manual yoki static)
      const total = rCorrect + lCorrect + wScore + sScore;

      resultMsg = `
📊 **CEFR DETAILED SCORES:**
🎧 Listening: ${lCorrect} points
📖 Reading: ${rCorrect} points
✍️ Writing: ${wScore} points
🗣 Speaking: ${sScore} points
--------------------------
💰 **Total Score:** ${total}
🏆 **ESTIMATED LEVEL:** ${getCEFRLevel(total)}`;
    } else {
      // Agar adashib IELTS rejimida CEFR topshirsa
      resultMsg = `⚠️ Diqqat: CEFR testi IELTS rejimida yuborildi. 
Ballar: L:${lCorrect}, R:${rCorrect}`;
    }

    const message = `
🌟 **YANGI CEFR FULL TEST NATIJASI**

👤 **Talaba:** ${user.name}
📞 **Tel:** ${user.phone}
📚 **Yo'nalish:** ${user.text}
📚 **Yo'nalish:** ${user.direction}
${resultMsg}
--------------------------
📅 **Sana:** ${new Date().toLocaleString()}
💻 **Tizim:** CEFR MODE
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

  useEffect(() => { return () => { stopTimer(); stopStream(); }; }, [stopTimer, stopStream]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.current.push(e.data); };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordings(prev => ({ ...prev, [currentTask.id]: url }));
        stopStream();
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setTimer(0);
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } catch (err) { toast.error("Mikrofonga ruxsat berilmadi!"); }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  }, [isRecording, stopTimer]);

  const handleNext = () => {
    stopRecording();
    if (currentStep < passages.length - 1) {
      setCurrentStep(s => s + 1);
      setTimer(0);
    } else {
      setShowFinalModal(true); 
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!userData.name.trim() || !userData.phone.trim() || !userData.text.trim() || !userData.direction) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const loadId = toast.loading("Umumiy natija hisoblanmoqda...");
    const success = await sendOverallToTelegram(userData);

    if (success) {
      toast.success("Natijalar muvaffaqiyatli yuborildi!", { id: loadId });
      setShowLeadForm(false);
      onComplete({ recordings, user: userData });
    } else {
      toast.error("Xatolik yuz berdi!", { id: loadId });
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!currentTask) return null;

  return (
    <div className="sp-wrapper">
      <Toaster position="top-center" containerStyle={{ zIndex: 999999 }} />
      
      <nav className="sp-header">
        <div className="sp-nav-inner">
          <span className="sp-brand">CEFR <b>SPEAKING</b></span>
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
                      <span className="q-num">{i + 1}</span>
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
                  <span className="btn-icon">🎤</span> Start Answer
                </button>
              ) : (
                <button className="sp-main-btn stop" onClick={stopRecording}>
                  <span className="btn-icon">⏹</span> Stop Answer
                </button>
              )}
            </div>
            {recordings[currentTask.id] && !isRecording && (
              <div className="sp-preview-box">
                <audio src={recordings[currentTask.id]} controls className="sp-audio" />
              </div>
            )}
            <button className="sp-submit-btn" onClick={handleNext}>
              {currentStep === passages.length - 1 ? "FINISH MODULE" : "NEXT TASK →"}
            </button>
          </div>
        </div>
      </div>

      {showFinalModal && (
        <div className="analysis-modal-overlay">
          <div className="analysis-modal" style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2>CEFR Speaking: Model Answers</h2>
            <div className="modal-scroll-area">
              {speakingSamples.map((item, index) => (
                <div key={index} style={{padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', background: '#f8fafc'}}>
                  <h4 style={{margin: '0 0 5px 0'}}>{item.part}: {item.title}</h4>
                  <p style={{fontStyle: 'italic', color: '#334155', fontSize: '14px'}}>"{item.sample}"</p>
                </div>
              ))}
            </div>
            <button className="finish-btn" onClick={() => { setShowFinalModal(false); setShowLeadForm(true); }} style={{width: '100%', marginTop: '15px'}}>
              Barcha Sectionlar Natijasini Ko'rish
            </button>
          </div>
        </div>
      )}

      {showLeadForm && <LeadForm onSubmit={handleSubmitLead} userData={userData} setUserData={setUserData} />}
    </div>
  );
};

export default CefrSpeaking;