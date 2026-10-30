export type UserRole = 'owner' | 'manager' | 'driver' | 'installer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  tenantId: string;
  tenantName: string;
  avatar?: string;
}

export type VehicleStatus = 'running' | 'idle' | 'stopped' | 'offline';

export interface VehicleLocation {
  lat: number;
  lng: number;
  address: string;
  speedKmph: number;
  heading: number;
  lastUpdated: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string; // e.g. MP 09 HG 4821
  makeModel: string; // e.g. Tata Signa 4825.TK
  tankCapacityL: number;
  currentFuelL: number;
  status: VehicleStatus;
  assignedDriverId?: string;
  assignedDriverName?: string;
  currentTripId?: string;
  currentTripRoute?: string;
  location: VehicleLocation;
  deviceImei: string;
  sensorModel: string;
  batteryVoltage: number;
  odometerKm: number;
  lastCalibrationDate: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  assignedVehicleReg?: string;
  status: 'available' | 'on_trip' | 'off_duty';
  experienceYears: number;
  rating: number;
  verifiedFillsCount: number;
  dpdpConsentGiven: boolean;
  dpdpConsentDate?: string;
  preferredLanguage: 'hi' | 'en';
}

export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export interface Trip {
  id: string;
  tripNumber: string; // e.g. TRP-2026-1042
  origin: string; // e.g. Indore Depot
  destination: string; // e.g. Bhiwandi Logistics Park
  vehicleId: string;
  vehicleReg: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  status: TripStatus;
  startTime?: string;
  endTime?: string;
  startOdometer?: number;
  endOdometer?: number;
  totalDistanceKm: number;
  freightAmountRupees: number;
  advanceAmountRupees: number;
  fuelConsumedL: number;
  expensesTotalRupees: number;
  cargoDescription: string;
  notes?: string;
}

export type FuelAlertStatus = 'open' | 'verified' | 'false_alarm';
export type FuelAlertType = 
  | 'fuel_drain' 
  | 'fuel_refill' 
  | 'reconciliation_mismatch' 
  | 'sensor_disconnected' 
  | 'device_power_cut' 
  | 'device_offline';

export interface FuelGraphPoint {
  time: string;
  fuelLitres: number;
  speedKmph: number;
  engineState: 'running' | 'idle' | 'stopped';
}

export interface FuelAlert {
  id: string;
  alertType: FuelAlertType;
  severity: 'critical' | 'high' | 'medium' | 'info';
  vehicleId: string;
  vehicleReg: string;
  driverName: string;
  timestamp: string;
  locationName: string;
  coordinates: [number, number];
  fuelDeltaL: number; // e.g. -32L for drain, +140L for refill
  sensorLitres: number;
  driverReportedLitres?: number;
  mismatchLitres?: number;
  confidenceScore: number; // 0 - 100%
  engineState: 'running' | 'idle' | 'stopped';
  speedKmph: number;
  status: FuelAlertStatus;
  reviewNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  fuelGraphData: FuelGraphPoint[];
  driverPhotoUrl?: string;
  receiptPhotoUrl?: string;
  tamperEvidence?: string;
}

export interface FuelRecord {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  driverId: string;
  driverName: string;
  tripId?: string;
  timestamp: string;
  litres: number;
  amountRupees: number;
  ratePerLitre: number;
  pumpName: string;
  odometerKm: number;
  meterPhotoUrl?: string;
  receiptPhotoUrl?: string;
  sensorDetectedL: number;
  discrepancyL: number;
  status: 'normal' | 'mismatch_flagged' | 'verified' | 'rejected';
  reconciled: boolean;
}

export type ExpenseCategory = 'diesel' | 'toll' | 'driver_bhatta' | 'repair' | 'advance' | 'other';
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';

export interface Expense {
  id: string;
  tripId: string;
  tripNumber: string;
  vehicleReg: string;
  driverId: string;
  driverName: string;
  category: ExpenseCategory;
  amountRupees: number;
  date: string;
  description: string;
  receiptPhotoUrl?: string;
  status: ExpenseStatus;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface CalibrationPoint {
  pointIndex: number;
  litres: number;
  rawVoltageMv?: number;
  rawSensorValue?: number;
  depthMm: number;
}

export interface InstallationJob {
  id: string;
  jobCode: string;
  transporterName: string;
  vehicleReg: string;
  vehicleMakeModel: string;
  tankCapacityL: number;
  tankShape: 'cylindrical' | 'rectangular' | 'd_shaped';
  installerName: string;
  assignedDate: string;
  status: 'assigned' | 'in_progress' | 'calibrated' | 'verified' | 'completed';
  deviceImei: string;
  sensorSerial: string;
  sensorModel: string;
  calibrationPoints: CalibrationPoint[];
  testPacketReceived?: boolean;
  liveTestPacket?: {
    receivedAt: string;
    codec: string;
    voltage: number;
    sensorMv: number;
    calculatedLitres: number;
    gpsLock: boolean;
    satellites: number;
  };
  notes?: string;
  completionPhotos: string[];
}

export interface PlatformTenant {
  id: string;
  name: string;
  city: string;
  state: string;
  contactPerson: string;
  phone: string;
  vehiclesCount: number;
  activePlan: 'MVP Pilot (₹399/truck/mo)' | 'Fleet Pro (₹499/truck/mo)' | 'Enterprise';
  status: 'active' | 'trial' | 'suspended';
  joinedDate: string;
}

export interface DeviceHealthRecord {
  imei: string;
  vehicleReg: string;
  tenantName: string;
  trackerModel: string;
  sensorModel: string;
  simIccid: string;
  firmwareVersion: string;
  externalVoltage: number;
  backupBatteryPercent: number;
  sensorStatus: 'healthy' | 'warning' | 'disconnected';
  lastSeenTime: string;
  packetsPerDay: number;
  status: 'online' | 'offline' | 'tamper_alert';
}

export interface ActivityAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  currentHash: string;
  previousHash: string;
}
