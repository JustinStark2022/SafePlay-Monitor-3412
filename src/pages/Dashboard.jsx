import React from 'react';
import NotificationCard from '@/components/NotificationCard';
import BiblicalPrompts from '@/components/BiblicalPrompts';
import { RiAlarmWarningLine } from 'react-icons/ri';

const Dashboard = ({ notifications }) => {
  return (
    <div className="flex flex-col w-full gap-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        {/* Left Panel - Notifications */}
        <div className="col-span-3 xl:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Active Alerts</h2>
            <div className="space-y-4">
              {notifications && notifications.length > 0 ? (
                notifications.map((n) => (
                  <NotificationCard key={n.id} notification={n} onAction={() => {}} />
                ))
              ) : (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <RiAlarmWarningLine className="w-6 h-6" />
                  No active alerts right now.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel is now removed */}
      </div>

      {/* Bottom Section - Full Width Biblical Prompts */}
      <div className="w-full">
        <BiblicalPrompts />
      </div>
    </div>
  );
};

export default Dashboard;
