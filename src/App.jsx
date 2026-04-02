import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Sections from './pages/home/sections/Sections';
import Exam from './pages/home/exam/Exam';
import Result from './pages/home/exam/result/Result';
import Login from './pages/home/login/Login'; // Login sahifasini qo'shdik

function App() {
  // LocalStorage dan foydalanuvchini tekshiramiz (Supabase Auth o'rniga)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header faqat foydalanuvchi kirgan bo'lsa ko'rinishi mumkin yoki doimiy */}
      <Header user={user} />

      <Routes>
        {/* Login sahifasi */}
        <Route path="/login" element={<Login />} />

        {/* Asosiy sahifalar - Himoyalangan (Protected) */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/sections/:mode"
          element={user ? <Sections /> : <Navigate to="/login" />}
        />

        <Route
          path="/exams/:mode/:section"
          element={user ? <Exam /> : <Navigate to="/login" />}
        />
        <Route
          path="/result"
          element={user ? <Result /> : <Navigate to="/login" />}
        />

        {/* Noto'g'ri URL kiritilsa Home ga qaytaradi */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;