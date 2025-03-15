import { NavLink } from 'react-router-dom';
import { RiDashboardLine, RiGamepadLine, RiAlertLine, RiSettings4Line } from 'react-icons/ri';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/games', icon: RiGamepadLine, label: 'Games' },
    { path: '/alerts', icon: RiAlertLine, label: 'Alerts' },
    { path: '/settings', icon: RiSettings4Line, label: 'Settings' }
  ];

  return (
    <aside className="bg-white w-64 h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">RobloxGuard</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;