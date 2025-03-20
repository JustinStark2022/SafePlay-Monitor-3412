import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBibleLine, RiLightbulbLine, RiHeartLine } from 'react-icons/ri';

const DailyDevotional = () => {
  const [devotional] = useState({
    title: "God's Love for Us",
    verse: {
      text: "God loved the world so much that he gave his one and only Son. Anyone who believes in him will not die but will have eternal life.",
      reference: "John 3:16 (NIrV)"
    },
    explanation: "This verse tells us about God's amazing love. He loves us so much that He gave us Jesus, His only Son. When we believe in Jesus, we get to live forever with God!",
    application: "Remember that God loves you no matter what! When you feel sad or alone, you can always talk to God because He cares about you.",
    prayer: "Dear God, thank you for loving me so much. Thank you for sending Jesus to be my friend and savior. Help me to share your love with others today. Amen.",
    activity: {
      title: "Love in Action",
      description: "Draw a picture of how you can show God's love to someone today. Maybe helping a friend or giving someone a hug!"
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
          <RiBibleLine className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Today's Devotional</h2>
      </div>

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
      </div>
    </motion.div>
  );
};

export default DailyDevotional;