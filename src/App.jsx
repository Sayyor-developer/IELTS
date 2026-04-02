import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Sections from './pages/home/sections/Sections';
import Exam from './pages/home/exam/Exam';
import Result from './pages/home/exam/result/Result';
import Login from './pages/home/login/Login';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2500} />
      
      {user && <Header user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* Testga kirish uchun login shart emas */}
        <Route path="/" element={<Home />} />
        <Route path="/sections/:mode" element={<Sections />} />
        <Route path="/exams/:mode/:section" element={<Exam />} />

        {/* Login sahifasi: Agar user bo'lsa, avtomatik natijaga o'tadi */}
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/result" replace />} 
        />

        {/* NATIJA: Faqat user bo'lsa ko'rsatadi, bo'lmasa Login (Lead Form) ga otadi */}
        <Route 
          path="/result" 
          element={user ? <Result /> : <Navigate to="/login" replace />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;