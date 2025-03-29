// src/components/ScreenTimeControls.jsx
import React, { useState } from 'react';

const ScreenTimeControls = () => {
  const [screenTime, setScreenTime] = useState(2); // default 2 hours

  const addTime = () => setScreenTime(prev => prev + 1);
  const reduceTime = () => setScreenTime(prev => Math.max(prev - 1, 0));

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-4 w-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
        Screen Time Settings
      </h3>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-gray-600 dark:text-gray-300 text-base">
          Limit: <span className="font-semibold text-primary-600 dark:text-primary-400">{screenTime}</span>{' '}
          {screenTime === 1 ? 'hour' : 'hours'}
        </p>

        <div className="flex gap-3">
          <button
            onClick={addTime}
            aria-label="Increase Time"
            className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 border border-green-300 dark:border-green-600 hover:bg-green-200 dark:hover:bg-green-700 text-green-800 dark:text-green-200 font-bold transition"
          >
            +
          </button>
          <button
            onClick={reduceTime}
            aria-label="Decrease Time"
            className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-600 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-200 font-bold transition"
          >
            -
          </button>
        </div>
      </div>

      {/* Optional visual bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary-500 h-full transition-all duration-300"
          style={{ width: `${Math.min(screenTime * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScreenTimeControls;
