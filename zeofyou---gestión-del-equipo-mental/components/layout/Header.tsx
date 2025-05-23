
import React from 'react';
import Icon from '../ui/Icon';
import { useData } from '../../contexts/AppProviders';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <button className="relative text-gray-400 hover:text-white">
          <Icon name="Bell" size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
