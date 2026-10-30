import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { Logo } from '../../components/common/Logo';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Truck,
  UserCheck,
  Wrench,
  Zap,
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateHome?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('rajesh@agrawalroadlines.in');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('owner');

  const demoAccounts: {
    role: UserRole;
    name: string;
    designation: string;
    org: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'owner',
      name: 'Rajesh Agrawal',
      designation: 'Fleet Owner / Transporter',
      org: 'Agrawal Roadlines Indore (18 Trucks)',
      icon: Truck,
      color: 'from-sky-500 to-blue-600',
    },
    {
      role: 'manager',
      name: 'Vikram Chouhan',
      designation: 'Operations & Dispatch Manager',
      org: 'Daily Dispatches & Expense Approvals',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      role: 'driver',
      name: 'Ramesh Verma',
      designation: 'Senior Long-Haul Driver',
      org: 'Mobile App View (Tata Signa MP 09 HG 4821)',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      role: 'installer',
      name: 'Mukesh Sharma',
      designation: 'Telematics & Sensor Technician',
      org: 'QR Linking & Tank Calibration',
      icon: Wrench,
      color: 'from-amber-500 to-orange-600',
    },
    {
      role: 'admin',
      name: 'Amitabh Sengupta',
      designation: 'Platform Administrator',
      org: 'Multi-Tenant Fleets & Codec 8 Health',
      icon: Shield,
      color: 'from-purple-500 to-violet-700',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, selectedDemoRole);
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleSelectDemo = (role: UserRole) => {
    setSelectedDemoRole(role);
    switchRole(role);
    const demoUser = DEMO_USERS[role];
    if (demoUser) {
      setEmail(demoUser.email);
    }
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sky-400 hover:text-white text-xs font-bold transition mb-2"
          >
            ← Return to Public Website
          </button>
        )}
        <div className="flex justify-center">
          <Logo variant="light" size="lg" />
        </div>
        <p className="text-sm font-semibold text-sky-400 tracking-wide">
          Your Fleet. Your Fuel. Your Business. Connected.
        </p>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Saarthi – Integrated Transport Operations Management System for Indian Transporters
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 space-y-6">
        {/* Main Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800 text-slate-200">
          <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                Transporter Email or Mobile ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                Password / Security Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <span className="text-sky-400 hover:underline cursor-pointer">
                Need help logging in?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 hover:opacity-95 transition flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Authenticating with Saarthi Ingest...</span>
              ) : (
                <>
                  <span>Sign In to Transporter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Role Picker (Flagship Evaluator Feature) */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Demo Access (5 Role Portals)</span>
              </p>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                Click any role to launch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoAccounts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleSelectDemo(item.role)}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-950 text-left transition group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shrink-0 group-hover:scale-105 transition`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white group-hover:text-sky-400 transition truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{item.designation}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DPDP & Production Separation Disclaimer */}
        <p className="text-center text-[11px] text-slate-500">
          Demonstration Mode: Authenticates using local session state and simulated Teltonika Codec 8 telematics. Real backend connects via FastAPI & TimescaleDB.
        </p>
      </div>
    </div>
  );
};
