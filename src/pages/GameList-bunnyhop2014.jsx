import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiThumbUpLine, RiThumbDownLine, RiShieldCheckLine } from 'react-icons/ri';

const GameList = () => {
  const [filter, setFilter] = useState('all');

  const games = [
    {
      id: 1,
      name: 'Adopt Me!',
      status: 'safe',
      lastPlayed: '2h ago',
      timeSpent: '45m',
      thumbnail: 'https://images.unsplash.com/photo-1612287230517-fc951ff7298f?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Brookhaven',
      status: 'flagged',
      lastPlayed: '1d ago',
      timeSpent: '2h',
      thumbnail: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&h=300&fit=crop'
    }
  ];

  const filteredGames = filter === 'all' ? games : games.filter(game => game.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Game List</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('safe')}
            className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
          >
            View Safe List
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className="px-4 py-2 bg-danger-500 text-white rounded-lg hover:bg-danger-600 transition-colors"
          >
            View Blocked Games
          </button>
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            View All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={game.thumbnail}
              alt={game.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{game.name}</h2>
                  <p className="text-sm text-gray-500">Last played: {game.lastPlayed}</p>
                  <p className="text-sm text-gray-500">Time spent: {game.timeSpent}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  game.status === 'safe'
                    ? 'bg-success-50 text-success-600'
                    : 'bg-danger-50 text-danger-600'
                }`}>
                  {game.status}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button className="flex items-center px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                  <RiShieldCheckLine className="w-5 h-5 mr-2" />
                  Review
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 bg-success-50 text-success-600 rounded-lg hover:bg-success-100 transition-colors">
                    <RiThumbUpLine className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-danger-50 text-danger-600 rounded-lg hover:bg-danger-100 transition-colors">
                    <RiThumbDownLine className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameList;