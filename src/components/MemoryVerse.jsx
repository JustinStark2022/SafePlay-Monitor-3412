// src/components/MemoryVerse.jsx
import React from 'react';

const MemoryVerse = () => {
  const verse = {
    text: "Children, obey your parents in the Lord, for this is right.",
    reference: "Ephesians 6:1"
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Memory Verse</h3>
      <p className="italic text-gray-700 dark:text-gray-300 mt-2">“{verse.text}”</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">— {verse.reference}</p>
    </div>
  );
};

export default MemoryVerse;