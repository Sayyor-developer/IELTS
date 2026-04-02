import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // To'g'ri login va parol
    if (username === 'IELTS' && password === 'ielts12345') {
      const userData = {
        id: Date.now(),
        username: username,
        isLoggedIn: true
      };

      // 1. Ma'lumotni xotiraga yozamiz
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success("Welcome back, IELTS Master!");
      
      // 2. Sahifani refresh qilib asosiy sahifaga o'tamiz. 
      // Bu App.js dagi 'user' state-ini yangilanishini kafolatlaydi.
      window.location.href = "/";
    } else {
      toast.error("Xato! Login: IELTS, Parol: ielts12345");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animated-fade-in">
        <div className="login-header">
          <div className="logo-circle">A</div>
          <h1><span>IELTS</span> mode</h1>
          <p>Master your skills with our platform</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-field">
            <label htmlFor="user-login">Login</label>
            <input 
              id="user-login"
              type="text" 
              placeholder="Enter your login" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              autoComplete="username"
            />
          </div>

          <div className="input-field">
            <label htmlFor="user-pass">Password</label>
            <input 
              id="user-pass"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Login & Continue
          </button>
        </form>

        <div className="login-footer">
          <p>Login: <b>IELTS</b> | Pass: <b>ielts12345</b></p>
        </div>
      </div>
    </div>
  );
};

export default Login;