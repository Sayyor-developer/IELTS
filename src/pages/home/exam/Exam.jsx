import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); 

  const fetchRandomExam = useCallback(async () => {
    setLoading(true);
    try {
      const getRandomPassage = async (level) => {
        const { data, error } = await supabase
          .from('exam_sections')
          .select(`
            *,
            exams!inner(type),
            questions!section_id(*)
          `)
          .eq('exams.type', mode)
          .eq('section_type', section?.toLowerCase())
          .eq('difficulty_level', level);

        if (error) throw error;
        if (!data || data.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
      };

      const [p1, p2, p3] = await Promise.all([
        getRandomPassage(1),
        getRandomPassage(2),
        getRandomPassage(3)
      ]);

      const finalPassages = [p1, p2, p3].filter(p => p !== null);
      setExamData(finalPassages.length > 0 ? finalPassages : null);

    } catch (err) {
      console.error("IELTS tizimi xatosi:", err.message);
    } finally {
      setLoading(false);
    }
  }, [mode, section]);

  useEffect(() => {
    fetchRandomExam();
  }, [fetchRandomExam]);

  useEffect(() => {
    if (!loading && examData && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [loading, examData, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="loader-container"><h3>Atmosfera tayyorlanmoqda...</h3></div>;

  if (!examData) return (
    <div className="no-data">
      <h3>Hozircha bazada yetarli savollar yo'q.</h3>
      <button onClick={() => navigate(-1)}>Orqaga</button>
    </div>
  );

  return (
    <div className="exam-layout-wrapper">
      <div className="exam-top-bar">
        <div className="left-side">
          <button className="exit-btn" onClick={() => navigate(-1)}>← Exit</button>
          <span className="exam-tag">{mode} {section?.toUpperCase()}</span>
        </div>
        <div className="center-timer">
          <span className={`time-left ${timeLeft < 300 ? 'warning' : ''}`}>
            Time Left: {formatTime(timeLeft)}
          </span>   
        </div>
        <div className="right-side">
          <button className="submit-btn" onClick={() => alert("Test yakunlandi!")}>Finish Test</button>
        </div>
      </div>

      <div className="exam-viewport">
        {section === 'reading' && <Reading data={examData} />}
        {section === 'listening' && <Listening data={examData} />}
        {section === 'writing' && <Writing data={examData} />}
        {section === 'speaking' && <Speaking data={examData} />}
      </div>
    </div>
  );
};

export default Exam;