import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiBookLine, RiStarLine, RiQuestionLine, RiMovieLine } from 'react-icons/ri';

const InteractiveBibleStory = () => {
  const [currentStory, setCurrentStory] = useState({
    id: 1,
    title: "David and Goliath",
    summary: "A story about courage and faith in God",
    currentScene: 0,
    scenes: [
      {
        text: "There was a young shepherd boy named David who trusted in God completely.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop",
        question: {
          text: "Why did David trust God?",
          options: [
            "Because God had helped him before",
            "Because he was brave",
            "Because he had no choice",
            "Because others told him to"
          ],
          correct: 0
        }
      },
      {
        text: "A giant named Goliath was challenging God's people, but everyone was afraid to fight him.",
        image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=300&fit=crop",
        question: {
          text: "Why were people afraid of Goliath?",
          options: [
            "He was very tall and strong",
            "He had better weapons",
            "He was mean",
            "All of the above"
          ],
          correct: 3
        }
      }
    ],
    rewards: {
      points: 100,
      achievement: "Courage Champion",
      verse: "I can do all things through Christ who strengthens me. - Philippians 4:13"
    }
  });

  const [userAnswers, setUserAnswers] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleNextScene = () => {
    if (currentStory.currentScene < currentStory.scenes.length - 1) {
      setCurrentStory(prev => ({
        ...prev,
        currentScene: prev.currentScene + 1
      }));
      setShowQuestion(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const isCorrect = answerIndex === currentStory.scenes[currentStory.currentScene].question.correct;
    setUserAnswers(prev => [...prev, isCorrect]);
    setShowQuestion(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
          <RiBookLine className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{currentStory.title}</h2>
          <p className="text-sm text-gray-500">{currentStory.summary}</p>
        </div>
      </div>

      <motion.div
        key={currentStory.currentScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <img
          src={currentStory.scenes[currentStory.currentScene].image}
          alt={currentStory.title}
          className="w-full h-64 object-cover rounded-lg"
        />

        <p className="text-lg text-gray-700">
          {currentStory.scenes[currentStory.currentScene].text}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowQuestion(true)}
            className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100"
          >
            <RiQuestionLine className="w-5 h-5 mr-2" />
            Think About It
          </button>
          
          <button
            onClick={handleNextScene}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <RiMovieLine className="w-5 h-5 mr-2" />
            Next Scene
          </button>
        </div>

        <AnimatePresence>
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentStory.scenes[currentStory.currentScene].question.text}
              </h3>
              <div className="space-y-2">
                {currentStory.scenes[currentStory.currentScene].question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className="w-full p-3 text-left bg-white border rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {userAnswers.length === currentStory.scenes.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success-50 p-6 rounded-lg text-center"
          >
            <RiStarLine className="w-12 h-12 text-success-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-success-600">
              Story Complete!
            </h3>
            <p className="text-success-600 mb-4">
              You've earned {currentStory.rewards.points} points and the {currentStory.rewards.achievement} achievement!
            </p>
            <p className="text-gray-600 italic">
              {currentStory.rewards.verse}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default InteractiveBibleStory;