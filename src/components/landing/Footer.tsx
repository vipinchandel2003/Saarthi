import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Modal } from '../common/Modal';
import {
  ArrowRight,
  Compass,
  FileText,
  Fuel,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
} from 'lucide-react';
import { UserRole } from '../../types';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onOpenOnboarding: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onOpenDashboard,
  onOpenOnboarding,
  onSelectRole,
}) => {
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand Info (2 spans on desktop) */}
          <div className="col-span-2 space-y-4">
            <Logo variant="light" size="sm" showTagline />
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Saarthi – Integrated Transport Operations Management System. Connecting fleet tracking, capacitive fuel monitoring, driver honesty verification, and paperless trip khata into one platform.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1 font-mono">
              <p>Pilot Hub: Transport Nagar, Indore, Madhya Pradesh</p>
              <p>Hardware Standard: Teltonika FMC130 & RS-485 Sensors</p>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleScroll('#features')} className="hover:text-white transition">
                  Fleet Features
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('#fleet-demo')} className="hover:text-white transition">
                  Live Fleet Demo
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('#fuel-transparency')} className="hover:text-white transition">
                  Fuel Proof Engine
                </button>
              </li>
              <li>
                <button onClick={onOpenDashboard} className="hover:text-white transition">
                  Telemetry Cockpit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectRole('owner')} className="hover:text-white transition">
                  Fleet Owner Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('manager')} className="hover:text-white transition">
                  Manager Dispatch
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('driver')} className="hover:text-white transition">
                  Driver Mobile App
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('installer')} className="hover:text-white transition">
                  Installer Calibration
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('admin')} className="hover:text-white transition">
                  Platform Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Account */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company & Access</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleScroll('#how-it-works')} className="hover:text-white transition">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('#contact')} className="hover:text-white transition">
                  Request Pilot Access
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition">
                  Transporter Login
                </button>
              </li>
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-white transition text-sky-400 font-bold">
                  Start Free Demo →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Saarthi Operations. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModalTitle('Privacy Policy (DPDP Act Aligned Draft)')}
              className="hover:text-slate-400 transition"
            >
              Privacy Notice
            </button>
            <button
              onClick={() => setLegalModalTitle('Terms of Operational Service (Draft)')}
              className="hover:text-slate-400 transition"
            >
              Terms of Service
            </button>
            <span className="text-slate-600">Central India Pilot MVP v0.1</span>
          </div>
        </div>
      </div>

      {/* Legal Draft Modal */}
      <Modal
        isOpen={!!legalModalTitle}
        onClose={() => setLegalModalTitle(null)}
        title={legalModalTitle || ''}
        subtitle="Operational Documentation & Statutory Notice"
      >
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-96 overflow-y-auto">
          <p className="font-bold text-slate-900">
            Saarthi – Digital Personal Data Protection (DPDP) Operational Charter (Draft):
          </p>
          <p>
            1. <strong>Purpose Limitation:</strong> Vehicle GPS telemetry, capacitive fuel readings, and photographic proof are collected solely for fleet operations, safety, and driver honesty verification.
          </p>
          <p>
            2. <strong>Retention Periods (PRD FR-52):</strong> GPS location records are retained for a maximum of 12 months; driver dispenser photos for 6 months; tamper-evident cryptographic audit logs for statutory compliance up to 7 years.
          </p>
          <p>
            3. <strong>Data Fiduciary Rights:</strong> Drivers and operators retain the right to inspect verified records, correct errors, and request deletion upon termination of active transport services.
          </p>
        </div>
      </Modal>
    </footer>
  );
};
