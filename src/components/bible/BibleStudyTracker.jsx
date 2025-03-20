import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBookReadLine, RiTimeLine, RiStarLine, RiMedalLine } from 'react-icons/ri';

const BibleStudyTracker = () => {
  const [studyStats, setStudyStats] = useState({
    totalMinutes: 120,
    versesMemorized: 15,
    streakDays: 7,
    lastSession: '2 hours ago',
    achievements: [
      {
        id: 1,
        title: 'Scripture Scholar',
        description: 'Memorized 10 verses',
        icon: RiStarLine,
        earned: true
      },
      {
        id: 2,
        title: 'Daily Devotion',
        description: '7-day study streak',
        icon: RiMedalLine,
        earned: true
      }
    ],
    recentActivity: [
      {
        date: '2024-03-15',
        activity: 'Memorized John 3:16',
        duration: '15 minutes',
        points: 100
      },
      {
        date: '2024-03-14',
        activity: 'Completed Daily Devotional',
        duration: '20 minutes',
        points: 50
      }
    ]
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
          <RiBookReadLine className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Bible Study Progress</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <RiTimeLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">{studyStats.totalMinutes}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Total Minutes Studied</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <RiStarLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">{studyStats.versesMemorized}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Verses Memorized</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <RiMedalLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">{studyStats.streakDays}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Day Streak</p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyStats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg"
              >
                <achievement.icon className={`w-8 h-8 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-semibold text-gray-700">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {studyStats.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-700">{activity.activity}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary-600">{activity.duration}</p>
                  <p className="text-sm text-gray-500">+{activity.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleStudyTracker;