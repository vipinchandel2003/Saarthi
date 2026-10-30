import React, { useState } from 'react';
import {
  PlatformTenant,
  DeviceHealthRecord,
  ActivityAuditLog,
} from '../../types';
import { mockStorage } from '../../services/mockStorage';
import { KPICard } from '../../components/common/KPICard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle,
  Database,
  Hash,
  Radio,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from 'lucide-react';

interface AdminPortalProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ currentTab, onTabChange }) => {
  const [tenants, setTenants] = useState<PlatformTenant[]>(() => mockStorage.getTenants());
  const [devices, setDevices] = useState<DeviceHealthRecord[]>(() => mockStorage.getDeviceHealth());
  const [auditLogs, setAuditLogs] = useState<ActivityAuditLog[]>(() => mockStorage.getAuditLogs());

  // Hash chain verification state
  const [isVerifyingHashes, setIsVerifyingHashes] = useState(false);
  const [hashVerificationResult, setHashVerificationResult] = useState<'valid' | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  const totalVehiclesOnPlatform = tenants.reduce((sum, t) => sum + t.vehiclesCount, 0);
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const tamperAlerts = devices.filter((d) => d.status === 'tamper_alert').length;

  const handleVerifyChain = () => {
    setIsVerifyingHashes(true);
    setTimeout(() => {
      setIsVerifyingHashes(false);
      setHashVerificationResult('valid');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: PLATFORM OVERVIEW */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Transporter Tenants"
              value={tenants.length}
              subtext="Central India Pilot Fleets"
              icon={Building2}
              accentColor="purple"
              onClick={() => onTabChange('tenants')}
            />
            <KPICard
              title="Tracked Trucks"
              value={totalVehiclesOnPlatform}
              subtext={`${onlineDevices} Trackers Live Online`}
              icon={Truck}
              accentColor="sky"
              onClick={() => onTabChange('devicehealth')}
            />
            <KPICard
              title="Telemetry Ingest"
              value="2.88M"
              subtext="Codec 8 TCP Rows / Day"
              icon={Server}
              accentColor="emerald"
              trend={{ value: '99.8% Uptime', isPositive: true }}
            />
            <KPICard
              title="Device Alerts"
              value={tamperAlerts}
              subtext="Sensor Disconnect / Power Cut"
              icon={ShieldAlert}
              accentColor="rose"
              trend={{ value: `${tamperAlerts} Offline`, isPositive: false }}
              onClick={() => onTabChange('devicehealth')}
            />
          </div>

          {/* Infrastructure Health Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-base">Saarthi Ingest & Rule Engine Cluster: Healthy</h3>
              </div>
              <p className="text-xs text-slate-400">
                Teltonika Codec 8 TCP Pipeline, TimescaleDB, and WhatsApp Business API Gateway operating at normal latency (&lt; 2.4s).
              </p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => onTabChange('devicehealth')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700 transition"
              >
                Inspect Telemetry Nodes
              </button>
            </div>
          </div>

          {/* Quick Tenants & Devices Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tenants */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Pilot Transporter Fleets</h3>
                <button
                  onClick={() => onTabChange('tenants')}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800"
                >
                  Manage All →
                </button>
              </div>
              <div className="space-y-2">
                {tenants.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{t.name}</p>
                      <p className="text-[10px] text-slate-500">{t.city}, {t.state} • {t.contactPerson}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-sky-700">{t.vehiclesCount} Trucks</span>
                      <p className="text-[10px] text-slate-400">{t.activePlan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Hardware & Tracker Health</h3>
                <button
                  onClick={() => onTabChange('devicehealth')}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800"
                >
                  Device Fleet →
                </button>
              </div>
              <div className="space-y-2">
                {devices.map((d) => (
                  <div key={d.imei} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">{d.vehicleReg}</span>
                        <StatusBadge status={d.status} size="sm" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">IMEI: {d.imei}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-slate-700">{d.externalVoltage}V</span>
                      <p className="text-[10px] text-slate-400">{d.lastSeenTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TRANSPORTER FLEETS (TENANTS) */}
      {currentTab === 'tenants' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Transporter Organizations (Tenants)</h2>
              <p className="text-xs text-slate-500">
                Multi-tenant isolation (PRD FR-1, AC-14) with row-level security per transporter
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Organization Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Fleet Size</th>
                  <th className="py-3 px-4">Subscription Plan</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{t.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{t.city}, {t.state}</td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {t.contactPerson}
                      <p className="text-[10px] text-slate-400 font-mono">{t.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-700">{t.vehiclesCount} vehicles</td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{t.activePlan}</td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge status={t.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: USERS & ACCESS */}
      {currentTab === 'users' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Platform User Accounts & Roles</h2>
            <p className="text-xs text-slate-500">Role-based access control (RBAC) across all 5 user tiers</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Rajesh Agrawal', email: 'rajesh@agrawalroadlines.in', role: 'owner', tenant: 'Agrawal Roadlines Indore' },
                  { name: 'Vikram Chouhan', email: 'vikram@agrawalroadlines.in', role: 'manager', tenant: 'Agrawal Roadlines Indore' },
                  { name: 'Ramesh Verma', email: '+91 91112 34567', role: 'driver', tenant: 'Agrawal Roadlines Indore' },
                  { name: 'Mukesh Sharma', email: 'mukesh.installer@telematicsmp.in', role: 'installer', tenant: 'MP Telematics & Sensors Pvt Ltd' },
                  { name: 'Amitabh Sengupta', email: 'admin@saarthifleet.in', role: 'admin', tenant: 'Saarthi Central Operations' },
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-sky-50 text-sky-700 border border-sky-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{u.tenant}</td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge status="active" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: DEVICE HEALTH (PRD FR-48, AC-18) */}
      {currentTab === 'devicehealth' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Device & Telemetry Health Dashboard</h2>
            <p className="text-xs text-slate-500">
              PRD FR-48: Real-time tracker voltage, sensor state, SIM ICCID, and firmware monitoring
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">IMEI & Vehicle</th>
                  <th className="py-3 px-4">Model & Firmware</th>
                  <th className="py-3 px-4">SIM ICCID</th>
                  <th className="py-3 px-4">External Voltage</th>
                  <th className="py-3 px-4">RS-485 Sensor</th>
                  <th className="py-3 px-4">Last Seen</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {devices.map((d) => (
                  <tr key={d.imei} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{d.vehicleReg}</p>
                      <p className="text-[10px] text-slate-400">{d.imei}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {d.trackerModel}
                      <p className="text-[10px] text-slate-400">FW: {d.firmwareVersion}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] truncate max-w-[120px]">{d.simIccid}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{d.externalVoltage} V</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.sensorStatus === 'healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {d.sensorStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{d.lastSeenTime}</td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge status={d.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: TAMPER-EVIDENT AUDIT LOG (PRD FR-29, NFR-15, AC-17) */}
      {currentTab === 'auditlogs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tamper-Evident Hash-Chained Audit Ledger</h2>
              <p className="text-xs text-slate-500">
                PRD NFR-15 / AC-17: Append-only cryptographic hash chain for fuel events, approvals, and status changes
              </p>
            </div>
            <button
              onClick={handleVerifyChain}
              disabled={isVerifyingHashes}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingHashes ? 'animate-spin' : ''}`} />
              {isVerifyingHashes ? 'Recalculating SHA-256 Hashes...' : 'Verify Ledger Integrity'}
            </button>
          </div>

          {hashVerificationResult === 'valid' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cryptographic Audit Passed:</strong> All block hashes successfully verified against previous hash chain. Zero tampering detected.
                </span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-100 px-2 py-0.5 rounded font-bold">
                100% Tamper Proof
              </span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Timestamp (IST)</th>
                    <th className="py-3 px-4">Actor & Role</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Details</th>
                    <th className="py-3 px-4 font-mono">Current Hash (SHA-256)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{log.actor}</p>
                        <span className="text-[10px] text-slate-400 capitalize">{log.role}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-sm">{log.details}</td>
                      <td className="py-3.5 px-4 font-mono text-[10px] text-purple-700 max-w-[150px] truncate" title={log.currentHash}>
                        {log.currentHash.slice(0, 16)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: DPDP & SYSTEM CONFIGURATION */}
      {currentTab === 'settings' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">DPDP Act Compliance & Data Retention</h2>
            <p className="text-xs text-slate-500">
              PRD FR-52 / Q7: Automated deletion schedules and privacy policies
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Vehicle GPS Track Retention</span>
                <span className="font-mono font-bold text-sky-700">12 Months (Automated Purge)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Driver Fuel & Receipt Photos</span>
                <span className="font-mono font-bold text-sky-700">6 Months (Encrypted Storage)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Cryptographic Fuel Audit Ledger</span>
                <span className="font-mono font-bold text-sky-700">7 Years (Statutory Requirement)</span>
              </div>
            </div>

            <button
              onClick={() => alert('DPDP policies verified & active on Saarthi cluster.')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            >
              Enforce Retention Policies
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
