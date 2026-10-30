import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'sky' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  accentColor = 'sky',
  onClick,
}) => {
  const accentStyles = {
    sky: 'border-l-sky-500 text-sky-600 bg-sky-50',
    emerald: 'border-l-emerald-500 text-emerald-600 bg-emerald-50',
    amber: 'border-l-amber-500 text-amber-600 bg-amber-50',
    rose: 'border-l-rose-500 text-rose-600 bg-rose-50',
    indigo: 'border-l-indigo-500 text-indigo-600 bg-indigo-50',
    purple: 'border-l-purple-500 text-purple-600 bg-purple-50',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-white p-5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 ${accentStyles[accentColor].split(' ')[0]} ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{title}</p>
        <div className={`p-2 rounded-lg ${accentStyles[accentColor].split(' ').slice(1).join(' ')}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
        {trend && (
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              trend.isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-500 font-medium">{subtext}</p>}
    </div>
  );
};
