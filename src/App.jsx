import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './components/auth/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GameList from './pages/GameList';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ChildDashboard from './components/dashboard/ChildDashboard';
import BibleReader from './components/bible/BibleReader';
import ScriptureLibrary from './components/scripture/ScriptureLibrary';
import BibleStudyTracker from './components/bible/BibleStudyTracker';
import PrayerJournal from './components/prayer/PrayerJournal';
import BibleQuiz from './components/bible/BibleQuiz';
import BibleAchievementSystem from './components/achievement/BibleAchievementSystem';

function AppContent() {
  const location = useLocation();

  // ✅ Dummy sample notifications
  const notifications = [
    {
      id: 1,
      type: 'new_game',
      content: 'New Game Played: Minecraft Adventures',
      timestamp: 'Just now',
      status: 'pending',
      game: {
        name: 'Minecraft Adventures',
        risk: 'Low',
        summary: 'A creative sandbox game with educational potential.',
        concerns: ['Multiplayer chat', 'Unmoderated mods'],
      },
    },
    {
      id: 2,
      type: 'chat_alert',
      content: 'Flagged Chat in Roblox',
      timestamp: '5 mins ago',
      status: 'pending',
      chatContext: {
        game: 'Roblox',
        time: '12:34 PM',
        messages: [
          { user: 'GamerKid99', message: 'This game is trash!', flagged: true },
          { user: 'FaithGirl07', message: 'Be kind :)', flagged: false },
        ],
      },
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-body">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard notifications={notifications} />} />
              <Route path="/child" element={<ChildDashboard />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bible" element={<BibleReader />} />
              <Route path="/scripture" element={<ScriptureLibrary />} />
              <Route path="/study" element={<BibleStudyTracker />} />
              <Route path="/prayer" element={<PrayerJournal />} />
              <Route path="/quiz" element={<BibleQuiz />} />
              <Route path="/achievements" element={<BibleAchievementSystem />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;