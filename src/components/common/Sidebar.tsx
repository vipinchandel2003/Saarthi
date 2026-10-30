import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  CreditCard,
  FileSpreadsheet,
  Fuel,
  LayoutDashboard,
  MapPin,
  QrCode,
  Radio,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  openAlertsCount?: number;
  pendingExpensesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  openAlertsCount = 2,
  pendingExpensesCount = 2,
}) => {
  const { currentRole } = useAuth();

  const getNavItems = () => {
    switch (currentRole) {
      case 'owner':
        return [
          { id: 'overview', label: 'Fleet Overview', icon: LayoutDashboard },
          { id: 'vehicles', label: 'Vehicle Management', icon: Truck },
          { id: 'tracking', label: 'Live GPS Tracking', icon: MapPin },
          { id: 'fuel', label: 'Fuel Monitoring & Proof', icon: Fuel, badge: openAlertsCount > 0 ? `${openAlertsCount} alerts` : undefined, badgeColor: 'bg-rose-500 text-white' },
          { id: 'trips', label: 'Trip Management', icon: Compass },
          { id: 'expenses', label: 'Expenses & Khata', icon: CreditCard, badge: pendingExpensesCount > 0 ? `${pendingExpensesCount}` : undefined, badgeColor: 'bg-amber-500 text-slate-900' },
          { id: 'drivers', label: 'Driver Management', icon: Users },
          { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings & WhatsApp', icon: Settings },
        ];
      case 'manager':
        return [
          { id: 'dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
          { id: 'tripplanning', label: 'Trip Planning & Dispatch', icon: Compass },
          { id: 'tripmonitoring', label: 'Trip Monitoring', icon: Activity },
          { id: 'availability', label: 'Trucks & Drivers', icon: Truck },
          { id: 'expensereview', label: 'Expense Review & Approval', icon: CreditCard, badge: pendingExpensesCount > 0 ? `${pendingExpensesCount} pending` : undefined, badgeColor: 'bg-amber-500 text-slate-900' },
          { id: 'alerttriage', label: 'Alert Triage Queue', icon: AlertTriangle, badge: `${openAlertsCount}`, badgeColor: 'bg-rose-500 text-white' },
        ];
      case 'installer':
        return [
          { id: 'jobs', label: 'Assigned Jobs', icon: Wrench },
          { id: 'provisioning', label: 'QR & Device Link', icon: QrCode },
          { id: 'calibration', label: 'Tank Calibration Tool', icon: Fuel },
          { id: 'telemetrytest', label: 'Live Packet Test', icon: Radio },
          { id: 'jobhistory', label: 'Completed Jobs', icon: CheckCircle },
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'Platform Dashboard', icon: LayoutDashboard },
          { id: 'tenants', label: 'Transporter Fleets', icon: Truck },
          { id: 'users', label: 'User & Access Control', icon: Users },
          { id: 'devicehealth', label: 'Device & Codec 8 Health', icon: Radio },
          { id: 'auditlogs', label: 'Tamper-Evident Audit Log', icon: ShieldCheck },
          { id: 'settings', label: 'DPDP & System Settings', icon: Settings },
        ];
      default:
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <Logo showTagline variant="light" size="sm" />
      </div>

      {/* Role Indicator Banner */}
      <div className="px-5 py-3 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-300 capitalize">{currentRole} Portal</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">v0.1</span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-700 text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Transporter Info & WhatsApp Integration Preview */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
            WA
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-slate-200 truncate">WhatsApp Alerts</p>
            <p className="text-[10px] text-emerald-400">Connected • Daily at 8 PM</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
