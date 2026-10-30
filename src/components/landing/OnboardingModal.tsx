import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Shield,
  Truck,
  UserCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { UserRole } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const [tab, setTab] = useState<'sandbox' | 'pilot'>('sandbox');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [pilotName, setPilotName] = useState('');
  const [pilotPhone, setPilotPhone] = useState('');
  const [pilotFleet, setPilotFleet] = useState('20');

  const demoRoles: {
    role: UserRole;
    title: string;
    description: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'owner',
      title: 'Fleet Owner (Rajesh Agrawal)',
      description: 'Fleet health KPIs, Fuel Proof Reports, WhatsApp summary config',
      icon: Truck,
      color: 'from-sky-500 to-blue-600',
    },
    {
      role: 'manager',
      title: 'Operations Manager (Vikram Chouhan)',
      description: 'Trip planning, driver dispatch, receipt expense approvals',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      role: 'driver',
      title: 'Driver Mobile App (Ramesh Verma)',
      description: '3-tap fuel entry, meter photo capture, Hindi / English UI',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      role: 'installer',
      title: 'Installer Tech (Mukesh Sharma)',
      description: 'QR tracker pairing, tank calibration table, live Codec 8 test',
      icon: Wrench,
      color: 'from-amber-500 to-orange-600',
    },
    {
      role: 'admin',
      title: 'Platform Admin (Amitabh Sengupta)',
      description: 'Multi-tenant fleets, device voltages, hash-chained audit ledger',
      icon: Shield,
      color: 'from-purple-500 to-violet-700',
    },
  ];

  const handleLaunchRole = (role: UserRole) => {
    onSelectRole(role);
    onClose();
  };

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilotName || !pilotPhone) return;
    setPilotSubmitted(true);
    setTimeout(() => {
      setPilotSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Experience Saarthi Operations"
      subtitle="Explore all 5 functional portals instantly or register for the Indore pilot"
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Toggle between Instant Sandbox & Live Pilot Booking */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setTab('sandbox')}
            className={`flex-1 py-2 rounded-lg transition ${
              tab === 'sandbox' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚡ Instant 5-Portal Sandbox (Demo)
          </button>
          <button
            onClick={() => setTab('pilot')}
            className={`flex-1 py-2 rounded-lg transition ${
              tab === 'pilot' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📋 Schedule Depot Onboarding
          </button>
        </div>

        {tab === 'sandbox' ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Select any role below to immediately enter the transport management application with pre-populated Central India data:
            </p>

            <div className="space-y-2">
              {demoRoles.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    onClick={() => handleLaunchRole(item.role)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shrink-0 group-hover:scale-105 transition`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-sky-700 transition">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            {pilotSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Depot Pilot Request Logged!</h4>
                <p className="text-slate-600">
                  Our telematics deployment engineer will contact you on <strong>{pilotPhone}</strong> to schedule sensor bench test and calibration.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePilotSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Transporter / Fleet Owner Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dinesh Rathore"
                    value={pilotName}
                    onChange={(e) => setPilotName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Mobile Contact (WhatsApp Number)</label>
                  <input
                    type="tel"
                    placeholder="e.g. 98260 12345"
                    value={pilotPhone}
                    onChange={(e) => setPilotPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Trucks to Pilot with RS-485 Sensors</label>
                  <select
                    value={pilotFleet}
                    onChange={(e) => setPilotFleet(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="5">5 Commercial Trucks (Initial Bench Pilot)</option>
                    <option value="20">20 Commercial Trucks (Standard Pilot)</option>
                    <option value="50">50 Commercial Trucks (Full Depot Rollout)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition"
                  >
                    Register Depot for Free Pilot Trial
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
