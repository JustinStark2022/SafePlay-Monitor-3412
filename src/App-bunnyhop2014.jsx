import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 font-body">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="container mx-auto px-6 py-8"
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
