import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiNotificationLine, RiTimeLine, RiShieldLine, RiParentLine } from 'react-icons/ri';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    dailyLimit: 120,
    automaticBlocking: true,
    contentFiltering: 'strict',
    parentalApproval: true
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <RiNotificationLine className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">Receive alerts about suspicious activities</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <RiTimeLine className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Daily Time Limit</h3>
                <p className="text-sm text-gray-500">Set maximum daily gaming time (minutes)</p>
              </div>
            </div>
            <input
              type="number"
              value={settings.dailyLimit}
              onChange={(e) => handleSettingChange('dailyLimit', parseInt(e.target.value))}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <RiShieldLine className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Content Filtering</h3>
                <p className="text-sm text-gray-500">Set content filtering level</p>
              </div>
            </div>
            <select
              value={settings.contentFiltering}
              onChange={(e) => handleSettingChange('contentFiltering', e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="strict">Strict</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <RiParentLine className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Parental Approval</h3>
                <p className="text-sm text-gray-500">Require approval for flagged content</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.parentalApproval}
                onChange={(e) => handleSettingChange('parentalApproval', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;