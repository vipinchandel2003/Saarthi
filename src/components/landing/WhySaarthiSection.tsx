import React from 'react';
import {
  CheckCircle,
  Clock,
  Eye,
  FileCheck,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

export const WhySaarthiSection: React.FC = () => {
  const principles = [
    {
      title: 'Connected Workflows',
      description: 'Bring fleet tracking, fuel monitoring, driver apps, and trip khata into one unified workspace instead of juggling multiple disconnected systems.',
      icon: Layers,
      benefit: 'Zero App Switching',
    },
    {
      title: 'Better Visibility',
      description: 'Make fleet and trip information accessible anywhere from a smartphone or laptop, whether you are at the transport depot or on the road.',
      icon: Eye,
      benefit: 'Real-time Telemetry',
    },
    {
      title: 'Accountable Records',
      description: 'Organize fuel refill entries, cash memos, toll tickets, and maintenance bills with geotagged photographic proof to eliminate disputes.',
      icon: FileCheck,
      benefit: 'Tamper-Evident Khata',
    },
    {
      title: 'Operational Clarity',
      description: 'Filter noise and slosh with rule-engine confidence scoring, highlighting only verified fuel drops and dispatch bottlenecks that need action.',
      icon: ShieldCheck,
      benefit: 'Low False Alarms',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            Practical Design Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Built for the Realities of Transport Operations.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Designed from ground research with 5–100 truck operators across Indian logistics corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-teal-400">
                  <span>{item.benefit}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
