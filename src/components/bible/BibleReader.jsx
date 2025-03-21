import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBookOpenLine, RiBookmarkLine, RiStarLine } from 'react-icons/ri';

const BibleReader = () => {
  const [currentBook, setCurrentBook] = useState('Genesis');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);

  // Sample Bible content (you would have a complete Bible data source)
  const bibleContent = {
    Genesis: {
      1: {
        1: "In the beginning God created the heavens and the earth.",
        2: "The earth was empty and had no form. Darkness covered the ocean, and God's Spirit was moving over the water.",
        // More verses...
      }
    },
    John: {
      3: {
        16: "God loved the world so much that he gave his one and only Son. Anyone who believes in him will not die but will have eternal life.",
        17: "God did not send his Son into the world to judge the world. He sent his Son to save the world through him."
        // More verses...
      }
    }
  };

  const bookOptions = [
    { id: 'genesis', name: 'Genesis', chapters: 50 },
    { id: 'exodus', name: 'Exodus', chapters: 40 },
    { id: 'john', name: 'John', chapters: 21 },
    // Add more books...
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-50 rounded-full">
        <RiBookOpenLine className="w-6 h-6 text-primary-600" />

        </div>
        <h2 className="text-xl font-bold text-gray-800">Kid's Bible Reader</h2>
      </div>

      <div className="flex space-x-4 mb-6">
        <select
          value={currentBook}
          onChange={(e) => setCurrentBook(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          {bookOptions.map((book) => (
            <option key={book.id} value={book.name}>
              {book.name}
            </option>
          ))}
        </select>

        <select
          value={currentChapter}
          onChange={(e) => setCurrentChapter(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          {[...Array(bookOptions.find(b => b.name === currentBook)?.chapters || 0)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Chapter {i + 1}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="prose max-w-none"
      >
        <div className="bg-gray-50 p-6 rounded-lg">
          {Object.entries(bibleContent[currentBook]?.[currentChapter] || {}).map(([verseNum, text]) => (
            <motion.div
              key={verseNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <span className="text-primary-600 font-bold mr-2">{verseNum}</span>
              <span className="text-gray-800">{text}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100">
            <RiBookmarkLine className="w-5 h-5 mr-2" />
            Bookmark
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100">
            <RiStarLine className="w-5 h-5 mr-2" />
            Add to Favorites
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BibleReader;