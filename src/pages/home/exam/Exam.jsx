import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { examData as mockData } from '../../../data/mockData';

// IELTS Komponentlari
import Reading from './component/reading/Reading';
import Listening from './component/listening/Listening';
import Speaking from './component/speaking/Speaking';
import Writing from './component/writing/Writing';

// CEFR Komponentlari
import CefrReading from './cefrcomponent/cefrreading/Cefrreading';
import CefrListening from './cefrcomponent/cefrlistening/Cefrlistening';
import CefrSpeaking from './cefrcomponent/cefrspeaking/Cefrspeaking';
import CefrWriting from './cefrcomponent/cefrwriting/Cefrwriting';

import './exam.css';

const Exam = () => {
  const { mode, section } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const sectionsOrder = useMemo(() => ['listening', 'reading', 'writing', 'speaking'], []);
  const [currentExamData, setCurrentExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);

  const currentMode = useMemo(() => mode?.toLowerCase(), [mode]);
  const currentSection = useMemo(() => section?.toLowerCase() || 'listening', [section]);
  const activeSectionIndex = sectionsOrder.indexOf(currentSection);

  // --- MATEMATIK HISOB-KITOB VA TUGATISH ---
  const finishExam = useCallback(() => {
    // Sessiondan javoblarni yig'amiz
    const readingAnswers = JSON.parse(localStorage.getItem('reading_ans_session')) || {};
    const listeningAnswers = JSON.parse(localStorage.getItem('listening_ans_session')) || {};
    
    // Javoblar sonini aniqlash (Object.keys orqali)
    const rCount = Object.keys(readingAnswers).length; 
    const lCount = Object.keys(listeningAnswers).length;

    let finalScores = {};

    if (currentMode === 'cefr') {
      // CEFR mantiqi
      const rScore = Math.min(30, rCount * 1.5);
      const lScore = Math.min(30, lCount * 1.5);
      const wScore = 10; 
      const sScore = 10; 
      const overall = Math.round(rScore + lScore + wScore + sScore);

      finalScores = {
        reading: rScore.toFixed(1),
        listening: lScore.toFixed(1),
        writing: wScore,
        speaking: sScore,
        overall: overall,
        isCefr: true
      };
    } else {
      // IELTS mantiqi (Band Score simulyatsiyasi)
      const getBand = (count) => {
        if (count >= 35) return 8.0;
        if (count >= 30) return 7.0;
        if (count >= 20) return 6.0;
        if (count >= 10) return 5.0;
        return 0;
      };

      const rScore = getBand(rCount);
      const lScore = getBand(lCount);
      const wScore = 3.0;
      const sScore = 3.0;
      const avg = (rScore + lScore + wScore + sScore) / 4;
      const overall = Math.round(avg * 2) / 2;

      finalScores = {
        reading: rScore.toFixed(1),
        listening: lScore.toFixed(1),
        writing: wScore.toFixed(1),
        speaking: sScore.toFixed(1),
        overall: overall.toFixed(1),
        isCefr: false
      };
    }

    // --- ENGI MUHIM JOYI: NATIJANI VAQTINCHA SAQLASH ---
    localStorage.setItem('temp_exam_results', JSON.stringify(finalScores));

    // Sessionni tozalash
    localStorage.removeItem('reading_ans_session');
    localStorage.removeItem('listening_ans_session');

    // Natija sahifasiga yo'naltirish
    // Agar user login qilmagan bo'lsa, App.js uni Login'ga (Lead Form) burib yuboradi
    navigate('/result', { state: { scores: finalScores } });
  }, [currentMode, navigate]);

  // --- NAVIGATSIYA ---
  const handleNextSection = useCallback(() => {
    if (activeSectionIndex < sectionsOrder.length - 1) {
      const nextSectionName = sectionsOrder[activeSectionIndex + 1];
      navigate(`/exams/${mode}/${nextSectionName}`);
      window.scrollTo(0, 0);
    } else {
      finishExam(); 
    }
  }, [activeSectionIndex, sectionsOrder, mode, navigate, finishExam]);

  // --- DATA FETCHING ---
  const fetchSectionData = useCallback(() => {
    setLoading(true);
    const modeData = mockData[currentMode];
    const data = modeData ? modeData[currentSection] : null;
    
    setCurrentExamData(data);
    setLoading(false);
  }, [currentMode, currentSection]);

  useEffect(() => {
    fetchSectionData();
    const sectionTimes = { listening: 1800, reading: 3600, writing: 3600, speaking: 840 };
    setTimeLeft(sectionTimes[currentSection] || 3600);
  }, [currentSection, fetchSectionData]);

  // --- TAYMER ---
  useEffect(() => {
    let timerId;
    if (!loading && currentExamData && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft(p => p - 1), 1000);
    } else if (timeLeft === 0 && currentExamData) {
      handleNextSection();
    }
    return () => clearInterval(timerId);
  }, [loading, currentExamData, timeLeft, handleNextSection]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="loader-container"><h3>Yuklanmoqda...</h3></div>;
  if (!currentExamData) return <div className="loader-container"><h3>Ma'lumot topilmadi.</h3></div>;

  return (
    <div className="exam-layout-wrapper">
      <div className="exam-top-bar">
        <div className="left-side">
          <button className="exit-btn" onClick={() => navigate('/')}>← Exit</button>
          <span className="exam-tag">{mode?.toUpperCase()} - {currentSection.toUpperCase()}</span>
        </div>
        <div className="center-timer">
          <span className={`time-left ${timeLeft < 300 ? 'warning' : ''}`}>
               Time: {formatTime(timeLeft)}
          </span>   
        </div>
        <div className="right-side">
          <button className="next-section-btn" onClick={handleNextSection}>
            {activeSectionIndex < 3 ? 'Next Section →' : 'Finish Test'}
          </button>
        </div>
      </div>

      <div className="exam-viewport" key={location.pathname}>
        {currentMode === 'cefr' ? (
          <>
            {currentSection === 'reading' && <CefrReading data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'listening' && <CefrListening data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'writing' && <CefrWriting data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'speaking' && <CefrSpeaking data={currentExamData} onComplete={handleNextSection} />}
          </>
        ) : (
          <>
            {currentSection === 'reading' && <Reading data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'listening' && <Listening data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'writing' && <Writing data={currentExamData} onComplete={handleNextSection} />}
            {currentSection === 'speaking' && <Speaking data={currentExamData} onComplete={handleNextSection} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;