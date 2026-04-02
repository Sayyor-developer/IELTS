// IELTS Band Score jadvali (taxminiy)
const getBandScore = (correctAnswers) => {
  if (correctAnswers >= 39) return 9.0;
  if (correctAnswers >= 37) return 8.5;
  if (correctAnswers >= 35) return 8.0;
  if (correctAnswers >= 32) return 7.5;
  if (correctAnswers >= 30) return 7.0;
  if (correctAnswers >= 27) return 6.5;
  if (correctAnswers >= 23) return 6.0;
  if (correctAnswers >= 19) return 5.5;
  if (correctAnswers >= 15) return 5.0;
  return 4.0; // Minimal
};

export const calculateOverallScore = (results) => {
  // results = { reading: 25, listening: 30, writing: 6.5, speaking: 7.0 }
  const r = getBandScore(results.reading || 0);
  const l = getBandScore(results.listening || 0);
  const w = results.writing || 6.0; // Writing hozircha fix/random
  const s = results.speaking || 6.5; // Speaking hozircha fix/random

  const overall = (r + l + w + s) / 4;
  
  // IELTS qoidasi: 0.25 dan yuqori bo'lsa 0.5 ga, 0.75 dan yuqori bo'lsa butun songa yaxlitlanadi
  return {
    reading: r,
    listening: l,
    writing: w,
    speaking: s,
    overall: Math.round(overall * 2) / 2
  };
};