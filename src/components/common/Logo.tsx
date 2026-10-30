import React from 'react';
import { Truck } from 'lucide-react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 shadow-md shadow-sky-500/20 text-white ${
        size === 'sm' ? 'p-1.5' : size === 'md' ? 'p-2.5' : 'p-3.5'
      }`}>
        <Truck className={iconSizes[size]} strokeWidth={2.2} />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${titleSizes[size]} ${isLight ? 'text-white' : 'text-slate-900'}`}>
            Saarthi
          </span>
          <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-sky-100 text-sky-800 border border-sky-200">
            Operations
          </span>
        </div>
        {showTagline && (
          <p className={`text-xs mt-0.5 font-medium ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            Your Fleet. Your Fuel. Your Business. Connected.
          </p>
        )}
      </div>
    </div>
  );
};
