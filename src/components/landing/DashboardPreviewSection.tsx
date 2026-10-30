import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Compass,
  CreditCard,
  Fuel,
  LayoutDashboard,
  MapPin,
  Maximize2,
  ShieldAlert,
  Truck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardPreviewSectionProps {
  onOpenDashboard: () => void;
}

export const DashboardPreviewSection: React.FC<DashboardPreviewSectionProps> = ({
  onOpenDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'fuel'>('overview');

  const fuelSampleData = [
    { time: '02:00', litres: 182 },
    { time: '02:20', litres: 181 },
    { time: '02:38', litres: 178 },
    { time: '02:42', litres: 155 },
    { time: '02:45', litres: 142 },
    { time: '03:15', litres: 142 },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
              Application Interface
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Engineered for Speed, Clarity, and Daily Control.
            </h2>
            <p className="text-sm text-slate-400 font-normal">
              A single operational cockpit for transport business owners and dispatchers. No scattered notebooks or disconnected WhatsApp groups.
            </p>
          </div>

          <button
            onClick={onOpenDashboard}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Explore the Live Dashboard</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Browser Mockup Window */}
        <div className="rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
          {/* Top Browser Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800">
                <span className="text-emerald-400 font-bold">https://</span>
                <span>app.saarthifleet.in/portal/owner</span>
              </div>
            </div>

            {/* Interactive Tab Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeTab === 'overview'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Owner Overview
              </button>
              <button
                onClick={() => setActiveTab('trips')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeTab === 'trips'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Trip Operations
              </button>
              <button
                onClick={() => setActiveTab('fuel')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeTab === 'fuel'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Fuel Monitoring
              </button>
            </div>
          </div>

          {/* Browser Preview Body */}
          <div className="p-6 bg-slate-950 space-y-6">
            {/* TAB 1: OWNER OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-sky-500">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Fleet</p>
                    <p className="text-2xl font-black text-white font-mono mt-1">18 Trucks</p>
                    <p className="text-[11px] text-emerald-400 font-medium mt-1">14 Currently in Transit</p>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-rose-500">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Fuel Anomalies</p>
                    <p className="text-2xl font-black text-rose-400 font-mono mt-1">2 Pending</p>
                    <p className="text-[11px] text-rose-300 font-medium mt-1">1 Suspected Drain (96%)</p>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-amber-500">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Diesel Expenditure</p>
                    <p className="text-2xl font-black text-amber-400 font-mono mt-1">₹37,600</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Reconciled via RS-485</p>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 border-l-4 border-l-emerald-500">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Khata Expenses</p>
                    <p className="text-2xl font-black text-emerald-400 font-mono mt-1">₹87,550</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Toll, Bhatta & Repairs</p>
                  </div>
                </div>

                {/* Urgent Anomaly Banner */}
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-rose-600 text-white">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">
                        MP 09 GF 1928: Suspected Fuel Drain (38.5 Litres Lost in 8 mins)
                      </p>
                      <p className="text-[11px] text-rose-300">
                        Stationary at Dhule Bypass with engine OFF. Fuel Proof Report generated with 96% confidence.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenDashboard}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition shrink-0"
                  >
                    View Proof →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: TRIP OPERATIONS */}
            {activeTab === 'trips' && (
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                  <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex justify-between font-bold text-slate-300">
                    <span>Active Dispatches (Live Corridors)</span>
                    <span className="text-sky-400 font-mono">4 Trips In Progress</span>
                  </div>
                  <div className="divide-y divide-slate-800/80">
                    {[
                      { num: 'TRP-2026-1042', route: 'Indore Depot ➔ Bhiwandi Logistics Hub', veh: 'MP 09 HG 4821', driver: 'Ramesh Verma', freight: '₹64,000', adv: '₹20,000' },
                      { num: 'TRP-2026-1043', route: 'Pithampur SEZ ➔ Ahmedabad Aslali Yard', veh: 'MP 09 GF 1928', driver: 'Suresh Yadav', freight: '₹42,000', adv: '₹12,000' },
                      { num: 'TRP-2026-1044', route: 'Dewas Industrial Area ➔ Nagpur Transport', veh: 'MP 09 CX 3320', driver: 'Jagdish Solanki', freight: '₹48,000', adv: '₹15,000' },
                    ].map((row, i) => (
                      <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-800/50 transition">
                        <div>
                          <p className="font-mono font-bold text-sky-400">{row.num} • {row.veh}</p>
                          <p className="text-slate-300 font-medium">{row.route}</p>
                          <p className="text-[10px] text-slate-500">Driver: {row.driver}</p>
                        </div>
                        <div className="text-right font-mono">
                          <p className="text-emerald-400 font-bold">{row.freight}</p>
                          <p className="text-[10px] text-slate-400">Adv: {row.adv}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FUEL MONITORING */}
            {activeTab === 'fuel' && (
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xs text-white flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-sky-400" />
                      Live Capacitive Fuel Curve (Litres vs Time on MP 09 GF 1928)
                    </h4>
                    <span className="text-[10px] font-mono text-rose-400 font-bold">
                      -38.5L Drain Detected
                    </span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={fuelSampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} domain={[130, 190]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="litres" stroke="#ef4444" strokeWidth={2.5} fill="#ef4444" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
