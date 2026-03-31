import React from 'react'
import './header.css'
// import'./Header.styles'
import { HeaderContainer } from './Header.styles'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <HeaderContainer>

    <header className="header">
      <Link to="/" className="logo">IELTS MODE AI</Link>
      <nav>

      </nav>
    </header>
     
    </HeaderContainer>
  )
}

export default Header
