import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import {
  RiAlertFill,
  RiUserAddLine,
  RiMessage3Line,
  RiCheckLine,
  RiCloseLine
} from 'react-icons/ri';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('dashboardNotifications');
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        type: 'new_game',
        timestamp: 'Just now',
        content: 'Started playing "Blox Fruits"',
        status: 'pending',
        game: {
          name: 'Blox Fruits',
          summary: 'Action-adventure game with combat elements. Some concerns about in-app purchases.',
          risk: 'MODERATE'
        }
      },
      {
        id: 2,
        type: 'chat_alert',
        timestamp: '5 minutes ago',
        content: 'Inappropriate language detected in chat',
        status: 'pending',
        chatContext: {
          game: 'Adopt Me!',
          time: '2:30 PM',
          messages: [
            { user: 'Player123', message: 'Hey, want to trade pets?' },
            { user: 'YourChild', message: 'Sure, what do you have?' },
            { user: 'Player123', message: 'Give me your password and I will give you legendary pets!', flagged: true }
          ]
        }
      },
      {
        id: 3,
        type: 'friend_request',
        timestamp: '10 minutes ago',
        content: 'New friend request received',
        status: 'pending',
        friendRequest: {
          username: 'Player456',
          age: 'Unknown',
          mutualFriends: 2
        }
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dashboardNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleAction = (id, action) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_game': return RiAlertFill;
      case 'chat_alert': return RiMessage3Line;
      case 'friend_request': return RiUserAddLine;
      default: return RiAlertFill;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 font-fun">Real-Time Monitoring</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-full text-gray-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-primary-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{notification.content}</h3>
                      <span className="text-sm text-gray-500">{notification.timestamp}</span>

                      {notification.type === 'new_game' && (
                        <div className="mt-3 bg-gray-50 p-4 rounded-xl border">
                          <h4 className="font-semibold text-gray-700">{notification.game.name}</h4>
                          <span className={`text-sm block mb-1 ${notification.game.risk === 'HIGH' ? 'text-danger-600' : 'text-yellow-600'}`}>
                            Risk Level: {notification.game.risk}
                          </span>
                          <p className="text-sm text-gray-600">{notification.game.summary}</p>
                        </div>
                      )}
                    </div>
                </div>
                  {notification.status === 'pending' && (
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      
                      <Button
                        onClick={() => handleAction(notification.id, 'approved')}
                        className="bg-green-500 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
                      >
                        <RiCheckLine className="w-5 h-5 mr-2" />
                        Allow
                      </Button>

                      <Button
                        onClick={() => handleAction(notification.id, 'blocked')}
                        className="bg-red-500 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                      >
                        <RiCloseLine className="w-5 h-5 mr-2" />
                        Block
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;