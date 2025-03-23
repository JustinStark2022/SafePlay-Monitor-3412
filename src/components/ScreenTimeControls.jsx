// src/components/ScreenTimeControls.jsx
import React, { useState } from 'react';
import Button from './Button';

const ScreenTimeControls = () => {
  const [screenTime, setScreenTime] = useState(2); // default 2 hours

  const addTime = () => setScreenTime(prev => prev + 1);
  const reduceTime = () => setScreenTime(prev => Math.max(prev - 1, 0));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Screen Time Settings</h3>
      <p className="text-gray-600 dark:text-gray-300">Current Limit: {screenTime} {screenTime === 1 ? 'hour' : 'hours'}</p>
      <div className="flex gap-2">
        <Button onClick={addTime} className="bg-blue-600 hover:bg-blue-700">+1 Hour</Button>
        <Button onClick={reduceTime} className="bg-yellow-500 hover:bg-yellow-600">-1 Hour</Button>
      </div>
    </div>
  );
};

export default ScreenTimeControls;