import React from 'react';

const Listening = ({ data }) => {
  // data — bu Supabase'dan kelayotgan bitta section ma'lumoti
  // Uning ichida audio_url va questions bor
  
  return (
    <div className="listening-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* AUDIO PLAYER - GOLOS SHU YERDA */}
      <div className="audio-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <h3 style={{ marginBottom: '10px', color: '#1e293b' }}>🎧 IELTS Listening Player</h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>{data.instruction}</p>
        
        {/* Mana shu teg golosni chiqaradi */}
        <audio 
          controls 
          src={data.audio_url} 
          style={{ width: '100%', borderRadius: '8px' }}
        >
          Sizning brauzeringiz audio elementini qo'llab-quvvatlamaydi.
        </audio>
      </div>

      {/* SAVOLLAR QISMI */}
      <div className="questions-section">
        <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>Questions 1-5</h4>
        
        {data.questions && data.questions.length > 0 ? (
          data.questions.map((q) => (
            <div key={q.id} style={{ marginBottom: '25px', padding: '15px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <p style={{ fontWeight: '600', marginBottom: '10px' }}>
                {q.question_number}. {q.question_text}
              </p>
              
              {/* Variantli savollar bo'lsa (Multiple Choice) */}
              {q.options ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, index) => (
                    <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="radio" name={`q-${q.id}`} value={opt} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                /* Agar variant yo'q bo'lsa (Gap filling - Mary ______) */
                <input 
                  type="text" 
                  placeholder="Your answer..." 
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '5px', marginTop: '5px' }}
                />
              )}
            </div>
          ))
        ) : (
          <p>Savollar yuklanmadi...</p>
        )}
      </div>
    </div>
  );
};

export default Listening;