import React from 'react';
import {
  Compass,
  CreditCard,
  Eye,
  Fuel,
  LineChart,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: Eye,
      title: 'Fleet Visibility',
      description: 'Real-time vehicle status, location, and highway corridor tracking',
    },
    {
      icon: Fuel,
      title: 'Fuel Monitoring',
      description: 'RS-485 capacitive sensors, drain alarms & pump bill reconciliation',
    },
    {
      icon: Compass,
      title: 'Trip Management',
      description: 'Fast dispatch, driver assignment, trip advances, and cargo milestones',
    },
    {
      icon: CreditCard,
      title: 'Expense Tracking',
      description: 'Paperless khata for toll cash, driver bhatta, and repair photo receipts',
    },
    {
      icon: LineChart,
      title: 'Operational Insights',
      description: 'Trip-wise profitability, average km/L fleet benchmarks, and audit logs',
    },
  ];

  return (
    <div className="bg-slate-900 border-y border-slate-800 py-6 sm:py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
