import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { RiShieldCheckLine, RiErrorWarningLine, RiTimeLine } from 'react-icons/ri';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    {
      icon: RiShieldCheckLine,
      label: 'Safe Games',
      value: '24',
      color: 'bg-success-50 text-success-500'
    },
    {
      icon: RiErrorWarningLine,
      label: 'Flagged Content',
      value: '3',
      color: 'bg-danger-50 text-danger-500'
    },
    {
      icon: RiTimeLine,
      label: 'Avg. Daily Time',
      value: '2.5h',
      color: 'bg-primary-50 text-primary-500'
    }
  ];

  const getChartOptions = () => ({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [2.5, 3.0, 1.5, 2.0, 2.8, 4.0, 3.5],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#0ea5e9'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(14, 165, 233, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(14, 165, 233, 0)'
          }]
        }
      }
    }]
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Gaming Activity</h2>
        <ReactECharts option={getChartOptions()} style={{ height: '400px' }} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-danger-50 p-2 rounded-full">
                  <RiErrorWarningLine className="w-5 h-5 text-danger-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">Inappropriate Content Detected</h3>
                  <p className="text-sm text-gray-500">Game: Adopt Me!</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date().setHours(new Date().getHours() - index), 'h:mm a')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;