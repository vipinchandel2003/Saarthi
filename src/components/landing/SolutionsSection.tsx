import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Compass,
  CreditCard,
  Fuel,
  LayoutDashboard,
  Shield,
  Smartphone,
  Truck,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SolutionsSectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onSelectRole }) => {
  const roles: {
    role: UserRole;
    title: string;
    persona: string;
    badge: string;
    icon: any;
    color: string;
    highlights: string[];
    description: string;
  }[] = [
    {
      role: 'owner',
      title: 'Fleet Owners',
      persona: 'Rajesh Agrawal • Agrawal Roadlines',
      badge: 'Portal 1',
      icon: Truck,
      color: 'from-sky-500 to-blue-600',
      description: 'Gain full operational transparency across all vehicles and trips without spending hours at the transport depot.',
      highlights: [
        'Fleet health KPIs & active vehicle states',
        'Fuel Proof Reports with tamper evidence',
        'Trip P&L and operational expense khata',
        'Daily WhatsApp summary at 8:00 PM',
      ],
    },
    {
      role: 'manager',
      title: 'Managers & Dispatchers',
      persona: 'Vikram Chouhan • Operations Manager',
      badge: 'Portal 2',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-700',
      description: 'Prioritize daily task completion, rapid trip dispatches, asset availability checks, and expense approvals.',
      highlights: [
        'Fast trip creation & driver assignment',
        'Prevent booking unavailable trucks',
        'Review toll & bhatta receipt photo claims',
        'Alert triage queue ranked by confidence',
      ],
    },
    {
      role: 'driver',
      title: 'Truck Drivers',
      persona: 'Ramesh Verma • Senior Driver',
      badge: 'Portal 3 (Mobile)',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
      description: 'A mobile-friendly, bilingual (हिंदी / English) smartphone interface designed for Indian transport conditions.',
      highlights: [
        'Log diesel refills in under 3 taps',
        'Upload pump meter & cash receipt photos',
        'DPDP privacy consent & honesty record',
        'Works offline in highway dead zones',
      ],
    },
    {
      role: 'installer',
      title: 'Installers & Technicians',
      persona: 'Mukesh Sharma • Telematics Tech',
      badge: 'Portal 4',
      icon: Wrench,
      color: 'from-amber-500 to-orange-600',
      description: 'Perform error-free hardware fittings and tank calibrations in under 90 minutes per commercial vehicle.',
      highlights: [
        'QR code scanning & tracker pairing',
        'Multi-point tank calibration curve tool',
        'Live Codec 8 TCP packet verification test',
        'Sensor installation quality checklist',
      ],
    },
    {
      role: 'admin',
      title: 'Platform Administrators',
      persona: 'Amitabh Sengupta • Operations Head',
      badge: 'Portal 5',
      icon: Shield,
      color: 'from-purple-500 to-violet-700',
      description: 'Maintain multi-tenant isolation, manage transporter organizations, and inspect central device health.',
      highlights: [
        'Multi-tenant fleet management & plans',
        'Role-based access control (RBAC)',
        'Teltonika tracker voltage & SIM health',
        'Tamper-evident SHA-256 audit ledger',
      ],
    },
  ];

  return (
    <section id="solutions" className="py-20 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            Tailored Role Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Designed for Every Stakeholder in Transport
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Saarthi unifies the transport chain. Each user gets a dedicated, role-tailored portal to do their job faster.
          </p>
        </div>

        {/* 5-Role Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-mono text-sky-400 mt-0.5">
                      {item.persona}
                    </p>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6">
                  <button
                    onClick={() => onSelectRole(item.role)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>Launch {item.title} Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
