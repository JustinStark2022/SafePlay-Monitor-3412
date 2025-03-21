import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiNotificationLine, RiTimeLine, RiShieldLine, RiParentLine, RiSaveLine } from 'react-icons/ri';

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

  const saveSettings = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          {[{
            icon: RiNotificationLine,
            label: 'Notifications',
            description: 'Receive alerts about suspicious activities',
            type: 'checkbox',
            setting: 'notifications'
          }, {
            icon: RiTimeLine,
            label: 'Daily Time Limit',
            description: 'Set maximum daily gaming time (minutes)',
            type: 'number',
            setting: 'dailyLimit'
          }, {
            icon: RiShieldLine,
            label: 'Content Filtering',
            description: 'Set content filtering level',
            type: 'select',
            setting: 'contentFiltering',
            options: ['strict', 'moderate', 'low']
          }, {
            icon: RiParentLine,
            label: 'Parental Approval',
            description: 'Require approval for flagged content',
            type: 'checkbox',
            setting: 'parentalApproval'
          }].map((item, index) => (
            <motion.div
              key={item.setting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-50 rounded-full">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>

              {item.type === 'checkbox' && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings[item.setting]}
                    onChange={(e) => handleSettingChange(item.setting, e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              )}

              {item.type === 'number' && (
                <input
                  type="number"
                  value={settings[item.setting]}
                  onChange={(e) => handleSettingChange(item.setting, parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}

              {item.type === 'select' && (
                <select
                  value={settings[item.setting]}
                  onChange={(e) => handleSettingChange(item.setting, e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {item.options.map(option => (
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              )}
            </motion.div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RiSaveLine className="w-5 h-5 mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;