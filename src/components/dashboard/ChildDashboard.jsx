import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBookLine, RiTimeLine, RiStarLine, RiHeartLine } from 'react-icons/ri';
import BibleReader from '../bible/BibleReader';
import DailyDevotional from '../scripture/DailyDevotional';
import MemoryVerseGame from '../scripture/MemoryVerseGame';
import InteractiveBibleStory from '../bible/InteractiveBibleStory';

const ChildDashboard = () => {
  const [stats, setStats] = useState({
    dailyTimeLeft: 180, // in minutes
    versesMemorized: 12,
    currentStreak: 7,
    totalPoints: 850,
    nextReward: {
      points: 1000,
      reward: "Golden Shepherd's Staff"
    }
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <RiTimeLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              {Math.floor(stats.dailyTimeLeft / 60)}h {stats.dailyTimeLeft % 60}m
            </span>
          </div>
          <p className="text-gray-600">Daily Time Left</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <RiBookLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              {stats.versesMemorized}
            </span>
          </div>
          <p className="text-gray-600">Verses Memorized</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <RiHeartLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              {stats.currentStreak}
            </span>
          </div>
          <p className="text-gray-600">Day Streak</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <RiStarLine className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              {stats.totalPoints}
            </span>
          </div>
          <p className="text-gray-600">Total Points</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyDevotional />
        <MemoryVerseGame />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <InteractiveBibleStory />
        <BibleReader />
      </div>
    </div>
  );
};

export default ChildDashboard;