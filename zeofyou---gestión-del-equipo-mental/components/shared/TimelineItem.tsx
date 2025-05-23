
import React from 'react';
import Icon, { IconName } from '../ui/Icon';
import { TimelineEvent } from '../../types';

const TimelineItem: React.FC<TimelineEvent> = ({ icon, title, time, description }) => {
  return (
    <div className="flex items-start mb-4 relative pl-8">
      <div className="absolute left-0 top-1.5 flex flex-col items-center">
        <span className="bg-blue-500 p-1.5 rounded-full ring-4 ring-gray-800">
          <Icon name={icon as IconName} size={16} className="text-white" />
        </span>
        {/* Vertical line could be added here if it's not the last item, using ::after pseudo-element or another div */}
      </div>
      <div className="ml-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
      </div>
    </div>
  );
};

export default TimelineItem;
