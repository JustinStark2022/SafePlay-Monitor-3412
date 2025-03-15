import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GameList from './pages/GameList';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-8"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </Router>
  );
}

export default App;