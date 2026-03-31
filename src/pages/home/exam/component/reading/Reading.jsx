import React, { useState, useMemo } from 'react';

const Reading = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const passages = useMemo(() => {
    const dataArray = Array.isArray(data) ? data : [data];
    return [...dataArray].sort((a, b) => (a.difficulty_level || 0) - (b.difficulty_level || 0));
  }, [data]);

  const currentPassage = passages[currentIndex];

  // MATNNI SARLAVHA VA TANAGA AJRATISH LOGIKASI
  const { displayTitle, displayBody } = useMemo(() => {
    if (!currentPassage?.passage_text) return { displayTitle: "Reading Passage", displayBody: "" };
    
    // Matnni qatorlarga bo'lamiz
    const lines = currentPassage.passage_text.split('\n').filter(line => line.trim() !== "");
    
    // Agar birinchi qator sarlavhaga o'xshash bo'lsa (masalan 100 belgidan kam)
    if (lines.length > 1 && lines[0].length < 100) {
      return {
        displayTitle: lines[0],
        displayBody: lines.slice(1).join('\n')
      };
    }
    
    // Agar title bazada bo'lsa o'shani ishlatamiz
    return {
      displayTitle: currentPassage.title || "Reading Passage " + (currentIndex + 1),
      displayBody: currentPassage.passage_text
    };
  }, [currentPassage, currentIndex]);

  const isPassageComplete = () => {
    if (!currentPassage?.questions) return false;
    return currentPassage.questions.every(q => selectedAnswers[q.id]);
  };

  const handleNext = () => {
    if (isPassageComplete()) {
      if (currentIndex < passages.length - 1) {
        setCurrentIndex(prev => prev + 1);
        const pScroll = document.getElementById('passage-scroll');
        const qScroll = document.getElementById('questions-scroll');
        if (pScroll) pScroll.scrollTop = 0;
        if (qScroll) qScroll.scrollTop = 0;
      }
    } else {
      alert("Please answer all questions to proceed!");
    }
  };

  if (!currentPassage) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="reading-wrapper" style={{ display: 'flex', height: 'calc(100vh - 70px)', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      
      {/* CHAP TOMON: READING PASSAGE */}
      <div id="passage-scroll" className="passage-pane" style={{ flex: '1', backgroundColor: '#ffffff', padding: '40px 60px', overflowY: 'auto', borderRight: '2px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
            Passage {currentIndex + 1} of {passages.length}
          </span>
          
          {/* Dinamik Sarlavha */}
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginTop: '15px', marginBottom: '25px', lineHeight: '1.2' }}>
            {displayTitle}
          </h1>

          {/* Dinamik Matn Tanasi */}
          <div style={{ 
            fontSize: '18px', 
            lineHeight: '1.8', 
            color: '#334155', 
            textAlign: 'justify',
            whiteSpace: 'pre-wrap' 
          }}>
            {displayBody}
          </div>
        </div>
      </div>

      {/* O'NG TOMON: QUESTIONS (Dizaynga tegmadim) */}
      <div id="questions-scroll" className="questions-pane" style={{ flex: '1', padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '650px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #3b82f6', marginBottom: '30px' }}>
            <h4 style={{ margin: 0 }}>{currentPassage.instruction || "Answer the questions below"}</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentPassage.questions?.sort((a, b) => a.question_number - b.question_number).map((q, idx) => {
              const globalNumber = (currentIndex * 10) + idx + 1;
              return (
                <div key={q.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', border: selectedAnswers[q.id] ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '18px' }}>
                    <span style={{ minWidth: '32px', height: '32px', backgroundColor: selectedAnswers[q.id] ? '#3b82f6' : '#f1f5f9', color: selectedAnswers[q.id] ? '#fff' : '#475569', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                      {globalNumber}
                    </span>
                    <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '17px' }}>{q.question_text}</p>
                  </div>

                  <div style={{ display: 'grid', gap: '10px' }}>
                    {q.options?.map((opt, i) => (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: selectedAnswers[q.id] === opt ? '#eff6ff' : '#f8fafc', borderRadius: '10px', cursor: 'pointer', border: '1px solid #f1f5f9' }}>
                        <input 
                          type="radio" 
                          name={`q-${q.id}`} 
                          checked={selectedAnswers[q.id] === opt}
                          onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: '40px', paddingBottom: '40px', textAlign: 'right' }}>
            {currentIndex < passages.length - 1 ? (
              <button onClick={handleNext} style={{ backgroundColor: isPassageComplete() ? '#1e293b' : '#cbd5e1', color: '#fff', padding: '14px 40px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: isPassageComplete() ? 'pointer' : 'not-allowed' }}>
                Next Passage →
              </button>
            ) : (
              <button onClick={() => alert("Test Completed!")} style={{ backgroundColor: '#22c55e', color: '#fff', padding: '14px 40px', borderRadius: '10px', border: 'none', fontWeight: '700' }}>
                Finish Section
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading;