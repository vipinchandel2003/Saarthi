import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle,
  FileText,
  Fuel,
  Info,
  Layers,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface FuelTransparencySectionProps {
  onOpenDashboard: () => void;
}

export const FuelTransparencySection: React.FC<FuelTransparencySectionProps> = ({
  onOpenDashboard,
}) => {
  return (
    <section id="fuel-transparency" className="py-20 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Fuel Proof & Reconciliation Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Know Where Your Fuel and Money Go.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Keep fuel records, trip expenses, and supporting evidence organized so your team can review unusual activity and understand operational costs.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Conceptual Value Points */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-1">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Fuel Proof Evidence Packs</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Every sudden drain alert pairs the RS-485 capacitive sensor curve with GPS coordinates, engine ignition states, and vehicle speed. No more guesswork or false alarms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Driver Honesty Protection</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Driver claims are reconciled directly against tank sensor level rises. Honest drivers are vindicated with objective proof, protecting them from unjust accusations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">5% Tolerance Thresholds</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Configurable tolerances account for road grade, thermal expansion, and liquid slosh. Alerts only trigger when discrepancies exceed verified operational limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDashboard}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
              >
                <span>Inspect Fuel Proof Reports in Portal</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Right Column: Demonstration Anomaly Card (PRD Section 7.5) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-5">
              {/* Top Alert Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-orange-600 text-white">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-white">MP 09 HG 4821</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Review Required
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">IOCL Swastik Fuel Station, Sendhwa Bypass</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Confidence</span>
                  <p className="text-base font-black text-white font-mono">92%</p>
                </div>
              </div>

              {/* Reconciliation Numbers */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Driver Bill</p>
                  <p className="text-base font-black text-white font-mono mt-1">145 Litres</p>
                  <p className="text-[9px] text-slate-500">Claim ₹13,630</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Sensor Detected</p>
                  <p className="text-base font-black text-sky-400 font-mono mt-1">118 Litres</p>
                  <p className="text-[9px] text-slate-500">Capacitive RS-485</p>
                </div>
                <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-500/30">
                  <p className="text-[10px] text-rose-300 uppercase font-semibold">Discrepancy</p>
                  <p className="text-base font-black text-rose-400 font-mono mt-1">-27 Litres</p>
                  <p className="text-[9px] text-rose-300 font-bold">18.6% Variance</p>
                </div>
              </div>

              {/* Supporting Photographic Evidence Preview */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span>Attached Driver Photographs (Geotagged & Timestamped)</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 h-28 group">
                    <img
                      src="https://images.unsplash.com/photo-1579734662649-807f6144c661?w=400&auto=format&fit=crop&q=80"
                      alt="Dispenser meter"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-slate-950/90 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                      Dispenser Meter
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 h-28 group">
                    <img
                      src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80"
                      alt="Fuel cash memo receipt"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-slate-950/90 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                      Pump Cash Memo
                    </span>
                  </div>
                </div>
              </div>

              {/* Assessment disclaimer note */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-white font-bold">Engine Assessment: </span>
                Demonstration sample record. In live operations, this allows fleet owners to confront pump fraud or clear honest drivers without friction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
