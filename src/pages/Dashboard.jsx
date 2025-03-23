import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationCard from '@/components/NotificationCard';
import ScreenTimeControls from '@/components/ScreenTimeControls';
import MemoryVerse from '@/components/MemoryVerse';
import BiblicalPrompts from '@/components/BiblicalPrompts';
import defaultNotifications from '@/data/defaultNotifications';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dashboardNotifications');
    const initialNotifications = stored && JSON.parse(stored).length > 0
      ? JSON.parse(stored)
      : defaultNotifications;

    setNotifications(initialNotifications);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleAction = (id, action) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Kingdom Kids Parent Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 dark:border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <ScreenTimeControls />
        <MemoryVerse />
        <BiblicalPrompts />
      </div>

      <div className="mt-6 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Notifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full h-full flex"
              >
                <NotificationCard
                  notification={notification}
                  onAction={handleAction}
                  showAvatar={notification.type === 'friend_request'}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

