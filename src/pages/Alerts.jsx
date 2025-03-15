import { motion } from 'framer-motion';
import { RiErrorWarningLine, RiTimeLine, RiMessage2Line } from 'react-icons/ri';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'inappropriate_content',
      game: 'Adopt Me!',
      timestamp: '2 hours ago',
      description: 'Potentially inappropriate chat content detected',
      severity: 'high'
    },
    {
      id: 2,
      type: 'excessive_time',
      game: 'Brookhaven',
      timestamp: '4 hours ago',
      description: 'Daily time limit exceeded',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'suspicious_behavior',
      game: 'MeepCity',
      timestamp: '1 day ago',
      description: 'Unusual pattern of interactions detected',
      severity: 'low'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'inappropriate_content':
        return RiErrorWarningLine;
      case 'excessive_time':
        return RiTimeLine;
      case 'suspicious_behavior':
        return RiMessage2Line;
      default:
        return RiErrorWarningLine;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-danger-50 text-danger-600';
      case 'medium':
        return 'bg-yellow-50 text-yellow-600';
      case 'low':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Alerts</h1>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${getSeverityColor(alert.severity)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{alert.game}</h3>
                    <p className="text-sm text-gray-500">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                    Review
                  </button>
                  <button className="px-4 py-2 bg-danger-50 text-danger-600 rounded-lg hover:bg-danger-100 transition-colors">
                    Block
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;