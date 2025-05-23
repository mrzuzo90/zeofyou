
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders, useAuth } from './contexts/AppProviders';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import IdentitiesPage from './pages/IdentitiesPage';
import ProjectsPage from './pages/ProjectsPage';
import FocusPage from './pages/FocusPage';
import PlanningPage from './pages/PlanningPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './constants';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path={ROUTES.IDENTITIES} element={<ProtectedRoute><IdentitiesPage /></ProtectedRoute>} />
        <Route path={ROUTES.PROJECTS} element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path={ROUTES.FOCUS} element={<ProtectedRoute><FocusPage /></ProtectedRoute>} />
        <Route path={ROUTES.PLANNING} element={<ProtectedRoute><PlanningPage /></ProtectedRoute>} />
        <Route path={ROUTES.INSIGHTS} element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
        <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProviders>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProviders>
  );
};

export default App;
