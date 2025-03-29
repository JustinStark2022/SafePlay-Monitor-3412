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
        return { icon: RiAlertFill, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-950' };
      case 'chat_alert':
        return { icon: RiMessage3Line, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' };
      case 'friend_request':
        return { icon: RiUserAddLine, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' };
      default:
        return { icon: RiAlertFill, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  const { icon: Icon, color, bg } = getNotificationIcon(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      layout
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 w-full flex flex-col gap-4"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${bg}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{notification.content}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
          </div>
        </div>

        {notification.status === 'pending' && (
          <div className="flex gap-2 flex-wrap justify-end">
            <Button
              onClick={() => onAction(notification.id, 'approved')}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-400"
            >
              <RiCheckLine className="mr-1" /> Allow
            </Button>
            <Button
              onClick={() => onAction(notification.id, 'blocked')}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400"
            >
              <RiCloseLine className="mr-1" /> Block
            </Button>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="overflow-auto text-sm text-gray-700 dark:text-gray-300 space-y-3">
        {notification.type === 'new_game' && notification.game && (
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 space-y-2">
            <p className="font-semibold text-blue-800 dark:text-blue-200">{notification.game.name}</p>
            <p>
              <strong>Risk Level:</strong> {notification.game.risk}
            </p>
            <p>{notification.game.summary || 'No summary provided.'}</p>
            {notification.game.concerns?.length > 0 && (
              <div>
                <p className="font-semibold text-red-700 dark:text-red-300">Concerns:</p>
                <ul className="list-disc list-inside">
                  {notification.game.concerns.map((concern, idx) => (
                    <li key={idx}>{concern}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {notification.type === 'chat_alert' && notification.chatContext && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900 space-y-2">
            <p className="font-semibold text-red-800 dark:text-red-200">
              Game: {notification.chatContext.game} at {notification.chatContext.time}
            </p>
            <ul className="space-y-1">
              {notification.chatContext.messages.map((msg, i) => (
                <li
                  key={i}
                  className={
                    msg.flagged
                      ? 'font-medium text-red-700 dark:text-red-300'
                      : 'text-gray-600 dark:text-gray-400'
                  }
                >
                  <strong>{msg.user}:</strong> {msg.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {notification.type === 'friend_request' && notification.friendRequest && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900 space-y-1">
            <p className="font-semibold text-green-800 dark:text-green-200">
              Username: {notification.friendRequest.username}
            </p>
            <p>
              Age: {notification.friendRequest.age} | Mutual Friends: {notification.friendRequest.mutualFriends}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard;
