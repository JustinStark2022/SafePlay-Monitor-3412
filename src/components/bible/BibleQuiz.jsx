import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiQuestionLine, RiStarLine, RiTimeLine } from 'react-icons/ri';

const BibleQuiz = ({ onComplete }) => {
  const [currentQuiz, setCurrentQuiz] = useState({
    id: 1,
    topic: "Understanding God's Love",
    questions: [
      {
        id: 1,
        text: "In John 3:16, what did God give because He loved the world?",
        options: [
          "His only Son",
          "A new commandment",
          "The Bible",
          "A promise"
        ],
        correct: 0,
        explanation: "God loved us so much that He gave His only Son, Jesus, to save us."
      },
      {
        id: 2,
        text: "How can we show God's love to others?",
        options: [
          "By being kind to everyone",
          "By helping those in need",
          "By forgiving others",
          "All of the above"
        ],
        correct: 3,
        explanation: "We can show God's love in many ways - through kindness, helping others, and forgiveness."
      }
    ],
    rewards: {
      timeBonus: 30,
      points: 100
    }
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === currentQuiz.questions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = answers.filter(Boolean).length;
      if (score / currentQuiz.questions.length >= 0.7) {
        onComplete && onComplete(currentQuiz.rewards);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-50 rounded-full">
            <RiQuestionLine className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{currentQuiz.topic}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <RiTimeLine className="w-5 h-5 text-primary-600" />
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {currentQuiz.questions.length}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuiz.questions[currentQuestion].text}
          </h3>
          <div className="space-y-3">
            {currentQuiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  showExplanation
                    ? index === currentQuiz.questions[currentQuestion].correct
                      ? 'bg-success-50 text-success-700'
                      : 'bg-gray-100 text-gray-500'
                    : 'bg-white hover:bg-primary-50 text-gray-700'
                } ${showExplanation ? 'cursor-default' : 'hover:bg-primary-50'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-primary-50 p-4 rounded-lg"
            >
              <p className="text-primary-600">
                {currentQuiz.questions[currentQuestion].explanation}
              </p>
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {answers.length === currentQuiz.questions.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success-50 p-6 rounded-lg text-center"
          >
            <RiStarLine className="w-12 h-12 text-success-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-success-600">
              Quiz Complete!
            </h3>
            <p className="text-success-600 mb-4">
              You got {answers.filter(Boolean).length} out of {currentQuiz.questions.length} correct!
            </p>
            {answers.filter(Boolean).length / currentQuiz.questions.length >= 0.7 && (
              <div className="flex items-center justify-center space-x-2 text-primary-600">
                <RiTimeLine className="w-5 h-5" />
                <span>+{currentQuiz.rewards.timeBonus} minutes earned!</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BibleQuiz;