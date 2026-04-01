import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

// Komponentlar
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

  // State-lar
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);

  // URL-dan hozirgi bo'limni aniqlash
  const currentSection = useMemo(() => section?.toLowerCase() || 'listening', [section]);
  const activeSectionIndex = useMemo(() => sectionsOrder.indexOf(currentSection), [currentSection, sectionsOrder]);

  const fetchSectionData = useCallback(async (sectionType) => {
    setLoading(true);
    setExamData(null); // Eski ma'lumotni tozalash
    
    try {
      const formattedMode = mode?.toUpperCase() || 'IELTS';

      const getRandomPassage = async (level) => {
        const { data, error } = await supabase
          .from('exam_sections')
          .select(`*, questions(*)`)
          .eq('section_type', sectionType)
          .eq('difficulty_level', level)
          .eq('exam_type', formattedMode); // Warning yo'qotildi, filtr ishlatildi

        if (error) throw error;
        return data && data.length > 0 ? data[Math.floor(Math.random() * data.length)] : null;
      };

      // 3 xil qiyinlikdagi passage-larni parallel yuklash
      const results = await Promise.all([
        getRandomPassage(1),
        getRandomPassage(2),
        getRandomPassage(3)
      ]);

      const finalData = results.filter(p => p !== null);
      setExamData(finalData);
    } catch (err) {
      console.error("Xatolik yuz berdi:", err.message);
      setExamData(null);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  // Bo'lim o'zgarganda (URL o'zgarganda) ishlaydi
  useEffect(() => {
    fetchSectionData(currentSection);
    
    const sectionTimes = { listening: 2400, reading: 3600, writing: 3600, speaking: 900 };
    setTimeLeft(sectionTimes[currentSection] || 3600);
  }, [currentSection, fetchSectionData]);

  // Keyingi bo'limga o'tish funksiyasi
  const handleNextSection = useCallback(() => {
    if (activeSectionIndex < sectionsOrder.length - 1) {
      const nextSectionName = sectionsOrder[activeSectionIndex + 1];
      // DIQQAT: App.js marshrutiga moslab /exams (ko'plikda) qilindi
      navigate(`/exams/${mode}/${nextSectionName}`);
      window.scrollTo(0, 0);
    } else {
      alert("Tabriklaymiz! Barcha bo'limlarni yakunladingiz.");
      navigate('/'); 
    }
  }, [activeSectionIndex, sectionsOrder, mode, navigate]);

  // Taymer mantiqi
  useEffect(() => {
    let timerId;
    if (!loading && examData && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft(p => p - 1), 1000);
    } else if (timeLeft === 0 && examData) {
      handleNextSection();
    }
    return () => clearInterval(timerId);
  }, [loading, examData, timeLeft, handleNextSection]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="loader-container"><h3>Navbatdagi bo'lim yuklanmoqda...</h3></div>;

  if (!examData || examData.length === 0) return (
    <div className="loader-container">
      <h3>Ma'lumot topilmadi ({currentSection})</h3>
      <button onClick={() => navigate('/')}>Bosh sahifaga qaytish</button>
    </div>
  );

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

      {/* MUHIM: key={location.pathname} - bo'lim almashganda komponentni yangilaydi */}
      <div className="exam-viewport" key={location.pathname}>
        {currentSection === 'reading' && <Reading data={examData} onComplete={handleNextSection} />}
        {currentSection === 'listening' && <Listening data={examData} onComplete={handleNextSection} />}
        {currentSection === 'writing' && <Writing data={examData} onComplete={handleNextSection} />}
        {currentSection === 'speaking' && <Speaking data={examData} onComplete={handleNextSection} />}
      </div>
    </div>
  );
};

export default Exam;