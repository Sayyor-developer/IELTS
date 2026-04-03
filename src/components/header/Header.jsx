import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Chiroyli modal uchun
import { HeaderContainer } from './Header.styles';
import './header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleExitClick = () => {
    Swal.fire({
      title: 'Tizimdan chiqasizmi?',
      text: "Sessiya tugatiladi va login sahifasiga qaytasiz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ha, chiqaman',
      cancelButtonText: 'Bekor qilish',
      background: '#fff',
      borderRadius: '15px'
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout(); // App.js dagi setUser(null) va sessionStorage.clear() ni ishlatadi
        navigate('/login'); // Loginga otib yuboradi
      }
    });
  };

  return (
    <HeaderContainer>
      <header className="header">
        <Link to="/" className="logo">IELTS MODE AI</Link>
        
        <nav className="nav-menu">
          {user && (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              <button className="logout-btn" onClick={handleExitClick}>
                Chiqish
              </button>
            </div>
          )}
        </nav>
      </header>
    </HeaderContainer>
  );
};

export default Header;