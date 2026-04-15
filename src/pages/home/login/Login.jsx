import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Professional ikonkalar
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Sayyor' && password === 'sayyor12345') {
      const userData = { username, role: 'student' };
      onLoginSuccess(userData); 
      toast.success("Xush kelibsiz!");
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
          <p>IELTS platformasiga xush kelibsiz</p>
        </div>
        
        <form onSubmit={handleLogin} className="ielts-login-form">
          <div className="ielts-input-group">
            <label>Login</label>
            <input 
              type="text" 
              placeholder="Loginni kiriting" 
              autoComplete="off"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="ielts-input-group">
            <label>Parol</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Parolni kiriting" 
                autoComplete="new-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Parolni ko'rsatish"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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