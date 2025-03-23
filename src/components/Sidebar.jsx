import { NavLink } from 'react-router-dom';
import {
  RiDashboardLine,
  RiGamepadLine,
  RiAlertLine,
  RiSettings4Line,
  RiBookOpenLine,
  RiBookReadLine,
  RiHeartLine,
  RiStarLine
} from 'react-icons/ri';
import ScreenTimeControls from '@/components/ScreenTimeControls';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/games', icon: RiGamepadLine, label: 'Games' },
    { path: '/bible', icon: RiBookOpenLine, label: 'Bible Reader' },
    { path: '/scripture', icon: RiBookReadLine, label: 'Scripture Library' },
    { path: '/prayer', icon: RiHeartLine, label: 'Prayer Journal' },
    { path: '/achievements', icon: RiStarLine, label: 'Achievements' },
    { path: '/alerts', icon: RiAlertLine, label: 'Alerts' },
    { path: '/settings', icon: RiSettings4Line, label: 'Settings' }
  ];

  return (
    <aside className="bg-white w-64 h-screen shadow-lg flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">GuardianShepherd</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600'
                    : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Screen Time Controls Below Navigation */}
      <div className="px-6 pb-6">
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Screen Time Settings</h2>
          <ScreenTimeControls />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;