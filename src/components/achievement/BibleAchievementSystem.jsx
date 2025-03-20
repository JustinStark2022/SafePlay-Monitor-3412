import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RiMedalLine, 
  RiTrophyLine, 
  RiStarLine, 
  RiHeartLine,
  RiBookLine,
  RiUserStarLine
} from 'react-icons/ri';

const BibleAchievementSystem = () => {
  const [achievements, setAchievements] = useState({
    currentLevel: 5,
    totalPoints: 1250,
    nextLevelPoints: 1500,
    recentAchievements: [
      {
        id: 1,
        title: "Scripture Scholar",
        description: "Memorized 10 Bible verses",
        icon: RiBookLine,
        date: "2024-03-15",
        points: 100,
        earned: true
      },
      {
        id: 2,
        title: "Prayer Warrior",
        description: "Maintained a 7-day prayer streak",
        icon: RiHeartLine,
        date: "2024-03-14",
        points: 75,
        earned: true
      }
    ],
    availableAchievements: [
      {
        id: 3,
        title: "Bible Explorer",
        description: "Read 5 different books of the Bible",
        icon: RiBookLine,
        points: 150,
        progress: 3,
        total: 5,
        earned: false
      },
      {
        id: 4,
        title: "Memory Master",
        description: "Score perfect on 3 verse quizzes",
        icon: RiStarLine,
        points: 200,
        progress: 1,
        total: 3,
        earned: false
      }
    ],
    rewards: [
      {
        id: 1,
        title: "Extra Gaming Time",
        description: "+30 minutes of game time",
        points: 100,
        icon: RiTrophyLine
      },
      {
        id: 2,
        title: "Special Avatar Item",
        description: "Unlock a unique shepherd's staff",
        points: 200,
        icon: RiUserStarLine
      }
    ]
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-50 rounded-full">
            <RiMedalLine className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Bible Champion</h2>
            <p className="text-sm text-gray-500">Level {achievements.currentLevel}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">{achievements.totalPoints}</p>
          <p className="text-sm text-gray-500">Total Points</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress to Level {achievements.currentLevel + 1}</span>
          <span className="text-sm text-gray-600">
            {achievements.totalPoints} / {achievements.nextLevelPoints}
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(achievements.totalPoints / achievements.nextLevelPoints) * 100}%` }}
            className="h-full bg-primary-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.recentAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 bg-success-50 p-4 rounded-lg"
              >
                <achievement.icon className="w-8 h-8 text-success-500" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-700">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
                <span className="text-success-600">+{achievement.points}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Achievements</h3>
          <div className="space-y-4">
            {achievements.availableAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <achievement.icon className="w-8 h-8 text-gray-400" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-700">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  <span className="text-gray-600">+{achievement.points}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm text-gray-500">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-primary-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <reward.icon className="w-8 h-8 text-primary-600" />
                <div>
                  <h4 className="font-semibold text-gray-700">{reward.title}</h4>
                  <p className="text-sm text-gray-500">{reward.description}</p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Redeem ({reward.points} points)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BibleAchievementSystem;