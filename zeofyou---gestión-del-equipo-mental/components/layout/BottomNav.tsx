
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';
import { NavItemType } from '../../types';

const NavItem: React.FC<{ item: NavItemType; isActive: boolean }> = ({ item, isActive }) => (
  <Link
    to={item.path}
    className={`flex flex-col items-center justify-center flex-1 p-2 rounded-lg transition-colors duration-200 ease-in-out
                ${isActive ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
  >
    <item.icon size={20} className="mb-0.5" />
    <span className="text-xs font-medium">{item.label}</span>
  </Link>
);

const BottomNav: React.FC = () => {
  const location = useLocation();

  // Filter out Profile, Login, Signup from main nav for this example
  const mainNavItems = NAV_ITEMS.filter(item => ![ "/perfil", "/login", "/signup"].includes(item.path) );


  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-2 shadow-lg z-10 md:hidden">
      <div className="container mx-auto flex justify-around items-center max-w-md">
        {mainNavItems.slice(0, 4).map((item) => ( // Show first 4 for typical bottom nav
          <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
