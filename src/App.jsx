import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FloatButton, Modal, QRCode } from 'antd'; // AntD komponentlari
import { QrcodeOutlined } from '@ant-design/icons'; // QR kod belgisi
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
      const saved = sessionStorage.getItem('user'); 
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // QR Kod modalini boshqarish uchun state
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2500} />
      
      {user && <Header user={user} onLogout={handleLogout} />}
      
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />} 
        />

        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/sections/:mode" element={user ? <Sections /> : <Navigate to="/login" replace />} />
        <Route path="/exams/:mode/:section" element={user ? <Exam /> : <Navigate to="/login" replace />} />
        <Route path="/result" element={user ? <Result /> : <Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>

      {/* Faqat foydalanuvchi kirgan bo'lsa, ekranning chetida QR kod tugmasi chiqadi */}
      {user && (
        <>
          <FloatButton
            icon={<QrcodeOutlined />}
            type="primary"
            style={{ right: 24, bottom: 24 }}
            onClick={() => setIsQRModalOpen(true)}
            tooltip={<div>Share QR Code</div>}
          />
          
          <Modal
            title="IELTS MODE AI - QR Code"
            open={isQRModalOpen}
            onOk={() => setIsQRModalOpen(false)}
            onCancel={() => setIsQRModalOpen(false)}
            footer={null}
            centered
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
              <QRCode 
                value="https://ielts-olive-three.vercel.app" 
                size={250}
                color="#1677ff"
                status="active"
              />
              <p style={{ textAlign: 'center', color: '#666' }}>
                Mobil qurilma orqali skanerlang va mashqlarni davom ettiring!
              </p>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;