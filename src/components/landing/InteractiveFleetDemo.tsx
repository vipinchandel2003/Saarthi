import React, { useState } from 'react';
import {
  Compass,
  Filter,
  Fuel,
  Gauge,
  MapPin,
  Radio,
  RotateCcw,
  Search,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface DemoVehicle {
  id: string;
  reg: string;
  type: string;
  driver: string;
  phone: string;
  status: 'running' | 'idle' | 'stopped';
  origin: string;
  destination: string;
  progressPercent: number;
  fuelLitres: number;
  tankCapacity: number;
  speedKmph: number;
  lastUpdated: string;
  coords: { x: number; y: number };
}

const INITIAL_DEMO_VEHICLES: DemoVehicle[] = [
  {
    id: 'v1',
    reg: 'MP 09 HG 4821',
    type: 'Tata Signa 4825.TK (16 Wheeler)',
    driver: 'Ramesh Verma',
    phone: '+91 91112 34567',
    status: 'running',
    origin: 'Indore Depot',
    destination: 'Bhiwandi Hub, Mumbai',
    progressPercent: 68,
    fuelLitres: 284,
    tankCapacity: 365,
    speedKmph: 58,
    lastUpdated: 'Just now',
    coords: { x: 250, y: 320 },
  },
  {
    id: 'v2',
    reg: 'MP 09 AB 1234',
    type: 'BharatBenz 3528C Heavy Hauler',
    driver: 'Jagdish Solanki',
    phone: '+91 94240 55901',
    status: 'running',
    origin: 'Pithampur SEZ',
    destination: 'Ahmedabad Aslali Yard',
    progressPercent: 42,
    fuelLitres: 310,
    tankCapacity: 400,
    speedKmph: 52,
    lastUpdated: '2 mins ago',
    coords: { x: 140, y: 220 },
  },
  {
    id: 'v3',
    reg: 'MP 09 CD 5678',
    type: 'Ashok Leyland 2820 BS6',
    driver: 'Suresh Yadav',
    phone: '+91 98270 44123',
    status: 'idle',
    origin: 'Dewas Yard',
    destination: 'Nagpur Ring Road',
    progressPercent: 15,
    fuelLitres: 195,
    tankCapacity: 375,
    speedKmph: 0,
    lastUpdated: '4 mins ago',
    coords: { x: 310, y: 190 },
  },
  {
    id: 'v4',
    reg: 'MP 13 EF 9012',
    type: 'Eicher Pro 6028 Multi-Axle',
    driver: 'Pappu Singh',
    phone: '+91 97550 11982',
    status: 'stopped',
    origin: 'Ujjain Logistics Park',
    destination: 'Bhopal Transport Nagar',
    progressPercent: 90,
    fuelLitres: 88,
    tankCapacity: 350,
    speedKmph: 0,
    lastUpdated: '18 mins ago',
    coords: { x: 350, y: 130 },
  },
  {
    id: 'v5',
    reg: 'MP 09 GH 3456',
    type: 'Tata Ultra 1918.T Medium Cargo',
    driver: 'Balwinder Singh',
    phone: '+91 98111 22334',
    status: 'running',
    origin: 'Sanwer Industrial Area',
    destination: 'Pune Chakan MIDC',
    progressPercent: 74,
    fuelLitres: 215,
    tankCapacity: 250,
    speedKmph: 61,
    lastUpdated: 'Just now',
    coords: { x: 260, y: 410 },
  },
];

export const InteractiveFleetDemo: React.FC = () => {
  const [vehicles] = useState<DemoVehicle[]>(INITIAL_DEMO_VEHICLES);
  const [selectedId, setSelectedId] = useState<string>('v1');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'running' | 'idle' | 'stopped'>('all');

  const selectedVehicle = vehicles.find((v) => v.id === selectedId) || vehicles[0];

  const filteredVehicles = vehicles.filter((v) => {
    const matchSearch =
      v.reg.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase()) ||
      v.destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleReset = () => {
    setSearch('');
    setStatusFilter('all');
    setSelectedId('v1');
  };

  return (
    <section id="fleet-demo" className="py-20 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            Hands-On Interactive Demonstration
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            See Your Fleet in Motion.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Interact with simulated vehicle records, track real-time trip progress, and explore live telemetry readings.
          </p>
        </div>

        {/* Demo Cockpit 2-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl">
          {/* Left Panel: Searchable Vehicle List */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Search & Reset Header */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search vehicle reg (MP 09), driver, destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-500"
                  />
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1 shrink-0"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['all', 'running', 'idle', 'stopped'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                      statusFilter === st
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Vehicle Cards List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredVehicles.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800">
                    No vehicles match your search or filter. Click Reset to view all.
                  </div>
                ) : (
                  filteredVehicles.map((v) => {
                    const isSelected = v.id === selectedVehicle.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedId(v.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-sky-950/60 border-sky-500/80 ring-1 ring-sky-500/50'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-white">
                            {v.reg}
                          </span>
                          <StatusBadge status={v.status} size="sm" />
                        </div>

                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                          {v.type} • {v.driver}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                          <span className="text-slate-300 font-medium">➔ {v.destination}</span>
                          <span className="font-mono text-sky-400 font-bold">{v.speedKmph} km/h</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic text-center pt-2">
              Click any vehicle above to inspect route telemetry on the right map.
            </p>
          </div>

          {/* Right Panel: Stylized Map & Real-Time Tracking Visualization */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden h-[340px] sm:h-[380px]">
              {/* SVG Map of Central India Corridor */}
              <svg viewBox="0 0 500 440" className="w-full h-full object-cover">
                <defs>
                  <pattern id="demoGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1e293b" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="500" height="440" fill="url(#demoGrid)" />

                {/* Major NH-52 Highway Route */}
                <path
                  d="M 260 80 Q 250 180 250 240 T 260 320 T 240 380"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                {/* Secondary Routes */}
                <path d="M 260 80 L 140 220" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />
                <path d="M 260 80 L 350 130" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />

                {/* Route Waypoint Hubs */}
                {[
                  { name: 'Indore Depot', x: 260, y: 80 },
                  { name: 'Pithampur SEZ', x: 210, y: 120 },
                  { name: 'Sendhwa Bypass', x: 250, y: 240 },
                  { name: 'Dhule Junction', x: 260, y: 320 },
                  { name: 'Bhiwandi Hub', x: 240, y: 380 },
                  { name: 'Ahmedabad Aslali', x: 140, y: 220 },
                  { name: 'Bhopal Transport', x: 350, y: 130 },
                ].map((wp, i) => (
                  <g key={i}>
                    <circle cx={wp.x} cy={wp.y} r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
                    <text x={wp.x + 7} y={wp.y + 3} fill="#94a3b8" fontSize="9" fontWeight="bold">
                      {wp.name}
                    </text>
                  </g>
                ))}

                {/* Vehicles on Map */}
                {vehicles.map((veh) => {
                  const isCur = veh.id === selectedVehicle.id;
                  const col = veh.status === 'running' ? '#10b981' : veh.status === 'idle' ? '#f59e0b' : '#64748b';
                  return (
                    <g key={veh.id} className="cursor-pointer" onClick={() => setSelectedId(veh.id)}>
                      {isCur && (
                        <circle cx={veh.coords.x} cy={veh.coords.y} r="18" fill="#38bdf8" opacity="0.3">
                          <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={veh.coords.x}
                        cy={veh.coords.y}
                        r={isCur ? 11 : 7}
                        fill={col}
                        stroke="#ffffff"
                        strokeWidth={isCur ? 2.5 : 1.5}
                      />
                      <circle cx={veh.coords.x} cy={veh.coords.y} r={isCur ? 4 : 2.5} fill="#0f172a" />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Map Legend */}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Running
                <span className="w-2 h-2 rounded-full bg-amber-400 ml-1" /> Idle
                <span className="w-2 h-2 rounded-full bg-slate-400 ml-1" /> Stopped
              </div>

              {/* Simulated Tag */}
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-sky-400 font-mono">
                Simulated GPS Corridor
              </div>
            </div>

            {/* Selected Vehicle Telemetry Ribbon */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-white">
                      {selectedVehicle.reg}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({selectedVehicle.type})
                    </span>
                  </div>
                  <p className="text-xs text-sky-300 mt-0.5">
                    {selectedVehicle.origin} ➔ {selectedVehicle.destination}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Progress</span>
                  <p className="text-xs font-mono font-bold text-emerald-400">
                    {selectedVehicle.progressPercent}% Traversing
                  </p>
                </div>
              </div>

              {/* Telemetry Numbers */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-900 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Speed</p>
                  <p className="font-mono font-bold text-white">{selectedVehicle.speedKmph} km/h</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Fuel Level</p>
                  <p className="font-mono font-bold text-sky-400">{selectedVehicle.fuelLitres} L</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Driver</p>
                  <p className="font-bold text-slate-200 truncate">{selectedVehicle.driver}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Last Ping</p>
                  <p className="text-slate-400 text-[11px]">{selectedVehicle.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
