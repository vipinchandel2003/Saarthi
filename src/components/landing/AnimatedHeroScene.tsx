import React from 'react';
import { Compass, Fuel, Gauge, MapPin, Radio, ShieldCheck, Truck } from 'lucide-react';

export const AnimatedHeroScene: React.FC = () => {
  return (
    <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[460px] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 select-none">
      {/* Background Distant Horizon, Stars & Mountain Silhouettes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Stars / Sky glow */}
        <div className="absolute top-4 left-1/4 w-1.5 h-1.5 rounded-full bg-sky-200/60 animate-pulse" />
        <div className="absolute top-12 left-1/2 w-2 h-2 rounded-full bg-amber-200/40" />
        <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-sky-300/50 animate-pulse" />
        <div className="absolute top-20 right-1/6 w-2 h-2 rounded-full bg-emerald-200/40" />

        {/* Ambient Gradient Sky Overlays */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[400px] h-[250px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mountain Horizon Line (SVG) */}
        <svg
          viewBox="0 0 1200 200"
          className="absolute bottom-24 sm:bottom-28 w-full h-28 sm:h-36 opacity-35 object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 Q180,60 360,110 T720,80 T1080,130 T1200,90 L1200,200 L0,200 Z"
            fill="#1e293b"
          />
          <path
            d="M0,150 Q240,110 480,140 T960,120 T1200,160 L1200,200 L0,200 Z"
            fill="#0f172a"
          />
        </svg>

        {/* Distant Toll Plaza / City Silhouettes */}
        <div className="absolute bottom-24 sm:bottom-28 right-16 sm:right-32 flex items-end gap-1 opacity-25">
          <div className="w-4 h-12 bg-slate-700 rounded-t" />
          <div className="w-6 h-20 bg-slate-800 rounded-t" />
          <div className="w-5 h-16 bg-slate-700 rounded-t" />
          <div className="w-8 h-24 bg-slate-800 rounded-t" />
        </div>
      </div>

      {/* The Asphalt Highway */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-b from-slate-900 to-slate-950 border-t-2 border-slate-800">
        {/* Road Surface Texture / Shoulder */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500/60 shadow-xs" />
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-slate-700/50" />

        {/* Rapidly Moving White Dashed Highway Lane Markings */}
        <svg className="w-full h-8 absolute top-8 sm:top-10 left-0">
          <line
            x1="0"
            y1="4"
            x2="100%"
            y2="4"
            stroke="#f8fafc"
            strokeWidth="3.5"
            strokeDasharray="40 40"
            className="animate-road-move opacity-85"
          />
        </svg>

        {/* Reflected road ground glow */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Continuously Moving Indian Heavy Transport Vehicle (SVG + CSS) */}
      <div className="absolute bottom-12 sm:bottom-14 left-0 w-full pointer-events-none z-10 overflow-hidden">
        <div className="animate-truck-drive flex items-end" style={{ willChange: 'transform' }}>
          {/* Main Truck Assembly with subtle chassis bounce */}
          <div className="animate-truck-bounce relative flex items-end">
            {/* Front Headlight Beam glowing onto road */}
            <div className="absolute bottom-2 -right-36 w-44 h-14 bg-gradient-to-r from-amber-300/50 via-amber-200/20 to-transparent transform -skew-y-3 blur-xs animate-headlight pointer-events-none" />

            {/* SVG Illustration of Indian Multi-Axle Container Hauler (Tata Signa style) */}
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
            >
              <defs>
                {/* Truck Cabin Gradient */}
                <linearGradient id="cabinGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="60%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#075985" />
                </linearGradient>

                {/* 40ft Container Gradient */}
                <linearGradient id="cargoGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>

                {/* Chrome / Metal Accents */}
                <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              {/* 1. Heavy Trailer Chassis Beam */}
              <rect x="15" y="98" width="310" height="10" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* 2. Fuel Tank (365L Capacitive Sensor Fitted) */}
              <rect x="140" y="88" width="55" height="18" rx="5" fill="#475569" stroke="#64748b" strokeWidth="1" />
              <text x="167" y="100" fill="#38bdf8" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                DIESEL 365L
              </text>
              {/* RS-485 Sensor Head Indicator on Tank */}
              <circle cx="167" cy="88" r="2.5" fill="#38bdf8" />
              <circle cx="167" cy="88" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="0.75" className="animate-ping" />

              {/* 3. High-Cube Cargo Container */}
              <rect x="20" y="24" width="220" height="76" rx="4" fill="url(#cargoGrad)" stroke="#475569" strokeWidth="2" />
              
              {/* Container Vertical Ribs */}
              {[45, 70, 95, 120, 145, 170, 195, 220].map((x, i) => (
                <line key={i} x1={x} y1="26" x2={x} y2="98" stroke="#0f172a" strokeWidth="2" />
              ))}

              {/* Saarthi Brand & Connected Telematics Badge on Cargo */}
              <g transform="translate(60, 48)">
                <rect width="110" height="28" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="28" y="18" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                  Saarthi
                </text>
                <circle cx="16" cy="14" r="6" fill="#0284c7" />
                <text x="16" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  S
                </text>
                <text x="82" y="17" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">
                  GPS LIVE
                </text>
              </g>

              {/* Reflective Safety Stripes */}
              <line x1="22" y1="94" x2="238" y2="94" stroke="#f59e0b" strokeWidth="3" strokeDasharray="12 8" />

              {/* 4. Heavy Truck Cabin (Right side facing direction of travel) */}
              {/* Main Cabin Body */}
              <path
                d="M242,98 L242,42 Q244,32 256,32 L290,32 Q302,32 308,42 L320,62 L328,66 Q332,70 332,76 L332,98 Z"
                fill="url(#cabinGrad)"
                stroke="#0369a1"
                strokeWidth="2"
              />

              {/* Aerodynamic Roof Deflector */}
              <path d="M242,32 Q270,16 300,32 Z" fill="#0369a1" />

              {/* Windshield */}
              <path
                d="M288,38 L304,44 L314,62 L288,62 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              {/* Windshield glare reflection */}
              <path d="M292,42 L308,60" stroke="#bae6fd" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

              {/* Driver Side Window */}
              <rect x="256" y="42" width="26" height="20" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              {/* Driver silhouette */}
              <circle cx="268" cy="52" r="4" fill="#64748b" />
              <path d="M262,60 Q268,54 274,60 Z" fill="#64748b" />

              {/* Front Chrome Bumper & Grille */}
              <rect x="318" y="74" width="16" height="24" rx="2" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1" />
              <line x1="320" y1="80" x2="332" y2="80" stroke="#334155" strokeWidth="1.5" />
              <line x1="320" y1="86" x2="332" y2="86" stroke="#334155" strokeWidth="1.5" />
              <line x1="320" y1="92" x2="332" y2="92" stroke="#334155" strokeWidth="1.5" />

              {/* High Intensity LED Headlights */}
              <rect x="328" y="76" width="6" height="8" rx="1.5" fill="#fef08a" stroke="#f59e0b" strokeWidth="1" />
              <circle cx="331" cy="80" r="2.5" fill="#ffffff" />

              {/* Side Mirror */}
              <rect x="306" y="50" width="3" height="12" rx="1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />

              {/* Chrome Vertical Exhaust Stack */}
              <rect x="244" y="14" width="5" height="30" rx="1.5" fill="url(#metalGrad)" />
              {/* Subtle exhaust heat particle */}
              <circle cx="246" cy="10" r="2" fill="#94a3b8" opacity="0.4" />

              {/* 5. Dual Rear & Front Wheel Assemblies with Spoke Rims */}
              {/* Wheel 1 (Rear Axle 1) */}
              <g transform="translate(50, 108)">
                <circle cx="0" cy="0" r="18" fill="#020617" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="#1e293b" />
                <g className="animate-wheel-spin">
                  <circle cx="0" cy="0" r="7" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2.5" fill="#f8fafc" />
                </g>
              </g>

              {/* Wheel 2 (Rear Axle 2) */}
              <g transform="translate(90, 108)">
                <circle cx="0" cy="0" r="18" fill="#020617" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="#1e293b" />
                <g className="animate-wheel-spin">
                  <circle cx="0" cy="0" r="7" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2.5" fill="#f8fafc" />
                </g>
              </g>

              {/* Wheel 3 (Cabin Steer Axle) */}
              <g transform="translate(295, 108)">
                <circle cx="0" cy="0" r="18" fill="#020617" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="#1e293b" />
                <g className="animate-wheel-spin">
                  <circle cx="0" cy="0" r="7" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2.5" fill="#f8fafc" />
                </g>
              </g>

              {/* Rear Mudflap with Saarthi safety mark */}
              <rect x="25" y="104" width="4" height="16" fill="#f59e0b" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
