import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'IELTS' && password === 'ielts12345') {
      localStorage.setItem('user', JSON.stringify({ username, isLoggedIn: true }));
      toast.success("Muvaffaqiyatli kirdingiz!");
      window.location.href = "/"; 
    } else {
      toast.error("Login yoki parol xato!");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <input type="text" placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default Login;