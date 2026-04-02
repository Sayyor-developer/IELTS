import React, { useState } from 'react';
import './leadform.css';

const LeadForm = ({ onDataSubmit }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.firstName && user.lastName && user.phone) {
      onDataSubmit(user);
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
  };

  return (
    <div className="lead-overlay">
      <div className="lead-modal">
        <div className="lead-header">
          <div className="icon-box">🏆</div>
          <h2>Tabriklaymiz!</h2>
          <p>Testni muvaffaqiyatli tugatdingiz. Natijani ko'rish uchun ma'lumotlaringizni kiriting.</p>
        </div>

        <form onSubmit={handleSubmit} className="lead-form-fields">
          <div className="input-box">
            <label>Ismingiz</label>
            <input 
              name="firstName" 
              placeholder="Ism" 
              value={user.firstName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-box">
            <label>Familiyangiz</label>
            <input 
              name="lastName" 
              placeholder="Familiya" 
              value={user.lastName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-box">
            <label>Telefon raqam</label>
            <input 
              name="phone" 
              placeholder="+998" 
              value={user.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="final-btn">
            Natijani ko'rish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;