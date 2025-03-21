import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiBibleLine, RiBookmarkLine, RiHeartLine, RiStarLine, RiShieldLine } from 'react-icons/ri';

const ScriptureLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || 'all';
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const categories = [
    { id: 'all', name: 'All Verses' },
    { id: 'love', name: "God's Love", icon: RiHeartLine },
    { id: 'courage', name: 'Courage', icon: RiShieldLine },
    { id: 'wisdom', name: 'Wisdom', icon: RiStarLine },
    { id: 'faith', name: 'Faith', icon: RiBibleLine }
  ];

  const verses = [
    {
      id: 1,
      text: "God loved the world so much that he gave his one and only Son.",
      reference: "John 3:16 (NIrV)",
      category: "love",
      difficulty: "easy",
      points: 100,
      explanation: "This verse shows how much God loves us!",
      application: "Remember that God loves you no matter what."
    },
    {
      id: 2,
      text: "Be strong and brave. Do not be afraid. Do not lose hope. I am the Lord your God. I will be with you everywhere you go.",
      reference: "Joshua 1:9 (NIrV)",
      category: "courage",
      difficulty: "medium",
      points: 150,
      explanation: "God promises to be with us always!",
      application: "When you're scared, remember God is with you."
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bookmark) => bookmark !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
          <RiBibleLine className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Scripture Library</h2>
      </div>

      <div className="flex space-x-4 mb-6 overflow-x-auto py-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.icon && <category.icon className="w-5 h-5 mr-2" />}
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {verses
          .filter((verse) => selectedCategory === 'all' || verse.category === selectedCategory)
          .map((verse) => (
            <motion.div
              key={verse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-lg text-gray-800 font-medium mb-2">{verse.text}</p>
                  <p className="text-primary-600">{verse.reference}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
                    {verse.points} pts
                  </span>
                  <button
                    onClick={() => toggleBookmark(verse.id)}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarks.includes(verse.id)
                        ? 'bg-primary-100 text-primary-600'
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <RiBookmarkLine className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700">What it means:</h4>
                  <p className="text-gray-600">{verse.explanation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">How to use it:</h4>
                  <p className="text-gray-600">{verse.application}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Start Memorizing
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ScriptureLibrary;