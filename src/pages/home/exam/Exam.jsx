import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { examData as mockData } from '../../../data/mockData';

import Reading from './component/reading/Reading';
import Listening from './component/listening/Listening';
import Speaking from './component/speaking/Speaking';
import Writing from './component/writing/Writing';

import './exam.css';

const Exam = () => {
  const { mode, section } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const sectionsOrder = useMemo(() => ['listening', 'reading', 'writing', 'speaking'], []);

  const [currentExamData, setCurrentExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);

  const currentSection = useMemo(() => section?.toLowerCase() || 'listening', [section]);
  const activeSectionIndex = useMemo(() => sectionsOrder.indexOf(currentSection), [currentSection, sectionsOrder]);

  const finishExam = useCallback(() => {
    const readingAnswers = JSON.parse(localStorage.getItem('reading_ans_session')) || {};
    const listeningAnswers = JSON.parse(localStorage.getItem('listening_ans_session')) || {};

    // Ballarni hisoblash logikasi
    const rCount = Object.keys(readingAnswers).length;
    const lCount = Object.keys(listeningAnswers).length;

    // IELTS Band Score simulyatsiyasi
    const calculateBand = (count) => {
      if (count >= 30) return 7.5;
      if (count >= 23) return 6.5;
      if (count >= 15) return 5.5;
      return 4.5;
    };

    const rScore = calculateBand(rCount);
    const lScore = calculateBand(lCount);
    const wScore = 3.0;
    const sScore = 2.5;
    const overall = Math.round(((rScore + lScore + wScore + sScore) / 4) * 2) / 2;

    const finalScores = {
      reading: rScore.toFixed(1),
      listening: lScore.toFixed(1),
      writing: wScore.toFixed(1),
      speaking: sScore.toFixed(1),
      overall: overall.toFixed(1)
    };

    localStorage.removeItem('reading_ans_session');
    localStorage.removeItem('listening_ans_session');

    // Natijaga o'tish
    navigate('/result', { state: { scores: finalScores } });
  }, [navigate]);

  const handleNextSection = useCallback(() => {
    if (activeSectionIndex < sectionsOrder.length - 1) {
      const nextSectionName = sectionsOrder[activeSectionIndex + 1];
      navigate(`/exams/${mode}/${nextSectionName}`);
      window.scrollTo(0, 0);
    } else {
      finishExam();
    }
  }, [activeSectionIndex, sectionsOrder, mode, navigate, finishExam]);

  const fetchSectionData = useCallback((sectionType) => {
    setLoading(true);
    setTimeout(() => {
      const modeData = mockData[mode?.toLowerCase()];
      const data = modeData ? modeData[sectionType] : null;
      setCurrentExamData(data);
      setLoading(false);
    }, 500);
  }, [mode]);

  useEffect(() => {
    fetchSectionData(currentSection);
    const sectionTimes = { listening: 1800, reading: 3600, writing: 3600, speaking: 840 };
    setTimeLeft(sectionTimes[currentSection] || 3600);
  }, [currentSection, fetchSectionData]);

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

  if (loading) return <div className="loader-container"><h3>Loading...</h3></div>;
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
            {activeSectionIndex < sectionsOrder.length - 1 ? 'Next Section →' : 'Finish Test'}
          </button>
        </div>
      </div>

      <div className="exam-viewport" key={location.pathname}>
        {currentSection === 'reading' && <Reading data={currentExamData} onComplete={handleNextSection} />}
        {currentSection === 'listening' && <Listening data={currentExamData} onComplete={handleNextSection} />}
        {currentSection === 'writing' && <Writing data={currentExamData} onComplete={handleNextSection} />}
        {currentSection === 'speaking' && <Speaking data={currentExamData} onComplete={handleNextSection} />}
      </div>
    </div>
  );
};

export default Exam;