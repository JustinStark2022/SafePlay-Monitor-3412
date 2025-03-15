import { motion } from 'framer-motion';
import { 
  RiErrorWarningLine, 
  RiTimeLine, 
  RiMessage2Line, 
  RiUserAddLine,
  RiShieldLine
} from 'react-icons/ri';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'chat_violation',
      game: 'Adopt Me!',
      timestamp: '2 hours ago',
      description: 'Inappropriate language detected',
      severity: 'high',
      context: {
        messages: [
          { user: 'Player123', message: 'Hey want to trade pets?' },
          { user: 'YourChild', message: 'What pets do you have?' },
          { user: 'Player123', message: 'I'll give you pets if you tell me your password', flagged: true }
        ]
      }
    },
    {
      id: 2,
      type: 'friend_request',
      game: 'Brookhaven',
      timestamp: '4 hours ago',
      description: 'New friend request from suspicious account',
      severity: 'medium',
      context: {
        username: 'Unknown123',
        accountAge: '1 day',
        behavior: 'Multiple rapid friend requests to young players'
      }
    },
    {
      id: 3,
      type: 'behavioral',
      game: 'MeepCity',
      timestamp: '1 day ago',
      description: 'Suspicious roleplay behavior detected',
      severity: 'high',
      context: {
        behavior: 'Attempting to move conversation to external platform',
        messages: [
          { user: 'SuspectUser', message: 'Let's talk on discord instead', flagged: true }
        ]
      }
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'chat_violation': return RiMessage2Line;
      case 'friend_request': return RiUserAddLine;
      case 'behavioral': return RiShieldLine;
      case 'excessive_time': return RiTimeLine;
      default: return RiErrorWarningLine;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-danger-50 text-danger-600';
      case 'medium': return 'bg-yellow-50 text-yellow-600';
      case 'low': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Alert History</h1>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="all">All Types</option>
            <option value="chat">Chat Violations</option>
            <option value="friend">Friend Requests</option>
            <option value="behavioral">Behavioral</option>
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
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${getSeverityColor(alert.severity)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-800">{alert.game}</h3>
                      <span className="text-sm text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{alert.description}</p>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      {alert.type === 'chat_violation' && (
                        <div className="space-y-2">
                          {alert.context.messages.map((msg, i) => (
                            <div 
                              key={i} 
                              className={`p-2 rounded ${msg.flagged ? 'bg-danger-50' : 'bg-white'}`}
                            >
                              <span className="font-semibold text-sm">{msg.user}: </span>
                              <span className="text-sm">{msg.message}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {alert.type === 'friend_request' && (
                        <div>
                          <p className="text-sm"><span className="font-semibold">Username:</span> {alert.context.username}</p>
                          <p className="text-sm"><span className="font-semibold">Account Age:</span> {alert.context.accountAge}</p>
                          <p className="text-sm"><span className="font-semibold">Suspicious Behavior:</span> {alert.context.behavior}</p>
                        </div>
                      )}

                      {alert.type === 'behavioral' && (
                        <div>
                          <p className="text-sm font-semibold text-danger-600">{alert.context.behavior}</p>
                          {alert.context.messages.map((msg, i) => (
                            <div key={i} className="mt-2 p-2 bg-danger-50 rounded">
                              <span className="font-semibold text-sm">{msg.user}: </span>
                              <span className="text-sm">{msg.message}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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