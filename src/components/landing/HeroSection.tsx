import React from 'react';
import { AnimatedHeroScene } from './AnimatedHeroScene';
import {
  ArrowRight,
  CheckCircle,
  Compass,
  Fuel,
  Gauge,
  LayoutDashboard,
  MapPin,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDashboard: () => void;
  onOpenOnboarding: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDashboard,
  onOpenOnboarding,
}) => {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-slate-950 overflow-hidden text-white">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-sky-400 text-xs font-bold shadow-md shadow-sky-500/5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Saarthi – Operations Management System v0.1</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-normal">Indore Pilot Corridor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Your Fleet. Your Fuel.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200">
                Your Business. Connected.
              </span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Take control of every trip, track your fleet, monitor fuel activity, and manage transport operations from one intelligent platform. Built specifically for Indian transporters and fleet owners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => handleScrollTo('#features')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-sky-500/20 hover:opacity-95 transition transform active:scale-95 flex items-center gap-2"
              >
                <span>Explore Saarthi</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={onOpenDashboard}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/90 shadow-lg hover:border-sky-500/50 transition flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-sky-400" />
                <span>Open Dashboard</span>
              </button>

              <button
                onClick={() => handleScrollTo('#how-it-works')}
                className="px-4 py-3.5 text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5"
              >
                <span>See How It Works</span>
                <span>↓</span>
              </button>
            </div>

            {/* Quick Highlights Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Real-Time Fuel Proof
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Driver Honesty Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Alerts at 8 PM
              </span>
            </div>
          </div>

          {/* Right Column: Hero Floating Demonstration Tracking Card (Section 5) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-5 shadow-2xl shadow-sky-950/50 space-y-4 animate-float-card">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-white">MP 09 HG 4821</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        ON TRIP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Tata Signa 4825.TK (16 Wheeler)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                  <p className="text-xs font-mono font-bold text-emerald-400">Live 10s</p>
                </div>
              </div>

              {/* Trip Route Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="font-bold text-slate-200">Indore Depot ➔ Bhiwandi Logistics Hub</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Location:</span>
                  <span className="text-sky-300 font-medium truncate max-w-[210px]">
                    NH-52 Sendhwa Bypass, MH Border
                  </span>
                </div>
              </div>

              {/* Animated Trip Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Trip Progression</span>
                  <span className="font-bold text-sky-400">68% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-1000"
                    style={{ width: '68%' }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>394 km traversed</span>
                  <span>186 km remaining</span>
                </div>
              </div>

              {/* Live Telemetry Sensors Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Speed</p>
                  <p className="text-sm font-black text-white font-mono">58 km/h</p>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Diesel Level</p>
                  <p className="text-sm font-black text-sky-400 font-mono">284 L</p>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Sensor</p>
                  <p className="text-sm font-black text-emerald-400 font-mono">RS-485</p>
                </div>
              </div>

              {/* Demonstration Disclaimer Pill */}
              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>Demonstration telemetry via Teltonika FMC130 Codec 8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Animated Highway with Moving Transport Vehicle (Section 4 Mandatory Feature) */}
      <div className="mt-8 relative z-10">
        <AnimatedHeroScene />
      </div>
    </section>
  );
};
