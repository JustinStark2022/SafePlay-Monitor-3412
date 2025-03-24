import avatarImage from '@/data/avatar.png';
import React from 'react';
import { motion } from 'framer-motion';
import {
  RiAlertFill,
  RiMessage3Line,
  RiUserAddLine,
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-600 flex flex-col justify-between p-4 h-full min-h-[300px]"
    >
      <div className="flex items-start gap-4 mb-2">
        <div className={`p-2 rounded-full ${bg}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {notification.content}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {notification.type === 'new_game' && notification.game && (
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg h-full">
            <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">{notification.game.name}</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Risk: <span className="font-bold">{notification.game.risk}</span>
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {notification.game.summary}
            </p>
            {notification.game.concerns && (
              <div className="mt-1 text-xs text-red-700 dark:text-red-300">
                <p className="font-semibold">Concerns:</p>
                <ul className="list-disc list-inside">
                  {notification.game.concerns.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {notification.type === 'chat_alert' && notification.chatContext && (
          <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg text-xs h-full">
            <p className="font-semibold text-red-800 dark:text-red-200">
              Game: {notification.chatContext.game} at {notification.chatContext.time}
            </p>
            <ul className="mt-1 space-y-1">
              {notification.chatContext.messages.map((msg, i) => (
                <li
                  key={i}
                  className={msg.flagged
                    ? 'text-red-700 dark:text-red-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400'}
                >
                  <strong>{msg.user}:</strong> {msg.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {notification.type === 'friend_request' && notification.friendRequest && (
          <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg space-y-2 text-xs h-full">
            <div className="flex items-center gap-3">
              <img
                src={avatarImage}
                alt="Friend Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
              />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  {notification.friendRequest.username}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Age: {notification.friendRequest.age} | Friends: {notification.friendRequest.mutualFriends}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-400">
              <span className="font-medium">Tip:</span> Only approve if the user is known and appropriate age.
            </p>
          </div>
        )}
      </div>

      {notification.status === 'pending' && (
        <div className="flex justify-end gap-2 pt-3">
          <Button
            onClick={() => onAction(notification.id, 'approved')}
            className="text-xs px-3 py-1 bg-green-400 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-400 rounded"
          >
            Allow
          </Button>
          <Button
            onClick={() => onAction(notification.id, 'blocked')}
            className="text-xs px-3 py-1 bg-red-400 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400 rounded"
          >
            Block
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationCard;

