import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  PauseCircle,
  PowerOff,
  ShieldAlert,
  XCircle,
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const norm = status.toLowerCase();

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (norm === 'running' || norm === 'active' || norm === 'online' || norm === 'approved' || norm === 'completed' || norm === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {status.toUpperCase()}
      </span>
    );
  }

  if (norm === 'idle' || norm === 'in_progress' || norm === 'calibrated' || norm === 'warning') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses} ${className}`}>
        <Clock className="w-3 h-3 text-amber-500" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  if (norm === 'stopped' || norm === 'planned' || norm === 'assigned') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
        <PauseCircle className="w-3 h-3 text-slate-500" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  if (norm === 'offline' || norm === 'critical' || norm === 'rejected' || norm === 'tamper_alert' || norm === 'fuel_drain') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses} ${className}`}>
        <ShieldAlert className="w-3 h-3 text-rose-500" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  if (norm === 'reconciliation_mismatch' || norm === 'mismatch_flagged' || norm === 'high') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-orange-50 text-orange-700 border border-orange-200 ${sizeClasses} ${className}`}>
        <AlertTriangle className="w-3 h-3 text-orange-500" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses} ${className}`}>
      {status}
    </span>
  );
};
