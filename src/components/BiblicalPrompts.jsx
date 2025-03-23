// src/components/BiblicalPrompts.jsx
import React from 'react';

const BiblicalPrompts = () => {
  const prompts = [
    "Why is it important to guard what we see and hear online?",
    "How can we honor God with our screen time?",
    "What would Jesus do if He saw someone being unkind in a game?",
    "Is this game helping you become more patient, kind, or joyful?",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Biblical Discussion Prompts</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
        {prompts.map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default BiblicalPrompts;