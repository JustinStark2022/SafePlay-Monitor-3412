// src/components/ScreenTimeControls.jsx
import React, { useState } from 'react';

const ScreenTimeControls = () => {
  const [screenTime, setScreenTime] = useState(2); // default 2 hours

  const addTime = () => setScreenTime(prev => prev + 1);
  const reduceTime = () => setScreenTime(prev => Math.max(prev - 1, 0));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Screen Time Settings</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Current Limit: <span className="font-semibold">{screenTime}</span> {screenTime === 1 ? 'hour' : 'hours'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={addTime}
          className="w-9 h-9 text-xl font-bold text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          aria-label="Add Time"
        >
          +
        </button>
        <button
          onClick={reduceTime}
          className="w-9 h-9 text-xl font-bold text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          aria-label="Reduce Time"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ScreenTimeControls;