import React from 'react'

const Speaking = ({ data }) => (
  <div className="p-10 flex flex-col items-center">
    <div className="mic-icon text-6xl mb-6">🎙️</div>
    <h3 className="text-xl mb-4">{data.instruction}</h3>
    <div className="w-full max-w-lg space-y-4">
      {data.questions?.map(q => (
        <div key={q.id} className="p-4 bg-white shadow rounded border-l-4 border-green-500">
          {q.question_text}
        </div>
      ))}
    </div>
    <button className="mt-10 bg-red-500 text-white px-6 py-2 rounded-full">Start Recording</button>
  </div>
);
export default Speaking;