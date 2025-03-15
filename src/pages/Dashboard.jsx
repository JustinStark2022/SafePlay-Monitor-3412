import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  RiShieldCheckLine,
  RiErrorWarningLine,
  RiTimeLine,
  RiAlertFill,
  RiUserAddLine,
  RiMessage3Line,
  RiCheckLine,
  RiCloseLine
} from 'react-icons/ri';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState([
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
  ]);

  const handleAction = (id, action) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, status: action } : notif
      )
    );
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
        <h1 className="text-2xl font-bold text-gray-800">Real-Time Monitoring</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-50 rounded-full">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {notification.content}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {notification.timestamp}
                        </span>
                      </div>

                      {notification.type === 'new_game' && (
                        <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-700">{notification.game.name}</h4>
                            <span className={`px-2 py-1 rounded text-sm ${
                              notification.game.risk === 'HIGH' ? 'bg-danger-50 text-danger-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>
                              {notification.game.risk}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{notification.game.summary}</p>
                        </div>
                      )}

                      {notification.type === 'chat_alert' && (
                        <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                          <div className="mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                              Chat from {notification.chatContext.game} at {notification.chatContext.time}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {notification.chatContext.messages.map((msg, i) => (
                              <div 
                                key={i} 
                                className={`p-2 rounded ${msg.flagged ? 'bg-danger-50' : 'bg-white'}`}
                              >
                                <span className="font-semibold text-sm">{msg.user}: </span>
                                <span className="text-sm">{msg.message}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {notification.type === 'friend_request' && (
                        <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-700">User: {notification.friendRequest.username}</h4>
                          <p className="text-sm text-gray-600">Age: {notification.friendRequest.age}</p>
                          <p className="text-sm text-gray-600">Mutual Friends: {notification.friendRequest.mutualFriends}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {notification.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(notification.id, 'approved')}
                        className="flex items-center px-3 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
                      >
                        <RiCheckLine className="w-5 h-5 mr-1" />
                        Allow
                      </button>
                      <button
                        onClick={() => handleAction(notification.id, 'blocked')}
                        className="flex items-center px-3 py-2 bg-danger-500 text-white rounded-lg hover:bg-danger-600 transition-colors"
                      >
                        <RiCloseLine className="w-5 h-5 mr-1" />
                        Block
                      </button>
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