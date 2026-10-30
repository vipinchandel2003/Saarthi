import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  Moon,
  Search,
  Shield,
  Truck,
  User,
  Wrench,
  BarChart3,
  UserCheck,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  portalTitle: string;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ portalTitle, onNavigateHome }) => {
  const { currentUser, currentRole, switchRole, language, setLanguage, logout } = useAuth();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; color: string }[] = [
    { role: 'owner', label: '1. Fleet Owner', icon: Truck, color: 'text-sky-600' },
    { role: 'manager', label: '2. Manager / Dispatcher', icon: BarChart3, color: 'text-indigo-600' },
    { role: 'driver', label: '3. Driver (Mobile View)', icon: UserCheck, color: 'text-emerald-600' },
    { role: 'installer', label: '4. Installer / Technician', icon: Wrench, color: 'text-amber-600' },
    { role: 'admin', label: '5. Platform Admin', icon: Shield, color: 'text-purple-600' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Portal Name & Search */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {portalTitle}
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-sky-50 text-sky-700 border border-sky-200 uppercase">
              Saarthi v0.1 MVP
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 hidden md:block">
            {currentUser.tenantName}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Back to Public Website */}
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 text-sky-800 text-xs font-bold hover:bg-sky-100 transition shadow-xs"
            title="Return to Public Website Homepage"
          >
            <Truck className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Website Home</span>
          </button>
        )}

        {/* Bilingual Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          title="Switch Language (English / हिंदी)"
        >
          <Globe className="w-3.5 h-3.5 text-sky-600" />
          <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>

        {/* Demo Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-xs font-bold shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Role:</span>
            <span className="capitalize">{currentRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Portal (5 Portals Demo)
              </div>
              <div className="space-y-1 mt-1">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isActive = currentRole === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-sky-50 text-sky-700 border border-sky-100'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${r.color}`} />
                      <span>{r.label}</span>
                      {isActive && <span className="ml-auto text-[10px] text-sky-600 font-bold">Active</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Pill & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition ml-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
