import React from 'react';
import {
  BarChart3,
  CheckCircle,
  Compass,
  FileCheck,
  Fuel,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Fleet',
      description: 'Add your vehicles, drivers, and relevant fleet information. Technicians pair certified Teltonika GPS trackers and capacitive fuel sensors.',
      icon: Truck,
      badge: 'Step 1 • Onboarding',
    },
    {
      step: '02',
      title: 'Plan & Assign Trips',
      description: 'Organize transport operations, check asset availability, and assign vehicles and verified drivers with agreed freight and advances.',
      icon: Compass,
      badge: 'Step 2 • Dispatch',
    },
    {
      step: '03',
      title: 'Record Operations',
      description: 'Drivers log fuel fills and expenses with meter & bill photos via the mobile app in under 3 taps, even in low-connectivity highway zones.',
      icon: Fuel,
      badge: 'Step 3 • In Transit',
    },
    {
      step: '04',
      title: 'Review & Improve',
      description: 'Review automated fuel reconciliation, investigate flagged anomalies with evidence packs, and optimize operational margins.',
      icon: BarChart3,
      badge: 'Step 4 • Insights',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            Simple 4-Step Operational Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            How Saarthi Operates Across Your Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            A seamless bridge connecting fleet owners, managers, drivers, and telematics hardware.
          </p>
        </div>

        {/* Steps Grid with Connected Flow Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-3xl bg-slate-950 p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition shadow-xl"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl font-black text-sky-500/40">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mt-4 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-900 mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fully Integrated Workflow</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
