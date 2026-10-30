import React, { useState } from 'react';
import { Vehicle } from '../../types';
import {
  Compass,
  Gauge,
  Layers,
  MapPin,
  Navigation,
  Play,
  RotateCcw,
  Sparkles,
  Truck,
  Volume2,
  Zap,
} from 'lucide-react';

interface LiveMapProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  onSelectVehicle?: (vehicle: Vehicle) => void;
  height?: string;
}

// Key route stops along Central India / Indore-Mumbai / Gujarat Corridors
const ROUTE_WAYPOINTS = [
  { name: 'Indore Depot', x: 260, y: 160, hub: true },
  { name: 'Pithampur SEZ', x: 230, y: 190, hub: true },
  { name: 'Dewas Yard', x: 290, y: 130, hub: false },
  { name: 'Sendhwa Bypass', x: 250, y: 280, hub: false },
  { name: 'Dhule Junction', x: 270, y: 370, hub: true },
  { name: 'Malegaon Dhabha', x: 280, y: 430, hub: false },
  { name: 'Nashik Industrial Area', x: 240, y: 490, hub: false },
  { name: 'Bhiwandi Logistics Hub', x: 200, y: 550, hub: true },
  { name: 'Vadodara Bypass', x: 130, y: 240, hub: false },
  { name: 'Ahmedabad Aslali Yard', x: 100, y: 180, hub: true },
];

export const LiveMap: React.FC<LiveMapProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  height = '560px',
}) => {
  const [isPlayingTrail, setIsPlayingTrail] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(3);
  const [mapStyle, setMapStyle] = useState<'light' | 'dark' | 'terrain'>('light');

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Map vehicle coordinates roughly into SVG canvas coordinates
  const getCoordinates = (veh: Vehicle, idx: number) => {
    // Generate deterministic coordinate layout on route based on vehicle id
    const baseCoords: Record<string, { x: number; y: number }> = {
      veh_01: { x: 255, y: 320 }, // NH-52 Sendhwa-Shirpur
      veh_02: { x: 130, y: 240 }, // Vadodara
      veh_03: { x: 330, y: 220 }, // Betul
      veh_04: { x: 340, y: 130 }, // Bhopal
      veh_05: { x: 272, y: 390 }, // Dhule
      veh_06: { x: 265, y: 165 }, // Indore city
    };
    return baseCoords[veh.id] || { x: 200 + (idx * 30), y: 200 + (idx * 45) };
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md flex flex-col" style={{ height }}>
      {/* Top Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-lg text-white text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">Central India Fleet Grid (Indore Hub)</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 font-mono">{vehicles.length} Trackers Online</span>
        </div>

        {/* Map Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsPlayingTrail(!isPlayingTrail)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md transition ${
              isPlayingTrail
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900/90 backdrop-blur-md text-white border border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingTrail ? 'animate-spin' : ''}`} />
            {isPlayingTrail ? 'Replaying Trip Track...' : 'Track Playback'}
          </button>

          <div className="flex bg-slate-900/90 backdrop-blur-md rounded-xl p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setMapStyle('light')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                mapStyle === 'light' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Road
            </button>
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                mapStyle === 'dark' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="w-full h-full relative bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing">
        <svg
          viewBox="0 0 500 620"
          className="w-full h-full object-cover"
          style={{
            background:
              mapStyle === 'light'
                ? '#0f172a'
                : mapStyle === 'dark'
                ? '#030712'
                : '#0b192c',
          }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.75" />
            </pattern>
            {/* Pulse Filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="500" height="620" fill="url(#grid)" />

          {/* Major National Highway Lines */}
          {/* NH-52: Indore -> Sendhwa -> Dhule -> Nashik -> Bhiwandi */}
          <path
            d="M 260 160 Q 250 250 250 280 T 270 370 T 240 490 T 200 550"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={isPlayingTrail ? '6 4' : 'none'}
            className={isPlayingTrail ? 'animate-pulse' : ''}
          />
          {/* Indore to Ahmedabad Route */}
          <path
            d="M 260 160 Q 180 200 130 240 T 100 180"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
          {/* Indore to Dewas & Bhopal Route */}
          <path
            d="M 260 160 L 290 130 L 340 130"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
          {/* Indore to Betul / Nagpur Route */}
          <path
            d="M 260 160 Q 290 190 330 220"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />

          {/* Route Stop / Hub Circles */}
          {ROUTE_WAYPOINTS.map((wp, i) => (
            <g key={i}>
              <circle
                cx={wp.x}
                cy={wp.y}
                r={wp.hub ? 5 : 3.5}
                fill={wp.hub ? '#38bdf8' : '#64748b'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text
                x={wp.x + 8}
                y={wp.y + 4}
                fill="#94a3b8"
                fontSize="10"
                fontWeight={wp.hub ? 'bold' : 'normal'}
                className="select-none font-sans"
              >
                {wp.name}
              </text>
            </g>
          ))}

          {/* Vehicle Markers */}
          {vehicles.map((veh, idx) => {
            const coords = getCoordinates(veh, idx);
            const isSelected = veh.id === selectedVehicle?.id;
            const isRunning = veh.status === 'running';
            const color = isRunning ? '#10b981' : veh.status === 'idle' ? '#f59e0b' : veh.status === 'stopped' ? '#94a3b8' : '#f43f5e';

            return (
              <g
                key={veh.id}
                className="cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => onSelectVehicle && onSelectVehicle(veh)}
              >
                {/* Radar ripple for running vehicles */}
                {isRunning && (
                  <circle cx={coords.x} cy={coords.y} r="18" fill={color} opacity="0.25">
                    <animate attributeName="r" values="8;24;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Marker Outer Ring */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? 14 : 10}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 3 : 2}
                  filter="url(#glow)"
                />

                {/* Vehicle Truck Icon inside marker */}
                <circle cx={coords.x} cy={coords.y} r={isSelected ? 7 : 5} fill="#0f172a" />

                {/* Registration Callout label */}
                <g transform={`translate(${coords.x - 38}, ${coords.y - 28})`}>
                  <rect
                    width="76"
                    height="18"
                    rx="4"
                    fill={isSelected ? '#0284c7' : '#1e293b'}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x="38"
                    y="12"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="bold"
                    className="font-mono tracking-tight"
                  >
                    {veh.registrationNumber.replace('MP 09 ', '')} • {veh.location.speedKmph}k
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Vehicle Floating Cockpit Card */}
      {selectedVehicle && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/95 backdrop-blur-md rounded-xl p-4 border border-slate-700/80 shadow-2xl text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-white tracking-wide font-mono">
                    {selectedVehicle.registrationNumber}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedVehicle.status === 'running'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : selectedVehicle.status === 'idle'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : selectedVehicle.status === 'stopped'
                        ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {selectedVehicle.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  {selectedVehicle.location.address}
                </p>
              </div>
            </div>

            {/* Quick Live Telemetry Readings */}
            <div className="flex items-center gap-6 text-xs border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-6">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Speed</p>
                <p className="text-base font-black text-white font-mono flex items-baseline gap-0.5">
                  {selectedVehicle.location.speedKmph} <span className="text-xs font-normal text-slate-400">km/h</span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Fuel Tank</p>
                <p className="text-base font-black text-sky-400 font-mono flex items-baseline gap-0.5">
                  {selectedVehicle.currentFuelL} <span className="text-xs font-normal text-slate-400">/ {selectedVehicle.tankCapacityL} L</span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Driver</p>
                <p className="text-sm font-semibold text-slate-200">
                  {selectedVehicle.assignedDriverName || 'Not Assigned'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Battery</p>
                <p className="text-sm font-mono text-emerald-400 font-bold">
                  {selectedVehicle.batteryVoltage} V
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demonstration / GPS disclaimer pill */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
        Teltonika FMC130 Codec 8 (Simulated Real-time Ingest)
      </div>
    </div>
  );
};
