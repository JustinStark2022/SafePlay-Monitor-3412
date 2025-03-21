import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RiBookOpenLine,
  RiHeartLine,
  RiCheckLine,
  RiLightbulbLine
} from 'react-icons/ri';

const DailyDevotional = () => {
  const [devotional, setDevotional] = useState(() => {
    const storedDevotional = localStorage.getItem('devotional');
    return storedDevotional
      ? JSON.parse(storedDevotional)
      : {
          title: "God's Love for Us",
          verse: {
            text:
              "God loved the world so much that he gave his one and only Son. Anyone who believes in him will not die but will have eternal life.",
            reference: "John 3:16 (NIrV)"
          },
          explanation:
            "This verse tells us about God's amazing love. He loves us so much that He gave us Jesus, His only Son. When we believe in Jesus, we get to live forever with God!",
          application:
            "Remember that God loves you no matter what! When you feel sad or alone, you can always talk to God because He cares about you.",
          prayer:
            "Dear God, thank you for loving me so much. Thank you for sending Jesus to be my friend and savior. Help me to share your love with others today. Amen.",
          activity: {
            title: "Love in Action",
            description:
              "Draw a picture of how you can show God's love to someone today. Maybe helping a friend or giving someone a hug!"
          },
          completed: false
        };
  });

  useEffect(() => {
    localStorage.setItem('devotional', JSON.stringify(devotional));
  }, [devotional]);

  const markCompleted = () => {
    setDevotional((prev) => ({ ...prev, completed: true }));
  };

  const resetDevotional = () => {
    setDevotional((prev) => ({ ...prev, completed: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
          <RiBookOpenLine className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Today's Devotional</h2>
      </div>

      {devotional.completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 text-center bg-success-50 text-success-600 rounded-lg mb-4"
        >
          ✅ Great job finishing today’s devotional!
        </motion.div>
      )}

      <div className="space-y-6">
        <div className="bg-primary-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{devotional.title}</h3>
          <p className="text-primary-600 font-medium">{devotional.verse.text}</p>
          <p className="text-sm text-primary-500 mt-1">{devotional.verse.reference}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <RiLightbulbLine className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">What It Means</h4>
              <p className="text-gray-600">{devotional.explanation}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <RiHeartLine className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">Living It Out</h4>
              <p className="text-gray-600">{devotional.application}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Let's Pray Together</h4>
          <p className="text-gray-600 italic">{devotional.prayer}</p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Fun Activity</h4>
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="font-medium text-primary-600">{devotional.activity.title}</p>
            <p className="text-gray-600 mt-1">{devotional.activity.description}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <button
            onClick={markCompleted}
            disabled={devotional.completed}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              devotional.completed
                ? 'bg-success-50 text-success-600 cursor-default'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <RiCheckLine className="w-5 h-5 mr-2" />
            {devotional.completed ? 'Completed!' : 'Mark as Completed'}
          </button>

          {devotional.completed && (
            <button
              onClick={resetDevotional}
              className="text-sm text-gray-500 underline hover:text-primary-600"
            >
              Reset Devotional
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyDevotional;