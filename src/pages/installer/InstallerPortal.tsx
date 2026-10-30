import React, { useState } from 'react';
import { InstallationJob, CalibrationPoint } from '../../types';
import { mockStorage } from '../../services/mockStorage';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  CheckCircle,
  Clock,
  Compass,
  FileCheck,
  Fuel,
  Info,
  Plus,
  QrCode,
  Radio,
  RotateCw,
  Search,
  ShieldCheck,
  Trash2,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';

interface InstallerPortalProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const InstallerPortal: React.FC<InstallerPortalProps> = ({ currentTab, onTabChange }) => {
  const [jobs, setJobs] = useState<InstallationJob[]>(() => mockStorage.getInstallationJobs());
  const [selectedJob, setSelectedJob] = useState<InstallationJob>(jobs[0]);

  // Active calibration points for selected job
  const [calibrationPoints, setCalibrationPoints] = useState<CalibrationPoint[]>(
    selectedJob?.calibrationPoints?.length > 0
      ? selectedJob.calibrationPoints
      : [
          { pointIndex: 1, depthMm: 0, rawSensorValue: 120, litres: 0 },
          { pointIndex: 2, depthMm: 125, rawSensorValue: 450, litres: 60 },
          { pointIndex: 3, depthMm: 250, rawSensorValue: 800, litres: 125 },
          { pointIndex: 4, depthMm: 375, rawSensorValue: 1150, litres: 190 },
          { pointIndex: 5, depthMm: 500, rawSensorValue: 1500, litres: 250 },
        ]
  );

  // New point form
  const [newLitres, setNewLitres] = useState('');
  const [newMv, setNewMv] = useState('');
  const [newMm, setNewMm] = useState('');

  // Live Test Packet State
  const [isTestingPacket, setIsTestingPacket] = useState(false);
  const [packetVerified, setPacketVerified] = useState(!!selectedJob?.testPacketReceived || true);

  // Add Calibration Point
  const handleAddPoint = () => {
    if (!newLitres || !newMv) return;
    const newPt: CalibrationPoint = {
      pointIndex: calibrationPoints.length + 1,
      litres: Number(newLitres),
      rawSensorValue: Number(newMv),
      depthMm: Number(newMm) || 0,
    };
    const updated = [...calibrationPoints, newPt].sort((a, b) => a.litres - b.litres);
    setCalibrationPoints(updated);
    mockStorage.updateInstallationJob(selectedJob.id, { calibrationPoints: updated });
    setNewLitres('');
    setNewMv('');
    setNewMm('');
  };

  // Run Test Packet simulation (PRD AC-1)
  const handleTriggerTestPacket = () => {
    setIsTestingPacket(true);
    setTimeout(() => {
      setIsTestingPacket(false);
      setPacketVerified(true);
      mockStorage.updateInstallationJob(selectedJob.id, {
        status: 'verified',
        liveTestPacket: {
          receivedAt: new Date().toLocaleString('en-IN') + ' IST',
          codec: 'Teltonika Codec 8 Extended (TCP)',
          voltage: 24.3,
          sensorMv: 1150,
          calculatedLitres: 190,
          gpsLock: true,
          satellites: 15,
        },
      });
      setJobs(mockStorage.getInstallationJobs());
    }, 1500);
  };

  // Sign off & complete job
  const handleCompleteJob = () => {
    mockStorage.updateInstallationJob(selectedJob.id, { status: 'completed' });
    setJobs(mockStorage.getInstallationJobs());
    alert('Installation Job verified & signed off! Vehicle is now active in Saarthi.');
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: ASSIGNED JOBS */}
      {currentTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Assigned Telematics & Sensor Jobs</h2>
              <p className="text-xs text-slate-500">
                Fit Teltonika FMC130 4G trackers & Omnicomm/Italon RS-485 capacitive fuel sensors
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-4 h-4 text-sky-600" /> Target: &lt; 90 mins / vehicle
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-2xl border p-5 shadow-xs cursor-pointer transition space-y-3 ${
                  selectedJob.id === job.id
                    ? 'border-sky-500 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-sky-700">{job.jobCode}</span>
                  <StatusBadge status={job.status} size="sm" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-base text-slate-900">{job.vehicleReg}</h3>
                  <p className="text-xs text-slate-600">{job.vehicleMakeModel}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{job.transporterName}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tank Capacity:</span>
                    <span className="font-bold font-mono text-slate-800">{job.tankCapacityL} L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sensor Model:</span>
                    <span className="text-slate-700 font-mono text-[11px] truncate max-w-[140px]">{job.sensorModel}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    onTabChange('calibration');
                  }}
                  className="w-full py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs transition"
                >
                  Open Calibration Wizard →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: QR & PROVISIONING (PRD FR-8, AC-1) */}
      {currentTab === 'provisioning' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">QR Code Device Provisioning</h2>
            <p className="text-xs text-slate-500">
              Scan device barcode/QR to pair Teltonika tracker IMEI with vehicle diesel tank
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl text-white text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-sm">Scan Teltonika FMC130 Device QR</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Aim camera at the device label on the top cover or enter IMEI manually below
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tracker IMEI (15 Digits)</label>
              <input
                type="text"
                value={selectedJob.deviceImei}
                readOnly
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Capacitive Sensor Serial</label>
              <input
                type="text"
                value={selectedJob.sensorSerial}
                readOnly
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Vehicle Registration Linked</label>
              <input
                type="text"
                value={selectedJob.vehicleReg}
                readOnly
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sky-700 font-bold"
              />
            </div>

            <button
              onClick={() => onTabChange('calibration')}
              className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition"
            >
              Continue to Tank Calibration →
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: TANK CALIBRATION WIZARD (PRD FR-15, R2) */}
      {currentTab === 'calibration' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tank Calibration Wizard (Litres vs Sensor mV)</h2>
              <p className="text-xs text-slate-500">
                Vehicle: <strong className="text-slate-800 font-mono">{selectedJob.vehicleReg}</strong> • Tank: {selectedJob.tankCapacityL} L ({selectedJob.tankShape})
              </p>
            </div>
            <button
              onClick={() => onTabChange('telemetrytest')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              Verify Live Packet <Radio className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calibration Points Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Multi-point Calibration Curve</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Point #</th>
                      <th className="py-2.5 px-3">Liquid Litres</th>
                      <th className="py-2.5 px-3">Raw Sensor (mV)</th>
                      <th className="py-2.5 px-3">Depth (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {calibrationPoints.map((pt) => (
                      <tr key={pt.pointIndex} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-400">P{pt.pointIndex}</td>
                        <td className="py-2 px-3 font-bold text-sky-700">{pt.litres} L</td>
                        <td className="py-2 px-3 font-bold text-slate-800">{pt.rawSensorValue} mV</td>
                        <td className="py-2 px-3 text-slate-500">{pt.depthMm} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Point Form */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Litres (e.g. 150)"
                  value={newLitres}
                  onChange={(e) => setNewLitres(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
                <input
                  type="number"
                  placeholder="Sensor mV (e.g. 950)"
                  value={newMv}
                  onChange={(e) => setNewMv(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
                <button
                  onClick={handleAddPoint}
                  className="px-3 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition"
                >
                  + Add Point
                </button>
              </div>
            </div>

            {/* Installer Quality Checklist (PRD FR-8, R2, R3) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Installation Quality Checklist</h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-sky-600" />
                  <span>Tank drilled at geometric center</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-sky-600" />
                  <span>Anti-slosh baffle clearance verified</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-sky-600" />
                  <span>RS-485 cable braided & grounded</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-sky-600" />
                  <span>Tamper seal applied to sensor head</span>
                </label>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800">
                <strong>PRD Rule:</strong> Controlled test fill of at least 20L required to verify live sensor linearity before completing job.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: LIVE PACKET TEST (PRD AC-1) */}
      {currentTab === 'telemetrytest' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Live Telemetry Packet Verification</h2>
              <p className="text-xs text-slate-500">
                PRD AC-1: Verify test packet with valid fuel reading before leaving vehicle
              </p>
            </div>
            <button
              onClick={handleTriggerTestPacket}
              disabled={isTestingPacket}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isTestingPacket ? 'animate-spin' : ''}`} />
              {isTestingPacket ? 'Waiting for Codec 8 Ping...' : 'Poll Test Packet'}
            </button>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl text-white font-mono space-y-3 text-xs border border-slate-800 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Codec Protocol</span>
              <span className="text-sky-400 font-bold">Teltonika Codec 8 Extended (TCP)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">External Voltage</span>
              <span className="text-emerald-400 font-bold">24.3 V (Chassis OK)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">RS-485 Raw Signal</span>
              <span className="text-amber-400 font-bold">1,150 mV</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Calculated Tank Fuel</span>
              <span className="text-sky-400 font-bold">190 Litres</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">GNSS GPS Lock</span>
              <span className="text-emerald-400 font-bold">3D Fixed (15 Satellites)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last Telemetry Handshake</span>
              <span className="text-slate-300">Just now (Indore Depot)</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleCompleteJob}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Sign Off & Mark Live
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: COMPLETED JOBS */}
      {currentTab === 'jobhistory' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Completed Installation Archives</h2>
            <p className="text-xs text-slate-500">History of calibrated trucks and signed-off sensor units</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Job Code</th>
                  <th className="py-3 px-4">Vehicle Reg</th>
                  <th className="py-3 px-4">Transporter</th>
                  <th className="py-3 px-4">Sensor Model</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-sky-700">{j.jobCode}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{j.vehicleReg}</td>
                    <td className="py-3 px-4 text-slate-700">{j.transporterName}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{j.sensorModel}</td>
                    <td className="py-3 px-4 text-slate-500">{j.assignedDate}</td>
                    <td className="py-3 px-4 text-right">
                      <StatusBadge status={j.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
