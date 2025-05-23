
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import { NAV_ITEMS, APP_NAME } from '../../constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const authPaths = ['/login', '/signup'];
  if (authPaths.includes(location.pathname)) {
    return <div className="min-h-screen bg-gray-900 text-white flex flex-col">{children}</div>;
  }

  const currentNavItem = NAV_ITEMS.find(item => item.path === location.pathname);
  const pageTitle = currentNavItem ? currentNavItem.label : APP_NAME;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header title={pageTitle} />
      <main className="flex-grow container mx-auto p-4 pt-6 pb-20 md:pb-6 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
