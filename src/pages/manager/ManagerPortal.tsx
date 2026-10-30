import React, { useState } from 'react';
import {
  Trip,
  Vehicle,
  Driver,
  Expense,
  FuelAlert,
} from '../../types';
import { mockStorage } from '../../services/mockStorage';
import { KPICard } from '../../components/common/KPICard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { FuelProofModal } from '../../components/common/FuelProofModal';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  CreditCard,
  FileText,
  Filter,
  Fuel,
  Info,
  MapPin,
  Phone,
  Plus,
  Search,
  Truck,
  User,
  Users,
  XCircle,
} from 'lucide-react';

interface ManagerPortalProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const ManagerPortal: React.FC<ManagerPortalProps> = ({ currentTab, onTabChange }) => {
  const [trips, setTrips] = useState<Trip[]>(() => mockStorage.getTrips());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => mockStorage.getVehicles());
  const [drivers, setDrivers] = useState<Driver[]>(() => mockStorage.getDrivers());
  const [expenses, setExpenses] = useState<Expense[]>(() => mockStorage.getExpenses());
  const [alerts, setAlerts] = useState<FuelAlert[]>(() => mockStorage.getFuelAlerts());

  // Trip Creation Modal State
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [origin, setOrigin] = useState('Indore Depot (Transport Nagar)');
  const [destination, setDestination] = useState('Bhiwandi Logistics Hub, Mumbai');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [freightAmount, setFreightAmount] = useState('65000');
  const [advanceAmount, setAdvanceAmount] = useState('20000');
  const [cargoDesc, setCargoDesc] = useState('Auto Engineering Components (Mahindra)');

  // Rejection Modal State (PRD AC-12: Rejecting expense requires reason)
  const [rejectingExpenseId, setRejectingExpenseId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Fuel Alert Modal State
  const [selectedAlert, setSelectedAlert] = useState<FuelAlert | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Filtered available vehicles (stopped or unassigned)
  const availableVehicles = vehicles.filter((v) => v.status === 'stopped' || !v.currentTripId);
  const availableDrivers = drivers.filter((d) => d.status === 'available');

  const activeTrips = trips.filter((t) => t.status === 'in_progress');
  const pendingExpenses = expenses.filter((e) => e.status === 'pending');
  const openAlerts = alerts.filter((a) => a.status === 'open');

  // Handle Trip Dispatch
  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
    const driver = drivers.find((d) => d.id === selectedDriverId);

    if (!vehicle || !driver) {
      alert('Please select an available vehicle and driver.');
      return;
    }

    mockStorage.createTrip({
      origin,
      destination,
      vehicleId: vehicle.id,
      vehicleReg: vehicle.registrationNumber,
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      status: 'in_progress',
      startTime: new Date().toLocaleString('en-IN'),
      startOdometer: vehicle.odometerKm,
      totalDistanceKm: 560,
      freightAmountRupees: Number(freightAmount) || 50000,
      advanceAmountRupees: Number(advanceAmount) || 15000,
      fuelConsumedL: 0,
      expensesTotalRupees: 0,
      cargoDescription: cargoDesc,
    });

    setTrips(mockStorage.getTrips());
    setVehicles(mockStorage.getVehicles());
    setDrivers(mockStorage.getDrivers());
    setIsCreateTripOpen(false);
  };

  // Handle Expense Approval
  const handleApproveExpense = (expenseId: string) => {
    mockStorage.updateExpenseStatus(expenseId, 'approved', 'Vikram Chouhan (Manager)');
    setExpenses(mockStorage.getExpenses());
  };

  // Handle Expense Rejection
  const handleRejectExpenseSubmit = () => {
    if (!rejectingExpenseId || !rejectionReason.trim()) return;
    mockStorage.updateExpenseStatus(rejectingExpenseId, 'rejected', 'Vikram Chouhan (Manager)', rejectionReason);
    setExpenses(mockStorage.getExpenses());
    setRejectingExpenseId(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: OPERATIONS DASHBOARD */}
      {currentTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Active Trips"
              value={activeTrips.length}
              subtext="In Transit on Highways"
              icon={Compass}
              accentColor="sky"
              onClick={() => onTabChange('tripmonitoring')}
            />
            <KPICard
              title="Available Trucks"
              value={availableVehicles.length}
              subtext="Ready for Next Dispatch"
              icon={Truck}
              accentColor="emerald"
              onClick={() => onTabChange('availability')}
            />
            <KPICard
              title="Available Drivers"
              value={availableDrivers.length}
              subtext="Resting / Free at Depot"
              icon={Users}
              accentColor="indigo"
              onClick={() => onTabChange('availability')}
            />
            <KPICard
              title="Pending Expense Claims"
              value={pendingExpenses.length}
              subtext="Photo Receipts Attached"
              icon={CreditCard}
              accentColor="amber"
              trend={{ value: 'Review Needed', isPositive: false }}
              onClick={() => onTabChange('expensereview')}
            />
          </div>

          {/* Quick Dispatch Bar */}
          <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Fast Trip Dispatch Cockpit</h3>
              <p className="text-xs text-sky-200 mt-1">
                Assign available fleet vehicles & verified drivers to immediate load orders.
              </p>
            </div>
            <button
              onClick={() => {
                if (availableVehicles.length > 0) setSelectedVehicleId(availableVehicles[0].id);
                if (availableDrivers.length > 0) setSelectedDriverId(availableDrivers[0].id);
                setIsCreateTripOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Dispatch New Trip
            </button>
          </div>

          {/* Active Trips Quick Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Active En-Route Dispatches</h3>
                <p className="text-xs text-slate-500">Live trip progression and assigned units</p>
              </div>
              <button
                onClick={() => onTabChange('tripmonitoring')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                Detailed Monitoring →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTrips.map((t) => (
                <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-sky-700">{t.tripNumber}</span>
                    <StatusBadge status={t.status} size="sm" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{t.origin}</p>
                    <div className="flex items-center gap-2 my-1 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <div className="flex-1 h-0.5 bg-slate-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="font-bold text-slate-900 text-xs">{t.destination}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-mono font-bold text-slate-800">{t.vehicleReg}</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <User className="w-3 h-3 text-slate-400" /> {t.driverName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TRIP PLANNING & DISPATCH */}
      {currentTab === 'tripplanning' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Trip Planning & Dispatches</h2>
              <p className="text-xs text-slate-500">
                Create new trips, select available assets, and issue trip advances
              </p>
            </div>
            <button
              onClick={() => {
                if (availableVehicles.length > 0) setSelectedVehicleId(availableVehicles[0].id);
                if (availableDrivers.length > 0) setSelectedDriverId(availableDrivers[0].id);
                setIsCreateTripOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Create New Trip
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Trip #</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Vehicle Reg</th>
                    <th className="py-3 px-4">Driver</th>
                    <th className="py-3 px-4">Cargo</th>
                    <th className="py-3 px-4">Freight ₹</th>
                    <th className="py-3 px-4">Advance ₹</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trips.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-700">{t.tripNumber}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {t.origin} ➔ {t.destination}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{t.vehicleReg}</td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {t.driverName}
                        <p className="text-[10px] text-slate-400 font-mono">{t.driverPhone}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-[180px] truncate">{t.cargoDescription}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        ₹{t.freightAmountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        ₹{t.advanceAmountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <StatusBadge status={t.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TRIP MONITORING */}
      {currentTab === 'tripmonitoring' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live Trip Progress & Logs</h2>
            <p className="text-xs text-slate-500">Real-time status, odometer tracking, and cargo updates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-sky-700">{t.tripNumber}</span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">
                      {t.origin} ➔ {t.destination}
                    </p>
                  </div>
                  <StatusBadge status={t.status} size="sm" />
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle:</span>
                    <span className="font-mono font-bold text-slate-900">{t.vehicleReg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Driver Contact:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-sky-600" /> {t.driverName} ({t.driverPhone})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cargo:</span>
                    <span className="text-slate-700 font-medium">{t.cargoDescription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dispatched At:</span>
                    <span className="font-mono text-slate-600">{t.startTime || 'Scheduled'}</span>
                  </div>
                </div>

                {t.status === 'in_progress' && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-500">Actions:</span>
                    <button
                      onClick={() => {
                        mockStorage.updateTripStatus(t.id, 'completed');
                        setTrips(mockStorage.getTrips());
                        setVehicles(mockStorage.getVehicles());
                        setDrivers(mockStorage.getDrivers());
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                    >
                      Mark Trip Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: VEHICLE & DRIVER AVAILABILITY */}
      {currentTab === 'availability' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Asset & Driver Availability Roster</h2>
            <p className="text-xs text-slate-500">Inspect idle assets ready for immediate dispatch</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trucks */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600" /> Available Trucks ({availableVehicles.length})
              </h3>
              <div className="space-y-2">
                {availableVehicles.length === 0 ? (
                  <p className="text-xs text-slate-400 p-4 text-center">All trucks are currently on trips.</p>
                ) : (
                  availableVehicles.map((v) => (
                    <div key={v.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-xs text-slate-900">{v.registrationNumber}</p>
                        <p className="text-[10px] text-slate-500">{v.makeModel}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-sky-600">{v.currentFuelL} L Fuel</span>
                        <p className="text-[10px] text-slate-400">{v.location.address}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drivers */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" /> Available Drivers ({availableDrivers.length})
              </h3>
              <div className="space-y-2">
                {availableDrivers.length === 0 ? (
                  <p className="text-xs text-slate-400 p-4 text-center">All drivers are currently dispatched.</p>
                ) : (
                  availableDrivers.map((d) => (
                    <div key={d.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-slate-900">{d.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{d.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600">★ {d.rating} Rating</span>
                        <p className="text-[10px] text-slate-400">{d.experienceYears} yrs exp</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: EXPENSE REVIEW & APPROVAL (PRD FR-41, AC-12) */}
      {currentTab === 'expensereview' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Driver Expense Review & Approvals</h2>
            <p className="text-xs text-slate-500">
              Audit driver trip expenses with attached receipt photos. Rejections require a mandatory reason.
            </p>
          </div>

          <div className="space-y-3">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">
                        ₹{exp.amountRupees.toLocaleString('en-IN')}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {exp.category.replace('_', ' ')}
                      </span>
                      <StatusBadge status={exp.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-medium">{exp.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submitted by {exp.driverName} • Trip {exp.tripNumber} ({exp.vehicleReg}) • {exp.date}
                    </p>
                    {exp.rejectionReason && (
                      <p className="text-xs text-rose-600 font-bold mt-1">
                        Rejection Reason: {exp.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions / Photo Preview */}
                <div className="flex items-center gap-3 self-end md:self-auto">
                  {exp.receiptPhotoUrl && (
                    <a
                      href={exp.receiptPhotoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-bold hover:bg-slate-50"
                    >
                      View Receipt Photo ↗
                    </a>
                  )}

                  {exp.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          setRejectingExpenseId(exp.id);
                          setRejectionReason('');
                        }}
                        className="px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                      <button
                        onClick={() => handleApproveExpense(exp.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: ALERT TRIAGE */}
      {currentTab === 'alerttriage' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Operational Alert Triage Queue</h2>
            <p className="text-xs text-slate-500">Ranked by rule-engine confidence score</p>
          </div>

          <div className="space-y-3">
            {openAlerts.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900">{a.vehicleReg}</span>
                    <StatusBadge status={a.alertType} size="sm" />
                    <span className="text-xs font-mono font-bold text-rose-600">{a.confidenceScore}% Confidence</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{a.locationName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{a.timestamp} • Driver: {a.driverName}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedAlert(a);
                    setIsAlertModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                >
                  Triage & Evidence
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Trip Modal */}
      <Modal
        isOpen={isCreateTripOpen}
        onClose={() => setIsCreateTripOpen(false)}
        title="Dispatch New Freight Trip"
        subtitle="Assigns vehicle, driver, and records trip parameters"
      >
        <form onSubmit={handleCreateTrip} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Assign Truck (Available Only)</label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {availableVehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.registrationNumber} ({v.currentFuelL}L fuel)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Assign Driver (Available Only)</label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {availableDrivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.phone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Agreed Freight (₹)</label>
              <input
                type="number"
                value={freightAmount}
                onChange={(e) => setFreightAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Trip Advance Issued (₹)</label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Cargo Details</label>
            <input
              type="text"
              value={cargoDesc}
              onChange={(e) => setCargoDesc(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateTripOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition"
            >
              Dispatch Trip Now
            </button>
          </div>
        </form>
      </Modal>

      {/* Expense Rejection Reason Modal (PRD AC-12) */}
      <Modal
        isOpen={!!rejectingExpenseId}
        onClose={() => setRejectingExpenseId(null)}
        title="Reject Expense Submission"
        subtitle="PRD Rule: A specific rejection reason must be provided to the driver"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              Reason for Rejection (Mandatory)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Ineligible personal meal expense, or receipt photo blurry / unreadable..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setRejectingExpenseId(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleRejectExpenseSubmit}
              disabled={!rejectionReason.trim()}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold"
            >
              Confirm Rejection
            </button>
          </div>
        </div>
      </Modal>

      {/* Fuel Alert Modal */}
      <FuelProofModal
        alert={selectedAlert}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onReview={(id, st, note) => {
          mockStorage.reviewAlert(id, st, note, 'Vikram Chouhan (Manager)');
          setAlerts(mockStorage.getFuelAlerts());
        }}
      />
    </div>
  );
};
