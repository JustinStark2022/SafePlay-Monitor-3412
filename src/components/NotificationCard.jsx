import React from 'react';
import { motion } from 'framer-motion';
import {
  RiAlertFill,
  RiMessage3Line,
  RiUserAddLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri';
import Button from './Button';

const NotificationCard = ({ notification, onAction }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_game':
        return { icon: RiAlertFill, color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'chat_alert':
        return { icon: RiMessage3Line, color: 'text-red-600', bg: 'bg-red-100' };
      case 'friend_request':
        return { icon: RiUserAddLine, color: 'text-green-600', bg: 'bg-green-100' };
      default:
        return { icon: RiAlertFill, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const { icon: Icon, color, bg } = getNotificationIcon(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 w-full flex flex-col justify-between"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${bg}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {notification.content}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
            </div>
          </div>

          {notification.type === 'new_game' && (
            <div className="mt-2 space-y-1 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="font-semibold text-blue-800 dark:text-blue-200">{notification.game.name}</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Risk Level: <span className="font-bold">{notification.game.risk}</span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {notification.game.summary || 'No specific summary provided.'}
              </p>
              {notification.game.concerns && (
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p className="font-semibold">Concerns:</p>
                  <ul className="list-disc list-inside">
                    {notification.game.concerns.map((concern, i) => (
                      <li key={i}>{concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {notification.type === 'chat_alert' && notification.chatContext && (
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <p className="font-semibold text-red-800 dark:text-red-200">
                Game: {notification.chatContext.game} at {notification.chatContext.time}
              </p>
              <ul className="mt-2 space-y-1">
                {notification.chatContext.messages.map((msg, idx) => (
                  <li
                    key={idx}
                    className={
                      msg.flagged
                        ? 'text-sm text-red-700 dark:text-red-300 font-medium'
                        : 'text-sm text-gray-600 dark:text-gray-400'
                    }
                  >
                    <strong>{msg.user}:</strong> {msg.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notification.type === 'friend_request' && notification.friendRequest && (
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg space-y-1">
              <p className="font-semibold text-green-800 dark:text-green-200">
                Username: {notification.friendRequest.username}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Age: {notification.friendRequest.age} | Mutual Friends: {notification.friendRequest.mutualFriends}
              </p>
            </div>
          )}

          {notification.status === 'pending' && (
            <div className="flex gap-3 pt-4">
              <Button onClick={() => onAction(notification.id, 'approved')} className="bg-green-500 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400">
                <RiCheckLine className="mr-2" /> Allow
              </Button>
              <Button onClick={() => onAction(notification.id, 'blocked')} className="bg-red-500 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400">
                <RiCloseLine className="mr-2" /> Block
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

NotificationCard.defaultNotifications = [
  {
    id: 1,
    type: 'new_game',
    timestamp: 'Just now',
    content: 'Started playing "Blox Fruits"',
    status: 'pending',
    game: {
      name: 'Blox Fruits',
      summary: 'Action-adventure game with combat elements.',
      concerns: [
        'Includes in-app purchases that can encourage impulsive spending.',
        'Online chat features may expose children to strangers.',
        'Some mild fantasy violence present.'
      ],
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

export default NotificationCard;
