import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/landing/LandingPage';
import { Login } from './pages/auth/Login';
import { AppLayout } from './components/common/AppLayout';
import { UserRole } from './types';

type ViewMode = 'landing' | 'login' | 'app';

const AppContent: React.FC = () => {
  const { switchRole } = useAuth();
  
  // Initialize view from URL hash if present, default to 'landing'
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('app') || hash.includes('portal')) return 'app';
    if (hash.includes('login')) return 'login';
    return 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('app') || hash.includes('portal')) {
        setViewMode('app');
      } else if (hash.includes('login')) {
        setViewMode('login');
      } else if (hash === '' || hash.includes('hero') || hash.includes('features')) {
        // If not in app, allow anchor scrolling on landing
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handlers for switching views
  const handleOpenLogin = () => {
    window.location.hash = '#login';
    setViewMode('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDashboard = () => {
    window.location.hash = '#app';
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    window.location.hash = '';
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoleAndLaunch = (role: UserRole) => {
    switchRole(role);
    window.location.hash = '#app';
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'login') {
    return (
      <Login
        onLoginSuccess={handleOpenDashboard}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  if (viewMode === 'app') {
    return <AppLayout onNavigateHome={handleNavigateHome} />;
  }

  return (
    <LandingPage
      onOpenLogin={handleOpenLogin}
      onOpenDashboard={handleOpenDashboard}
      onSelectRole={handleSelectRoleAndLaunch}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
