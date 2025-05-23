
import React from 'react';
import Icon, { IconName } from '../ui/Icon';
import { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onDismiss?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onDismiss }) => {
  const { id, icon, title, description, timestamp, read } = notification;
  
  const timeAgo = timestamp ? new Date(timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={`flex items-start p-3 rounded-lg mb-2 transition-colors duration-150 ${read ? 'bg-gray-800/50' : 'bg-gray-700 hover:bg-gray-700/70'}`}>
      <Icon name={icon as IconName} size={20} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
      <div className="flex-grow">
        <h4 className={`font-medium ${read ? 'text-gray-400' : 'text-white'}`}>{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
        {timeAgo && <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>}
      </div>
      {onDismiss && (
        <button onClick={() => onDismiss(id)} className="ml-2 text-gray-500 hover:text-gray-300">
          <Icon name="X" size={18} />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
