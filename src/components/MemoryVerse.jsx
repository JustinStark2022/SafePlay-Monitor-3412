// src/components/MemoryVerse.jsx
import React from 'react';

const MemoryVerse = () => {
  const verse = {
    text: "Children, obey your parents in the Lord, for this is right.",
    reference: "Ephesians 6:1"
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 w-full">
      <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">
        Memory Verse
      </h3>
      <p className="italic text-center text-lg text-gray-700 dark:text-gray-300 mt-3">
        “{verse.text}”
      </p>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
        — {verse.reference}
      </p>
    </div>
  );
};

export default MemoryVerse;
