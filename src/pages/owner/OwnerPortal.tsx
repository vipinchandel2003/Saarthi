import React, { useState } from 'react';
import {
  Vehicle,
  Trip,
  FuelAlert,
  FuelRecord,
  Expense,
  Driver,
} from '../../types';
import { mockStorage } from '../../services/mockStorage';
import { KPICard } from '../../components/common/KPICard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LiveMap } from '../../components/common/LiveMap';
import { FuelProofModal } from '../../components/common/FuelProofModal';
import { Modal } from '../../components/common/Modal';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  Compass,
  CreditCard,
  Download,
  Filter,
  Fuel,
  Info,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Truck,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  XCircle,
  FileSpreadsheet,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

interface OwnerPortalProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const OwnerPortal: React.FC<OwnerPortalProps> = ({ currentTab, onTabChange }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => mockStorage.getVehicles());
  const [trips, setTrips] = useState<Trip[]>(() => mockStorage.getTrips());
  const [fuelAlerts, setFuelAlerts] = useState<FuelAlert[]>(() => mockStorage.getFuelAlerts());
  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>(() => mockStorage.getFuelRecords());
  const [expenses, setExpenses] = useState<Expense[]>(() => mockStorage.getExpenses());
  const [drivers, setDrivers] = useState<Driver[]>(() => mockStorage.getDrivers());

  const [selectedAlert, setSelectedAlert] = useState<FuelAlert | null>(null);
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [selectedVehicleForTracking, setSelectedVehicleForTracking] = useState<Vehicle>(vehicles[0]);

  // Search & Filter States
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<'all' | 'running' | 'idle' | 'stopped' | 'offline'>('all');
  const [alertFilter, setAlertFilter] = useState<'all' | 'open' | 'verified' | 'false_alarm'>('all');

  // Add Vehicle Modal State
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [newReg, setNewReg] = useState('');
  const [newModel, setNewModel] = useState('Tata Signa 4825.TK (16 Wheeler)');
  const [newCapacity, setNewCapacity] = useState('365');
  const [newDriverName, setNewDriverName] = useState('Mahesh Patel');

  // KPI Calculations
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === 'running').length;
  const idleVehicles = vehicles.filter((v) => v.status === 'idle').length;
  const stoppedVehicles = vehicles.filter((v) => v.status === 'stopped').length;
  const offlineVehicles = vehicles.filter((v) => v.status === 'offline').length;
  const onTripVehicles = vehicles.filter((v) => !!v.currentTripId).length;

  const openAlerts = fuelAlerts.filter((a) => a.status === 'open');
  const criticalDrains = openAlerts.filter((a) => a.alertType === 'fuel_drain');
  const totalFuelCost = fuelRecords.reduce((sum, r) => sum + r.amountRupees, 0);
  const totalExpensesCost = expenses.reduce((sum, e) => sum + e.amountRupees, 0);

  // Review Alert Handler
  const handleReviewAlert = (alertId: string, status: 'verified' | 'false_alarm', note: string) => {
    mockStorage.reviewAlert(alertId, status, note, 'Rajesh Agrawal (Owner)');
    setFuelAlerts(mockStorage.getFuelAlerts());
  };

  // Add Vehicle Handler
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReg) return;
    const newVeh = mockStorage.addVehicle({
      registrationNumber: newReg.toUpperCase(),
      makeModel: newModel,
      tankCapacityL: Number(newCapacity) || 350,
      currentFuelL: Number(newCapacity) * 0.75 || 250,
      status: 'stopped',
      assignedDriverName: newDriverName,
      location: {
        lat: 22.7196,
        lng: 75.8577,
        address: 'Indore Depot Yard #2',
        speedKmph: 0,
        heading: 0,
        lastUpdated: 'Just now',
      },
      deviceImei: `8642930419${Math.floor(10000 + Math.random() * 90000)}`,
      sensorModel: 'Omnicomm LLS4 RS-485 Capacitive',
      batteryVoltage: 24.2,
      odometerKm: 45000,
      lastCalibrationDate: new Date().toLocaleDateString('en-GB'),
    });
    setVehicles(mockStorage.getVehicles());
    setIsAddVehicleOpen(false);
    setNewReg('');
  };

  // Filtered Vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const matchSearch =
      v.registrationNumber.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
      (v.assignedDriverName && v.assignedDriverName.toLowerCase().includes(vehicleSearch.toLowerCase())) ||
      v.makeModel.toLowerCase().includes(vehicleSearch.toLowerCase());
    const matchFilter = vehicleFilter === 'all' || v.status === vehicleFilter;
    return matchSearch && matchFilter;
  });

  // Filtered Fuel Alerts
  const filteredAlerts = fuelAlerts.filter((a) => {
    if (alertFilter === 'all') return true;
    return a.status === alertFilter;
  });

  // Chart data: Fuel consumption & expenses over days
  const expenseChartData = [
    { day: '25 Oct', diesel: 24500, toll: 4200, bhatta: 3000 },
    { day: '26 Oct', diesel: 18200, toll: 3800, bhatta: 2800 },
    { day: '27 Oct', diesel: 31000, toll: 5100, bhatta: 3500 },
    { day: '28 Oct', diesel: 22400, toll: 4600, bhatta: 3200 },
    { day: '29 Oct', diesel: 37600, toll: 6200, bhatta: 4500 },
    { day: '30 Oct', diesel: 29800, toll: 5400, bhatta: 3900 },
  ];

  const vehicleStatusData = [
    { name: 'Running', value: activeVehicles, color: '#10b981' },
    { name: 'Idle', value: idleVehicles, color: '#f59e0b' },
    { name: 'Stopped', value: stoppedVehicles, color: '#64748b' },
    { name: 'Offline', value: offlineVehicles, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* SECTION 1: FLEET OVERVIEW DASHBOARD */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Fleet"
              value={totalVehicles}
              subtext={`${activeVehicles} Running • ${onTripVehicles} on Trips`}
              icon={Truck}
              accentColor="sky"
              onClick={() => onTabChange('vehicles')}
            />
            <KPICard
              title="Fuel Anomalies"
              value={openAlerts.length}
              subtext={`${criticalDrains.length} Suspected Drains • ${openAlerts.length - criticalDrains.length} Mismatches`}
              icon={AlertTriangle}
              accentColor="rose"
              trend={{ value: `${openAlerts.length} Require Review`, isPositive: false }}
              onClick={() => onTabChange('fuel')}
            />
            <KPICard
              title="Fuel Expenditure"
              value={`₹${totalFuelCost.toLocaleString('en-IN')}`}
              subtext="Reconciled with RS-485 Sensors"
              icon={Fuel}
              accentColor="amber"
              trend={{ value: 'Real-time', isPositive: true }}
              onClick={() => onTabChange('fuel')}
            />
            <KPICard
              title="Trip Khata Expenses"
              value={`₹${totalExpensesCost.toLocaleString('en-IN')}`}
              subtext="Toll, Driver Bhatta & Repairs"
              icon={CreditCard}
              accentColor="emerald"
              onClick={() => onTabChange('expenses')}
            />
          </div>

          {/* Urgent Fuel Anomalies Banner (Flagship Feature from PRD) */}
          {openAlerts.length > 0 && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-600 text-white">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Fuel Proof Alert: Urgent Anomalies Requiring Owner Review
                    </h3>
                    <p className="text-xs text-rose-800">
                      Sensor evidence packs ready with graph, location, engine state, and driver bill comparison.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onTabChange('fuel')}
                  className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 self-start sm:self-auto"
                >
                  View All Fuel Alerts <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {openAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl bg-white border border-rose-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-rose-400 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900">
                          {alert.vehicleReg}
                        </span>
                        <StatusBadge status={alert.alertType} size="sm" />
                        <span className="text-[11px] font-bold text-rose-600 font-mono">
                          {alert.confidenceScore}% Confidence
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                        {alert.locationName}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {alert.timestamp} • Driver: {alert.driverName}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedAlert(alert);
                        setIsFuelModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold shadow-xs shrink-0 transition"
                    >
                      View Evidence
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Charts Row: Fuel & Operational Spend + Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Spend Over Time */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Operational & Fuel Expenses Over Time (₹)
                  </h3>
                  <p className="text-xs text-slate-500">Diesel, Toll, and Driver Bhatta khata logs</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Diesel
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Toll
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Bhatta
                  </span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="diesel" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="toll" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bhatta" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Col: Fleet Status Distribution */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Fleet Status Breakdown</h3>
                <p className="text-xs text-slate-500">Live tracker telemetry states</p>
              </div>

              <div className="h-44 w-full my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                    >
                      {vehicleStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {vehicleStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-medium">{item.name}</span>
                    <span className="ml-auto font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tracking Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Central India Fleet Tracking Corridor</h3>
                <p className="text-xs text-slate-500">Live positions on NH-52 (Indore-Dhule-Bhiwandi) and Gujarat Routes</p>
              </div>
              <button
                onClick={() => onTabChange('tracking')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                Expand Live GPS Map <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <LiveMap
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleForTracking.id}
              onSelectVehicle={(v) => setSelectedVehicleForTracking(v)}
              height="380px"
            />
          </div>
        </div>
      )}

      {/* SECTION 2: VEHICLE MANAGEMENT */}
      {currentTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Vehicle Management</h2>
              <p className="text-xs text-slate-500">
                Track, register and inspect calibrated diesel tanks and assigned drivers
              </p>
            </div>
            <button
              onClick={() => setIsAddVehicleOpen(true)}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 text-xs font-bold shadow-xs flex items-center gap-2 self-start sm:self-auto transition"
            >
              <Plus className="w-4 h-4" /> Add New Truck
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by registration (e.g. MP 09), driver, or truck model..."
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              {(['all', 'running', 'idle', 'stopped', 'offline'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setVehicleFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                    vehicleFilter === filter
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Vehicle Reg & Model</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Fuel Tank Level</th>
                    <th className="py-3 px-4">Assigned Driver</th>
                    <th className="py-3 px-4">Last Location / Trip</th>
                    <th className="py-3 px-4">Speed</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map((veh) => {
                    const fuelPercent = Math.round((veh.currentFuelL / veh.tankCapacityL) * 100);
                    return (
                      <tr key={veh.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 font-mono text-sm">{veh.registrationNumber}</p>
                          <p className="text-[11px] text-slate-500">{veh.makeModel}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={veh.status} size="sm" />
                        </td>
                        <td className="py-3.5 px-4 min-w-[140px]">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1 font-bold">
                            <span className="text-sky-600">{veh.currentFuelL} L</span>
                            <span className="text-slate-400">{fuelPercent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                fuelPercent < 20 ? 'bg-rose-500' : fuelPercent < 50 ? 'bg-amber-500' : 'bg-sky-500'
                              }`}
                              style={{ width: `${fuelPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400">Cap: {veh.tankCapacityL} L</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{veh.assignedDriverName || 'Unassigned'}</p>
                          <p className="text-[10px] text-slate-400">Odo: {veh.odometerKm.toLocaleString('en-IN')} km</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-[200px]">
                          <p className="text-slate-700 font-medium truncate" title={veh.location.address}>
                            {veh.location.address}
                          </p>
                          {veh.currentTripRoute && (
                            <p className="text-[10px] text-sky-600 font-medium truncate">
                              Trip: {veh.currentTripRoute}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {veh.location.speedKmph} km/h
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedVehicleForTracking(veh);
                              onTabChange('tracking');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold transition"
                          >
                            Track Live
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: LIVE GPS TRACKING */}
      {currentTab === 'tracking' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Live Vehicle Fleet Tracking</h2>
              <p className="text-xs text-slate-500">
                Continuous Teltonika Codec 8 GPS tracking & RS-485 fuel level telemetry
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                Live 10s Ingest
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Sidebar Vehicle Selector */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                Tracked Vehicles ({vehicles.length})
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleForTracking(v)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      selectedVehicleForTracking.id === v.id
                        ? 'bg-sky-50 border-sky-300 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {v.registrationNumber}
                      </span>
                      <StatusBadge status={v.status} size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 truncate">
                      {v.location.address}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Speed: {v.location.speedKmph}k</span>
                      <span className="text-sky-600 font-bold">{v.currentFuelL} L</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <LiveMap
                vehicles={vehicles}
                selectedVehicleId={selectedVehicleForTracking.id}
                onSelectVehicle={(v) => setSelectedVehicleForTracking(v)}
                height="560px"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: FUEL MONITORING & PROOF REPORTS */}
      {currentTab === 'fuel' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Fuel Monitoring & Proof Reports</h2>
              <p className="text-xs text-slate-500">
                Rule-engine anomaly detection, capacitive sensor telemetry, and driver pump reconciliation
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(['all', 'open', 'verified', 'false_alarm'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setAlertFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    alertFilter === st ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Alerts & Evidence Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlerts.map((alert) => {
              const isDrain = alert.alertType === 'fuel_drain';
              const isMismatch = alert.alertType === 'reconciliation_mismatch';
              return (
                <div
                  key={alert.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl text-white ${
                          isDrain ? 'bg-rose-600' : isMismatch ? 'bg-orange-600' : 'bg-emerald-600'
                        }`}
                      >
                        <Fuel className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 font-mono text-sm">
                            {alert.vehicleReg}
                          </h4>
                          <StatusBadge status={alert.status} size="sm" />
                        </div>
                        <p className="text-xs text-slate-500">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Confidence</span>
                      <p className="text-base font-black text-slate-900 font-mono">{alert.confidenceScore}%</p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Anomaly Type:</span>
                      <span className="font-bold text-slate-800 capitalize">
                        {alert.alertType.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Volume Delta:</span>
                      <span className={`font-mono font-bold ${alert.fuelDeltaL < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {alert.fuelDeltaL > 0 ? `+${alert.fuelDeltaL}` : alert.fuelDeltaL} Litres
                      </span>
                    </div>
                    {alert.mismatchLitres && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Driver Bill vs Sensor Discrepancy:</span>
                        <span className="font-mono font-bold text-orange-600">
                          {alert.mismatchLitres} Litres Mismatch
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">Location:</span>
                      <span className="truncate max-w-[200px]" title={alert.locationName}>{alert.locationName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500">
                      Driver: <strong className="text-slate-700">{alert.driverName}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedAlert(alert);
                        setIsFuelModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xs transition"
                    >
                      Open Evidence Pack →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Historical Refill Records & Reconciliation Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Refill & Reconciliation Ledger</h3>
                <p className="text-xs text-slate-500">Comparing driver entered bills with sensor rise</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Vehicle</th>
                    <th className="py-3 px-4">Driver</th>
                    <th className="py-3 px-4">Pump Outlet</th>
                    <th className="py-3 px-4">Driver Claimed</th>
                    <th className="py-3 px-4">Sensor Detected</th>
                    <th className="py-3 px-4">Variance</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fuelRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono text-slate-600">{r.timestamp}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.vehicleReg}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">{r.driverName}</td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">{r.pumpName}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.litres} L</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-600">{r.sensorDetectedL} L</td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        {r.discrepancyL > 0 ? (
                          <span className="text-rose-600">-{r.discrepancyL} L</span>
                        ) : (
                          <span className="text-emerald-600">0 L</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ₹{r.amountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <StatusBadge status={r.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: TRIP MANAGEMENT */}
      {currentTab === 'trips' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Trip Operations & Monitoring</h2>
              <p className="text-xs text-slate-500">
                Dispatched trips, assigned trucks, freight khata, and real-time transit status
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Trip #</th>
                    <th className="py-3 px-4">Route (Origin ➔ Destination)</th>
                    <th className="py-3 px-4">Vehicle</th>
                    <th className="py-3 px-4">Driver</th>
                    <th className="py-3 px-4">Freight ₹</th>
                    <th className="py-3 px-4">Advance ₹</th>
                    <th className="py-3 px-4">Distance</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trips.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-700">{t.tripNumber}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {t.origin} ➔ {t.destination}
                        <p className="text-[10px] text-slate-400 font-normal">{t.cargoDescription}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{t.vehicleReg}</td>
                      <td className="py-3.5 px-4 text-slate-700">{t.driverName}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        ₹{t.freightAmountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        ₹{t.advanceAmountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{t.totalDistanceKm} km</td>
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

      {/* SECTION 6: EXPENSES & KHATA */}
      {currentTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Fleet Expenses & Khata Record</h2>
              <p className="text-xs text-slate-500">
                Driver trip expenses with attached receipt photo proof
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                Total Expenses: ₹{totalExpensesCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Trip #</th>
                    <th className="py-3 px-4">Vehicle</th>
                    <th className="py-3 px-4">Driver</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono text-slate-500">{e.date}</td>
                      <td className="py-3.5 px-4 font-mono text-sky-700 font-semibold">{e.tripNumber}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{e.vehicleReg}</td>
                      <td className="py-3.5 px-4 text-slate-700">{e.driverName}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-slate-100 text-slate-700">
                          {e.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-[220px] truncate">{e.description}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        ₹{e.amountRupees.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <StatusBadge status={e.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: DRIVER MANAGEMENT */}
      {currentTab === 'drivers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Driver Roster & Trust Records</h2>
              <p className="text-xs text-slate-500">
                Driver verification, DPDP consent tracking, and honest refill incentives
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{d.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{d.phone}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    ★ {d.rating}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">License:</span>
                    <span className="font-mono font-semibold text-slate-800">{d.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Truck:</span>
                    <span className="font-mono font-bold text-sky-600">{d.assignedVehicleReg || 'Free Pool'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verified Refills:</span>
                    <span className="font-bold text-emerald-600 font-mono">{d.verifiedFillsCount} fills (Trust)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DPDP Consent:</span>
                    <span className={d.dpdpConsentGiven ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {d.dpdpConsentGiven ? 'Granted ✓' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: REPORTS & ANALYTICS */}
      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Fleet Operations Analytics</h2>
            <p className="text-xs text-slate-500">
              Fuel economy benchmarks, anomaly frequencies, and trip profitability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Average Fleet Mileage (km / Litre)</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { trip: 'Indore-Mumbai', kml: 3.8 },
                    { trip: 'Pithampur-Guj', kml: 4.1 },
                    { trip: 'Dewas-Nagpur', kml: 3.6 },
                    { trip: 'Indore-Jaipur', kml: 3.9 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="trip" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} domain={[2, 5]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="kml" stroke="#0284c7" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Weekly Anomaly Detection Rate</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { week: 'W1 Oct', drains: 3, falseAlarms: 1 },
                    { week: 'W2 Oct', drains: 2, falseAlarms: 0 },
                    { week: 'W3 Oct', drains: 1, falseAlarms: 1 },
                    { week: 'W4 Oct', drains: 1, falseAlarms: 0 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="drains" fill="#ef4444" name="Confirmed Drains" />
                    <Bar dataKey="falseAlarms" fill="#94a3b8" name="False Alarms" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: SETTINGS & WHATSAPP CONFIG */}
      {currentTab === 'settings' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">WhatsApp Alert & Platform Settings</h2>
            <p className="text-xs text-slate-500">
              Configure daily summary dispatch and instant WhatsApp alerts (PRD Section 7.9)
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Business Notification Number</label>
              <input
                type="text"
                defaultValue="+91 98260 12345 (Rajesh Agrawal)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Daily Summary Dispatch Time</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="20:00">8:00 PM IST (Recommended by PRD AC-13)</option>
                <option value="21:00">9:00 PM IST</option>
                <option value="07:00">7:00 AM IST</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="block font-bold text-slate-700 uppercase mb-1">Alert Sensitivity Thresholds</label>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span>Minimum Fuel Drain for Instant WhatsApp Alert</span>
                  <span className="font-mono font-bold text-sky-700">10 Litres (PRD Default)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Driver vs Sensor Mismatch Tolerance</span>
                  <span className="font-mono font-bold text-sky-700">5% Tolerance</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Settings saved successfully to Saarthi Configuration Engine.')}
              className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Fuel Proof Report Modal */}
      <FuelProofModal
        alert={selectedAlert}
        isOpen={isFuelModalOpen}
        onClose={() => setIsFuelModalOpen(false)}
        onReview={handleReviewAlert}
      />

      {/* Add Truck Modal */}
      <Modal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        title="Add New Truck to Fleet"
        subtitle="Registers vehicle with Saarthi Fleet & Teltonika telematics"
      >
        <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Vehicle Registration Number</label>
            <input
              type="text"
              placeholder="e.g. MP 09 AB 1234"
              value={newReg}
              onChange={(e) => setNewReg(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono uppercase"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Make & Model</label>
            <select
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Tata Signa 4825.TK (16 Wheeler)">Tata Signa 4825.TK (16 Wheeler)</option>
              <option value="Ashok Leyland 2820 BS6 (10 Wheeler)">Ashok Leyland 2820 BS6 (10 Wheeler)</option>
              <option value="BharatBenz 3528C Heavy Hauler">BharatBenz 3528C Heavy Hauler</option>
              <option value="Eicher Pro 6028 Multi-Axle">Eicher Pro 6028 Multi-Axle</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tank Capacity (Litres)</label>
              <input
                type="number"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Assign Driver</label>
              <select
                value={newDriverName}
                onChange={(e) => setNewDriverName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {drivers.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.status})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddVehicleOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition"
            >
              Save Truck
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
