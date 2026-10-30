import React, { useState } from 'react';
import { FuelAlert } from '../../types';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  FileText,
  Fuel,
  Info,
  Layers,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  User,
  XCircle,
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

interface FuelProofModalProps {
  alert: FuelAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onReview: (alertId: string, status: 'verified' | 'false_alarm', note: string) => void;
}

export const FuelProofModal: React.FC<FuelProofModalProps> = ({
  alert,
  isOpen,
  onClose,
  onReview,
}) => {
  const [reviewNote, setReviewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'evidence' | 'photos' | 'reconciliation'>('evidence');

  if (!alert) return null;

  const isDrain = alert.alertType === 'fuel_drain';
  const isMismatch = alert.alertType === 'reconciliation_mismatch';
  const isRefill = alert.alertType === 'fuel_refill';

  const handleAction = (status: 'verified' | 'false_alarm') => {
    onReview(alert.id, status, reviewNote || (status === 'verified' ? 'Confirmed by management' : 'Marked as false alarm by management'));
    setReviewNote('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Fuel Proof Report: ${alert.vehicleReg}`}
      subtitle={`Alert ID: ${alert.id} • Detected on ${alert.timestamp}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Top Summary Banner */}
        <div
          className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDrain
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : isMismatch
              ? 'bg-orange-50 border-orange-200 text-orange-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-xl text-white ${
                isDrain ? 'bg-rose-600' : isMismatch ? 'bg-orange-600' : 'bg-emerald-600'
              }`}
            >
              {isDrain ? (
                <TrendingDown className="w-6 h-6" />
              ) : isMismatch ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <TrendingUp className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base">
                  {isDrain
                    ? `Sudden Fuel Drain: ${Math.abs(alert.fuelDeltaL)} Litres Lost`
                    : isMismatch
                    ? `Reconciliation Mismatch: ${alert.mismatchLitres}L Discrepancy`
                    : `Fuel Refill: +${alert.fuelDeltaL} Litres Added`}
                </span>
                <StatusBadge status={alert.status} size="sm" />
              </div>
              <p className="text-xs opacity-90 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {alert.locationName}
              </p>
            </div>
          </div>

          {/* AI / Rule Engine Confidence Score */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl border border-slate-200/60 shadow-xs self-start md:self-auto">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Confidence</p>
              <p className="text-xl font-black text-slate-900 font-mono">{alert.confidenceScore}%</p>
            </div>
            <div className={`p-2 rounded-full ${alert.confidenceScore >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-2.5 px-4 text-xs font-bold transition border-b-2 ${
              activeTab === 'evidence'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Telemetry & Sensor Graph
          </button>
          <button
            onClick={() => setActiveTab('reconciliation')}
            className={`pb-2.5 px-4 text-xs font-bold transition border-b-2 ${
              activeTab === 'reconciliation'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Reconciliation & Fuel Bill
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-2.5 px-4 text-xs font-bold transition border-b-2 ${
              activeTab === 'photos'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Attached Photographs ({alert.driverPhotoUrl || alert.receiptPhotoUrl ? '2' : '0'})
          </button>
        </div>

        {/* Tab 1: Fuel Graph & Telemetry Pack */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Engine State</p>
                <p className="text-sm font-bold text-slate-900 uppercase font-mono mt-0.5">
                  {alert.engineState === 'stopped' ? '🔴 Engine OFF' : '🟢 Engine ON'}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Vehicle Speed</p>
                <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{alert.speedKmph} km/h (Stationary)</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Current Fuel Level</p>
                <p className="text-sm font-bold text-sky-600 font-mono mt-0.5">{alert.sensorLitres} Litres</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Assigned Driver</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{alert.driverName}</p>
              </div>
            </div>

            {/* Fuel Sensor Graph */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Capacitive Fuel Sensor Level Curve (Litres vs Time)
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">RS-485 Omnicomm LLS4 Sensor</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={alert.fuelGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-700">
                              <p className="font-bold">{payload[0].payload.time}</p>
                              <p className="text-sky-400 font-mono font-bold mt-1">
                                Fuel: {payload[0].value} L
                              </p>
                              <p className="text-slate-300 text-[10px]">
                                Speed: {payload[0].payload.speedKmph} km/h • {payload[0].payload.engineState}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="fuelLitres"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#fuelGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Evidence Note */}
            {alert.tamperEvidence && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900">Saarthi Fuel Rule Engine Assessment: </span>
                {alert.tamperEvidence}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Reconciliation */}
        {activeTab === 'reconciliation' && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                Sensor Measured vs Driver Claimed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Driver Bill Claim</p>
                  <p className="text-xl font-black text-slate-900 font-mono mt-1">
                    {alert.driverReportedLitres ? `${alert.driverReportedLitres} L` : 'No Entry Yet'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Reported via Saarthi Driver App</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Capacitive Sensor Rise</p>
                  <p className="text-xl font-black text-sky-600 font-mono mt-1">
                    +{Math.abs(alert.fuelDeltaL)} L
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Verified with tank geometry table</p>
                </div>
                <div className={`p-3 rounded-lg border ${
                  alert.mismatchLitres ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <p className="text-xs font-semibold">Variance / Discrepancy</p>
                  <p className="text-xl font-black font-mono mt-1">
                    {alert.mismatchLitres ? `-${alert.mismatchLitres} L` : '0 L (Matched)'}
                  </p>
                  <p className="text-[10px] opacity-80 mt-1">
                    {alert.mismatchLitres ? 'Exceeds 5% tolerance threshold' : 'Within normal sensor margin'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Transparent Reconciliation Guarantee</p>
                <p className="mt-0.5 text-sky-800">
                  This report pairs fuel sensor millivolt readings with GPS timestamps and the driver's geotagged photo. Honest drivers are protected against false accusations, and pump-meter frauds are exposed with tangible proof.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Attached Photographs */}
        {activeTab === 'photos' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <p className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>Dispenser Meter Display</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-normal">Geotagged ✓</span>
                </p>
                {alert.driverPhotoUrl ? (
                  <img
                    src={alert.driverPhotoUrl}
                    alt="Pump meter"
                    className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-slate-100 rounded-lg text-slate-400 text-xs">
                    No meter photo submitted
                  </div>
                )}
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <p className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>Fuel Cash/Credit Memo Receipt</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-normal">Geotagged ✓</span>
                </p>
                {alert.receiptPhotoUrl ? (
                  <img
                    src={alert.receiptPhotoUrl}
                    alt="Receipt"
                    className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-slate-100 rounded-lg text-slate-400 text-xs">
                    No receipt photo submitted
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Audit Note & Action Section */}
        {alert.status === 'open' ? (
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Management Review Note (Saved to DPDP-compliant Audit Trail)
              </label>
              <input
                type="text"
                placeholder="e.g. Verified with driver via call, discrepancy confirmed as pump nozzle issue..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleAction('false_alarm')}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4 text-slate-400" />
                Mark as False Alarm
              </button>
              <button
                onClick={() => handleAction('verified')}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                Confirm & Verify Incident
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-200 pt-4 bg-slate-50 p-3.5 rounded-xl text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">Review Record: </span>
              <span className="text-slate-600">{alert.reviewNote || 'Reviewed and closed'}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Reviewed by {alert.reviewedBy} on {alert.reviewedAt}
              </p>
            </div>
            <StatusBadge status={alert.status} size="sm" />
          </div>
        )}
      </div>
    </Modal>
  );
};
