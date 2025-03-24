import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationCard from '@/components/NotificationCard';
import BiblicalPrompts from '@/components/BiblicalPrompts';
import defaultNotifications from '@/data/defaultNotifications';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dashboardNotifications');
    if (!stored || JSON.parse(stored).length === 0) {
      setNotifications(defaultNotifications);
    } else {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleAction = (id, action) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="p-4 space-y-10 max-w-7xl mx-auto">
      {/* Notifications Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
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
                  buttonSize="tiny"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Biblical Prompts Section */}
      <div className="mt-12">
       
        <BiblicalPrompts useCarousel={true} />
      </div>
    </div>
  );
};

export default Dashboard;


  
 