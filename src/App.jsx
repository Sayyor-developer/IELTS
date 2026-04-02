import React, { useState,  } from 'react'; // useEffect qo'shdik
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Sections from './pages/home/sections/Sections';
import Exam from './pages/home/exam/Exam';
import Result from './pages/home/exam/result/Result';
import Login from './pages/home/login/Login';

import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      // JSON.parse xato bermasligi uchun try-catch ichiga olish yaxshi
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData); // State yangilanganda React avtomat Navigate qiladi
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2500} />
      
      {/* Header faqat user bo'lganda chiqadi */}
      {user && <Header user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* LOGIN: Agar kirgan bo'lsa Home'ga, bo'lmasa Login'ga */}
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />} 
        />

        {/* HIMOYALANGAN SAHIFALAR */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/sections/:mode" element={user ? <Sections /> : <Navigate to="/login" replace />} />
        <Route path="/exams/:mode/:section" element={user ? <Exam /> : <Navigate to="/login" replace />} />
        <Route path="/result" element={user ? <Result /> : <Navigate to="/login" replace />} />

        {/* NOTO'G'RI LINKLAR */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;