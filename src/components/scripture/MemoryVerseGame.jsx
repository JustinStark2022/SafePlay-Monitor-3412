import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiStarLine, RiTimeLine, RiGamepadLine } from 'react-icons/ri';

const MemoryVerseGame = ({ onComplete }) => {
  const [verse, setVerse] = useState({
    text: "God loved the world so much that he gave his one and only Son.",
    reference: "John 3:16a",
    words: []
  });

  const [scrambledWords, setScrambledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Split and scramble verse words
    const words = verse.text.split(' ');
    setVerse(prev => ({ ...prev, words }));
    setScrambledWords(shuffleArray([...words]));
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleWordSelect = (word, index) => {
    setSelectedWords(prev => [...prev, word]);
    setScrambledWords(prev => prev.filter((_, i) => i !== index));
    
    // Check if verse is complete and correct
    const newSelected = [...selectedWords, word];
    if (newSelected.length === verse.words.length) {
      const isVerseCorrect = newSelected.join(' ') === verse.text;
      setIsCorrect(isVerseCorrect);
      if (isVerseCorrect) {
        setPoints(prev => prev + 100);
        onComplete && onComplete();
      }
    }
  };

  const resetGame = () => {
    setSelectedWords([]);
    setScrambledWords(shuffleArray([...verse.words]));
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-50 rounded-full">
            <RiGamepadLine className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Memory Verse Game</h2>
        </div>
        <div className="flex items-center space-x-2">
          <RiStarLine className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-700">{points}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-2">Reference:</p>
        <p className="text-lg font-semibold text-primary-600">{verse.reference}</p>
      </div>

      <div className="space-y-6">
        <div className="min-h-[100px] bg-primary-50 p-4 rounded-lg flex flex-wrap gap-2">
          {selectedWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {scrambledWords.map((word, index) => (
            <motion.button
              key={index}
              onClick={() => handleWordSelect(word, index)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {word}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-success-50 p-4 rounded-lg text-center"
            >
              <RiStarLine className="w-12 h-12 text-success-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-success-600">Great job!</h3>
              <p className="text-success-600">You've memorized the verse!</p>
              <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
              >
                Try Another Verse
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryVerseGame;