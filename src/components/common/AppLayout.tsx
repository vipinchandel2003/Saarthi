import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { OwnerPortal } from '../../pages/owner/OwnerPortal';
import { ManagerPortal } from '../../pages/manager/ManagerPortal';
import { DriverPortal } from '../../pages/driver/DriverPortal';
import { InstallerPortal } from '../../pages/installer/InstallerPortal';
import { AdminPortal } from '../../pages/admin/AdminPortal';
import { mockStorage } from '../../services/mockStorage';
import { UserRole } from '../../types';

interface AppLayoutProps {
  onNavigateHome?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ onNavigateHome }) => {
  const { currentRole, switchRole } = useAuth();

  // Active tab per role
  const [tabMap, setTabMap] = useState<Record<UserRole, string>>({
    owner: 'overview',
    manager: 'dashboard',
    driver: 'home',
    installer: 'jobs',
    admin: 'overview',
  });

  const currentTab = tabMap[currentRole] || 'overview';

  const handleTabChange = (newTab: string) => {
    setTabMap((prev) => ({ ...prev, [currentRole]: newTab }));
  };

  const getPortalTitle = () => {
    switch (currentRole) {
      case 'owner':
        return 'Fleet Owner Operations Dashboard';
      case 'manager':
        return 'Manager / Dispatcher Operations';
      case 'driver':
        return 'Driver Mobile Portal (सारथी)';
      case 'installer':
        return 'Installer & Telematics Calibration';
      case 'admin':
        return 'Platform Administration & Device Health';
      default:
        return 'Saarthi Operations';
    }
  };

  // If driver role, render the mobile-first Driver Portal view with a role switcher header
  if (currentRole === 'driver') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        {/* Quick return / switch pill for desktop reviewer */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold">Simulated Android Smartphone View (Driver Portal)</span>
          </div>
          <div className="flex items-center gap-2">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-[11px] border border-slate-700"
              >
                ← Website Home
              </button>
            )}
            <button
              onClick={() => switchRole('owner')}
              className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px]"
            >
              Owner Portal
            </button>
            <button
              onClick={() => switchRole('manager')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px]"
            >
              Manager Portal
            </button>
          </div>
        </div>
        <div className="flex-1">
          <DriverPortal />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header portalTitle={getPortalTitle()} onNavigateHome={onNavigateHome} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'owner' && (
              <OwnerPortal currentTab={currentTab} onTabChange={handleTabChange} />
            )}
            {currentRole === 'manager' && (
              <ManagerPortal currentTab={currentTab} onTabChange={handleTabChange} />
            )}
            {currentRole === 'installer' && (
              <InstallerPortal currentTab={currentTab} onTabChange={handleTabChange} />
            )}
            {currentRole === 'admin' && (
              <AdminPortal currentTab={currentTab} onTabChange={handleTabChange} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
