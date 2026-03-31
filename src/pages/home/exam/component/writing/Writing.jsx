import React from 'react'

const Writing = ({ data }) => (
  <div className="p-10">
    <div className="prompt-card bg-white p-6 shadow-md rounded mb-6">
      <h3 className="font-bold mb-2">Writing Task</h3>
      <p>{data.passage_text}</p>
    </div>
    <textarea className="w-full h-80 p-4 border-2 rounded-lg" placeholder="Start writing..." />
  </div>
);
export default Writing;