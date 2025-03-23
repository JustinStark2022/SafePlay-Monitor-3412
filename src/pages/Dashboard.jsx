
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationCard from '@/components/NotificationCard';
import ScreenTimeControls from '@/components/ScreenTimeControls';
import MemoryVerse from '@/components/MemoryVerse';
import BiblicalPrompts from '@/components/BiblicalPrompts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('dashboardNotifications');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (notifications.length === 0) {
      const defaultNotifs = NotificationCard.defaultNotifications || [];
      setNotifications(defaultNotifs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleAction = (id, action) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Guardian Dashboard</h1>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ScreenTimeControls />
        <MemoryVerse />
        <BiblicalPrompts />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Notifications</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="h-full flex"
              >
                <NotificationCard
                  notification={notification}
                  onAction={handleAction}
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
