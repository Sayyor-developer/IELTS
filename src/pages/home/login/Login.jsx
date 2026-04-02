import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Oddiy tekshiruv (buni keyinchalik Backend bo'lsa o'zgartirasan)
    if (username === 'IELTS' && password === 'ielts12345') {
      const userData = { 
        username: username, 
        role: 'student',
        loginDate: new Date().toLocaleString() 
      };

      // 1. App.js dagi setUser funksiyasini chaqiradi
      onLoginSuccess(userData); 

      toast.success("Xush kelibsiz!");
      
      // 2. Sahifani yangilamasdan Home'ga o'tkazadi
      navigate('/'); 
    } else {
      toast.error("Login yoki parol xato!");
    }
  };

  return (
    <div className="ielts-login-container">
      <div className="ielts-login-card">
        <div className="ielts-login-header">
          <h1>Tizimga kirish</h1>
          <p>Iltimos, ma'lumotlaringizni kiriting</p>
        </div>
        
        <form onSubmit={handleLogin} className="ielts-login-form">
          <div className="ielts-input-group">
            <label>Login</label>
            <input 
              type="text" 
              placeholder="IELTS" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="ielts-input-group">
            <label>Parol</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="ielts-login-submit">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;