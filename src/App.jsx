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
      
      {/* Faqat user bo'lsa Header ko'rinadi */}
      {user && <Header user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* 1. LOGIN SAHIFASI: Agar user bo'lsa Home'ga otadi, bo'lmasa Login'ni ko'rsatadi */}
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />} 
        />

        {/* 2. HIMOYALANGAN YO'LLAR: Agar user bo'lsa sahifa ochiladi, bo'lmasa /login'ga otadi */}
        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" replace />} 
        />
        
        <Route 
          path="/sections/:mode" 
          element={user ? <Sections /> : <Navigate to="/login" replace />} 
        />
        
        <Route 
          path="/exams/:mode/:section" 
          element={user ? <Exam /> : <Navigate to="/login" replace />} 
        />

        <Route 
          path="/result" 
          element={user ? <Result /> : <Navigate to="/login" replace />} 
        />

        {/* 3. NOTO'G'RI LINKLAR: Login holatiga qarab yo'naltiradi */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;