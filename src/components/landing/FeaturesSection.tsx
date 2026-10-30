import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Compass,
  CreditCard,
  Fuel,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Truck,
  Users,
} from 'lucide-react';
import { UserRole } from '../../types';

interface FeaturesSectionProps {
  onSelectRole: (role: UserRole) => void;
  onOpenDashboard: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onSelectRole,
  onOpenDashboard,
}) => {
  const features = [
    {
      icon: Truck,
      title: 'Fleet Management',
      description: 'Manage vehicles, drivers, assignments, and fleet availability from one centralized workspace.',
      targetRole: 'owner' as UserRole,
      actionText: 'View Fleet Overview',
      tag: 'Core Management',
    },
    {
      icon: Compass,
      title: 'Trip Management',
      description: 'Organize trips, assign vehicles and drivers, issue advances, and monitor transit milestones.',
      targetRole: 'manager' as UserRole,
      actionText: 'Explore Trip Dispatch',
      tag: 'Daily Dispatch',
    },
    {
      icon: Fuel,
      title: 'Fuel Monitoring & Proof',
      description: 'Record fuel activity, detect sudden fuel drops, review pump bills, and investigate unusual patterns.',
      targetRole: 'owner' as UserRole,
      actionText: 'View Fuel Proof Reports',
      tag: 'Sensor Telemetry',
    },
    {
      icon: CreditCard,
      title: 'Expense Tracking (Khata)',
      description: 'Capture operational expenses and audit supporting receipts or photographs for every highway trip.',
      targetRole: 'manager' as UserRole,
      actionText: 'Inspect Expense Khata',
      tag: 'Financial Control',
    },
    {
      icon: MapPin,
      title: 'Live Vehicle Tracking',
      description: 'View vehicle locations, speed, and trip progress across Central India corridors with 10s updates.',
      targetRole: 'owner' as UserRole,
      actionText: 'Open Tracking Cockpit',
      tag: 'GPS Telemetry',
    },
    {
      icon: BarChart3,
      title: 'Operational Analytics',
      description: 'Understand fleet utilization, trip summaries, diesel costs, and mileage trends through clear visual charts.',
      targetRole: 'owner' as UserRole,
      actionText: 'See Analytics Dashboard',
      tag: 'Intelligence',
    },
    {
      icon: Smartphone,
      title: 'Driver Mobile Portal',
      description: 'Provide drivers with a mobile-friendly Hindi/English interface for trip starts, fuel entries, and receipts.',
      targetRole: 'driver' as UserRole,
      actionText: 'Launch Driver App View',
      tag: 'Hindi-First App',
    },
    {
      icon: LayoutDashboard,
      title: 'Centralized Operations',
      description: 'Bring fleet owners, managers, drivers, installers, and platform administrators into one connected platform.',
      targetRole: 'admin' as UserRole,
      actionText: 'View Multi-Tenant Admin',
      tag: 'Full Alignment',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            Comprehensive Operational Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Everything Your Fleet Needs.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">
              One Connected Platform.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            Manage transport operations with greater visibility, better coordination, and a clearer view of your fleet's daily activity.
          </p>
        </div>

        {/* Feature Cards Grid (8 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => onSelectRole(item.targetRole)}
                className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-200 group shadow-lg cursor-pointer transform hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
