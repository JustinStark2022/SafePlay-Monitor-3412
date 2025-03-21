import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiBibleLine,
  RiStarLine,
  RiTimeLine
} from 'react-icons/ri';

const ScriptureChallenge = ({ onComplete }) => {
  const [currentScripture] = useState({
    verse:
      'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    reference: 'John 3:16',
    explanation:
      "This verse shows God's incredible love for us. He loved us so much that He gave His Son Jesus to save us.",
    application:
      'When we feel unloved or alone, we can remember that God loves us deeply and personally.',
    quiz: [
      {
        question: 'What did God give because He loved the world?',
        options: ['His Son', 'A book', 'A new law', 'A friend'],
        correct: 0
      }
    ]
  });

  const [userAnswer, setUserAnswer] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleMemorizationCheck = () => {
    if (userAnswer.trim().toLowerCase() === currentScripture.verse.toLowerCase()) {
      setShowQuiz(true);
    } else {
      alert('Keep trying! Double-check the verse and try again.');
    }
  };

  const handleQuizSubmit = (selectedAnswer, correctIndex) => {
    if (selectedAnswer === correctIndex) {
      setCompleted(true);
      onComplete && onComplete();
    } else {
      alert('Not quite right. Try again!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-50 rounded-full">
            <RiBibleLine className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Daily Scripture Challenge</h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">{currentScripture.verse}</p>
          <p className="text-sm text-primary-600 mt-2">{currentScripture.reference}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Understanding the Scripture:</h3>
          <p className="text-gray-600">{currentScripture.explanation}</p>

          <h3 className="font-semibold text-gray-700">Applying it to Your Life:</h3>
          <p className="text-gray-600">{currentScripture.application}</p>
        </div>

        {!showQuiz && !completed && (
          <div className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the verse from memory..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="4"
            />
            <button
              onClick={handleMemorizationCheck}
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Check Memorization
            </button>
          </div>
        )}

        {showQuiz && !completed && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Quick Quiz:</h3>
            {currentScripture.quiz.map((q, i) => (
              <div key={i} className="space-y-2">
                <p className="text-gray-700">{q.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizSubmit(index, q.correct)}
                      className="p-3 text-left border rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success-50 p-4 rounded-lg text-center"
          >
            <RiStarLine className="w-12 h-12 text-success-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-success-600">Great job!</h3>
            <p className="text-success-600">You've earned your gaming time!</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <RiTimeLine className="w-5 h-5 text-success-500" />
              <span className="text-success-600">+3 hours added</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ScriptureChallenge;