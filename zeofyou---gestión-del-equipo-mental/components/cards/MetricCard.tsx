
import React from 'react';
import Icon from '../ui/Icon';
import { Metric } from '../../types';

const MetricCard: React.FC<Metric> = ({ title, value, change, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const trendIcon = trend === 'up' ? 'ArrowUp' : trend === 'down' ? 'ArrowDown' : 'Minus';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md transition-all duration-200 hover:shadow-lg hover:border-gray-600">
      <h3 className="text-gray-400 text-sm font-medium mb-1 truncate">{title}</h3>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className={`flex items-center text-sm ${trendColor}`}>
        <Icon name={trendIcon as any} size={16} className="mr-1" />
        <span>{change}</span>
      </div>
    </div>
  );
};

export default MetricCard;
