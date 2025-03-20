import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBookLine, RiHeartLine, RiAddLine, RiEditLine } from 'react-icons/ri';

const PrayerJournal = () => {
  const [prayers, setPrayers] = useState([
    {
      id: 1,
      date: '2024-03-15',
      title: 'Prayer for Family',
      content: 'Dear God, please bless my family and keep them safe...',
      answered: false,
      category: 'family'
    },
    {
      id: 2,
      date: '2024-03-14',
      title: 'Thank You Prayer',
      content: 'Thank you God for helping me with my test today...',
      answered: true,
      category: 'thanksgiving'
    }
  ]);

  const [showNewPrayer, setShowNewPrayer] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const categories = [
    { id: 'all', name: 'All Prayers' },
    { id: 'family', name: 'Family' },
    { id: 'friends', name: 'Friends' },
    { id: 'thanksgiving', name: 'Thank You' },
    { id: 'requests', name: 'Requests' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-50 rounded-full">
            <RiBookLine className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Prayer Journal</h2>
        </div>
        <button
          onClick={() => setShowNewPrayer(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RiAddLine className="w-5 h-5 mr-2" />
          New Prayer
        </button>
      </div>

      {showNewPrayer && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-50 p-6 rounded-lg"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Prayer Title"
              value={newPrayer.title}
              onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              placeholder="Dear God..."
              value={newPrayer.content}
              onChange={(e) => setNewPrayer({ ...newPrayer, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              rows="4"
            />
            <select
              value={newPrayer.category}
              onChange={(e) => setNewPrayer({ ...newPrayer, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewPrayer(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add new prayer logic
                  setShowNewPrayer(false);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Prayer
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {prayers.map((prayer) => (
          <motion.div
            key={prayer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{prayer.title}</h3>
                <p className="text-sm text-gray-500">{prayer.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <RiEditLine className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  className={`p-2 rounded-full ${
                    prayer.answered
                      ? 'bg-success-50 text-success-600'
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <RiHeartLine className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{prayer.content}</p>
            <div className="mt-4">
              <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
                {prayer.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrayerJournal;