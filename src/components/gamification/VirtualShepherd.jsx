import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiHeartLine, RiStarLine, RiShieldLine } from 'react-icons/ri';

const VirtualShepherd = () => {
  const [shepherd, setShepherd] = useState({
    name: "Guardian",
    level: 5,
    traits: ["Wise", "Protective", "Faithful"],
    achievements: [
      "Memorized 10 verses",
      "7-day streak",
      "Helped a friend"
    ],
    items: [
      "Shepherd's Staff",
      "Golden Scroll",
      "Prayer Journal"
    ]
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center">
          <RiShieldLine className="w-10 h-10 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{shepherd.name}</h2>
          <p className="text-sm text-gray-500">Level {shepherd.level} Guardian</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <RiHeartLine className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-gray-700">Traits</span>
          </div>
          <ul className="space-y-1">
            {shepherd.traits.map((trait, index) => (
              <li key={index} className="text-sm text-gray-600">{trait}</li>
            ))}
          </ul>
        </div>

        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <RiStarLine className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-gray-700">Items</span>
          </div>
          <ul className="space-y-1">
            {shepherd.items.map((item, index) => (
              <li key={index} className="text-sm text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Recent Achievements</h3>
        <ul className="space-y-2">
          {shepherd.achievements.map((achievement, index) => (
            <li key={index} className="flex items-center space-x-2">
              <RiStarLine className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default VirtualShepherd;