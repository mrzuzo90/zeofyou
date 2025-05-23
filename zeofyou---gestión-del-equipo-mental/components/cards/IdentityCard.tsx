
import React from 'react';
import { Identity } from '../../types';
import Avatar from '../ui/Avatar';
import { STATUS_CLASSES } from '../../constants';

interface StatusIndicatorProps {
  status: Identity['status'];
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const statusColor = STATUS_CLASSES[status] || 'bg-gray-500';
  return (
    <div className="ml-auto flex items-center">
      <span className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
      <span className="text-xs text-gray-400 capitalize">{status}</span>
    </div>
  );
};

const IdentityCard: React.FC<Identity> = ({ name, role, avatar, status, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4 shadow-md transition-all duration-200 hover:shadow-lg hover:border-gray-600">
      <div className="flex items-start mb-3">
        <Avatar src={avatar} alt={name} size="md" className="mr-4" />
        <div className="flex-grow">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <p className="text-blue-400 text-sm">{role}</p>
        </div>
        <StatusIndicator status={status} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default IdentityCard;
