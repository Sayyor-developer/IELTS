// IELTS Band Score jadvali (Siz bergan mantiq)
const getIELTSBand = (correct) => {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 32) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  return 4.0;
};

// CEFR Darajasini aniqlash (Ballar asosida)
const getCEFRLevel = (total) => {
  if (total >= 85) return "C1 (Expert)";
  if (total >= 60) return "B2 (Upper-Intermediate)";
  if (total >= 40) return "B1 (Intermediate)";
  return "A2 (Pre-Intermediate)";
};

export const calculateFinalResults = (results, mode = 'IELTS') => {
  if (mode === 'IELTS') {
    const r = getIELTSBand(results.reading || 0);
    const l = getIELTSBand(results.listening || 0);
    const w = parseFloat(results.writing || 6.0);
    const s = parseFloat(results.speaking || 6.5);
    
    const average = (r + l + w + s) / 4;
    const overall = Math.round(average * 2) / 2; // 0.25 -> 0.5 yaxlitlash

    return {
      type: 'IELTS',
      scores: { reading: r, listening: l, writing: w, speaking: s },
      overall: overall.toFixed(1)
    };
  } else {
    // CEFR rejimi (Ballar yig'indisi)
    const total = (results.reading || 0) + (results.listening || 0) + (results.writing || 0) + (results.speaking || 0);
    return {
      type: 'CEFR',
      totalScore: total,
      level: getCEFRLevel(total)
    };
  }
};