import {
  Vehicle,
  Driver,
  Trip,
  FuelAlert,
  FuelRecord,
  Expense,
  InstallationJob,
  PlatformTenant,
  DeviceHealthRecord,
  ActivityAuditLog,
} from '../types';
import {
  INITIAL_VEHICLES,
  INITIAL_DRIVERS,
  INITIAL_TRIPS,
  INITIAL_FUEL_ALERTS,
  INITIAL_FUEL_RECORDS,
  INITIAL_EXPENSES,
  INITIAL_INSTALLATION_JOBS,
  INITIAL_PLATFORM_TENANTS,
  INITIAL_DEVICE_HEALTH,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

const STORAGE_KEYS = {
  VEHICLES: 'saarthi_vehicles',
  DRIVERS: 'saarthi_drivers',
  TRIPS: 'saarthi_trips',
  FUEL_ALERTS: 'saarthi_fuel_alerts',
  FUEL_RECORDS: 'saarthi_fuel_records',
  EXPENSES: 'saarthi_expenses',
  INSTALLATION_JOBS: 'saarthi_installation_jobs',
  TENANTS: 'saarthi_tenants',
  DEVICE_HEALTH: 'saarthi_device_health',
  AUDIT_LOGS: 'saarthi_audit_logs',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Generate simple hash for demonstration audit log
function generateMockHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex}${hex}${hex}${hex}${hex}${hex}${hex}${hex}`.slice(0, 64);
}

export const mockStorage = {
  // Vehicles
  getVehicles: (): Vehicle[] => getFromStorage(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES),
  
  saveVehicles: (vehicles: Vehicle[]) => saveToStorage(STORAGE_KEYS.VEHICLES, vehicles),
  
  addVehicle: (vehicle: Omit<Vehicle, 'id'>): Vehicle => {
    const vehicles = mockStorage.getVehicles();
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `veh_${Date.now()}`,
    };
    const updated = [newVehicle, ...vehicles];
    mockStorage.saveVehicles(updated);
    mockStorage.addAuditLog('Vehicle Added', `Added vehicle ${newVehicle.registrationNumber}`, 'owner');
    return newVehicle;
  },

  updateVehicle: (id: string, updates: Partial<Vehicle>): Vehicle | null => {
    const vehicles = mockStorage.getVehicles();
    const index = vehicles.findIndex((v) => v.id === id);
    if (index === -1) return null;
    vehicles[index] = { ...vehicles[index], ...updates };
    mockStorage.saveVehicles(vehicles);
    return vehicles[index];
  },

  // Drivers
  getDrivers: (): Driver[] => getFromStorage(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS),
  
  saveDrivers: (drivers: Driver[]) => saveToStorage(STORAGE_KEYS.DRIVERS, drivers),

  updateDriverConsent: (driverId: string, consent: boolean): void => {
    const drivers = mockStorage.getDrivers();
    const driver = drivers.find((d) => d.id === driverId);
    if (driver) {
      driver.dpdpConsentGiven = consent;
      driver.dpdpConsentDate = consent ? new Date().toLocaleString('en-IN') : undefined;
      mockStorage.saveDrivers(drivers);
      mockStorage.addAuditLog('DPDP_CONSENT_UPDATED', `Driver ${driver.name} accepted location & camera consent`, 'driver');
    }
  },

  // Trips
  getTrips: (): Trip[] => getFromStorage(STORAGE_KEYS.TRIPS, INITIAL_TRIPS),
  
  saveTrips: (trips: Trip[]) => saveToStorage(STORAGE_KEYS.TRIPS, trips),

  createTrip: (tripData: Omit<Trip, 'id' | 'tripNumber'>): Trip => {
    const trips = mockStorage.getTrips();
    const count = trips.length + 1045;
    const newTrip: Trip = {
      ...tripData,
      id: `trp_${Date.now()}`,
      tripNumber: `TRP-2026-${count}`,
    };
    const updated = [newTrip, ...trips];
    mockStorage.saveTrips(updated);

    // Update vehicle and driver status
    mockStorage.updateVehicle(newTrip.vehicleId, {
      status: 'running',
      currentTripId: newTrip.id,
      currentTripRoute: `${newTrip.origin} ➔ ${newTrip.destination}`,
      assignedDriverId: newTrip.driverId,
      assignedDriverName: newTrip.driverName,
    });

    const drivers = mockStorage.getDrivers();
    const driver = drivers.find((d) => d.id === newTrip.driverId);
    if (driver) {
      driver.status = 'on_trip';
      driver.assignedVehicleReg = newTrip.vehicleReg;
      mockStorage.saveDrivers(drivers);
    }

    mockStorage.addAuditLog('TRIP_CREATED', `Trip ${newTrip.tripNumber} dispatched to ${newTrip.driverName}`, 'manager');
    return newTrip;
  },

  updateTripStatus: (tripId: string, status: Trip['status']): Trip | null => {
    const trips = mockStorage.getTrips();
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return null;
    trip.status = status;
    if (status === 'completed') {
      trip.endTime = new Date().toLocaleString('en-IN');
      // Free up vehicle and driver
      mockStorage.updateVehicle(trip.vehicleId, {
        status: 'stopped',
        currentTripId: undefined,
        currentTripRoute: undefined,
      });
      const drivers = mockStorage.getDrivers();
      const driver = drivers.find((d) => d.id === trip.driverId);
      if (driver) {
        driver.status = 'available';
        mockStorage.saveDrivers(drivers);
      }
    } else if (status === 'in_progress' && !trip.startTime) {
      trip.startTime = new Date().toLocaleString('en-IN');
    }
    mockStorage.saveTrips(trips);
    mockStorage.addAuditLog('TRIP_STATUS_UPDATED', `Trip ${trip.tripNumber} changed to ${status}`, 'system');
    return trip;
  },

  // Fuel Alerts & Proof Reports
  getFuelAlerts: (): FuelAlert[] => getFromStorage(STORAGE_KEYS.FUEL_ALERTS, INITIAL_FUEL_ALERTS),

  saveFuelAlerts: (alerts: FuelAlert[]) => saveToStorage(STORAGE_KEYS.FUEL_ALERTS, alerts),

  reviewAlert: (alertId: string, status: 'verified' | 'false_alarm', reviewNote: string, reviewerName: string): FuelAlert | null => {
    const alerts = mockStorage.getFuelAlerts();
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return null;
    alert.status = status;
    alert.reviewNote = reviewNote;
    alert.reviewedBy = reviewerName;
    alert.reviewedAt = new Date().toLocaleString('en-IN');
    mockStorage.saveFuelAlerts(alerts);

    mockStorage.addAuditLog(
      status === 'verified' ? 'ALERT_VERIFIED' : 'ALERT_MARKED_FALSE_ALARM',
      `Fuel Alert ${alert.id} (${alert.alertType}) on ${alert.vehicleReg} reviewed by ${reviewerName}`,
      'owner'
    );
    return alert;
  },

  // Fuel Records
  getFuelRecords: (): FuelRecord[] => getFromStorage(STORAGE_KEYS.FUEL_RECORDS, INITIAL_FUEL_RECORDS),

  saveFuelRecords: (records: FuelRecord[]) => saveToStorage(STORAGE_KEYS.FUEL_RECORDS, records),

  addFuelRecord: (record: Omit<FuelRecord, 'id' | 'sensorDetectedL' | 'discrepancyL' | 'status' | 'reconciled'>): FuelRecord => {
    const records = mockStorage.getFuelRecords();
    // Simulate real-world capacitive sensor reading (slight variance of -2L to +1L)
    const sensorDetected = Math.max(0, record.litres - Math.floor(Math.random() * 3));
    const discrepancy = Math.abs(record.litres - sensorDetected);
    const isMismatch = discrepancy > 5;

    const newRecord: FuelRecord = {
      ...record,
      id: `fl_rec_${Date.now()}`,
      sensorDetectedL: sensorDetected,
      discrepancyL: discrepancy,
      status: isMismatch ? 'mismatch_flagged' : 'verified',
      reconciled: true,
    };

    const updated = [newRecord, ...records];
    mockStorage.saveFuelRecords(updated);

    // Update vehicle fuel level
    const vehicles = mockStorage.getVehicles();
    const vehicle = vehicles.find((v) => v.id === record.vehicleId);
    if (vehicle) {
      vehicle.currentFuelL = Math.min(vehicle.tankCapacityL, vehicle.currentFuelL + sensorDetected);
      mockStorage.saveVehicles(vehicles);
    }

    // Increment driver's verified fill count
    const drivers = mockStorage.getDrivers();
    const driver = drivers.find((d) => d.id === record.driverId);
    if (driver) {
      driver.verifiedFillsCount += 1;
      mockStorage.saveDrivers(drivers);
    }

    mockStorage.addAuditLog('FUEL_RECORD_LOGGED', `Driver logged ${record.litres}L refill for ${record.vehicleReg} at ${record.pumpName}`, 'driver');
    return newRecord;
  },

  // Expenses
  getExpenses: (): Expense[] => getFromStorage(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES),

  saveExpenses: (expenses: Expense[]) => saveToStorage(STORAGE_KEYS.EXPENSES, expenses),

  addExpense: (expense: Omit<Expense, 'id' | 'status'>): Expense => {
    const expenses = mockStorage.getExpenses();
    const newExpense: Expense = {
      ...expense,
      id: `exp_${Date.now()}`,
      status: 'pending',
    };
    const updated = [newExpense, ...expenses];
    mockStorage.saveExpenses(updated);
    mockStorage.addAuditLog('EXPENSE_SUBMITTED', `Driver submitted ${expense.category} expense of ₹${expense.amountRupees}`, 'driver');
    return newExpense;
  },

  updateExpenseStatus: (expenseId: string, status: 'approved' | 'rejected', approverName: string, reason?: string): Expense | null => {
    const expenses = mockStorage.getExpenses();
    const expense = expenses.find((e) => e.id === expenseId);
    if (!expense) return null;
    expense.status = status;
    expense.approvedBy = approverName;
    expense.approvedAt = new Date().toLocaleString('en-IN');
    if (reason) expense.rejectionReason = reason;
    mockStorage.saveExpenses(expenses);

    mockStorage.addAuditLog(
      status === 'approved' ? 'EXPENSE_APPROVED' : 'EXPENSE_REJECTED',
      `Expense #${expense.id} (₹${expense.amountRupees}) ${status} by ${approverName}${reason ? ` Reason: ${reason}` : ''}`,
      'manager'
    );
    return expense;
  },

  // Installation Jobs
  getInstallationJobs: (): InstallationJob[] => getFromStorage(STORAGE_KEYS.INSTALLATION_JOBS, INITIAL_INSTALLATION_JOBS),

  saveInstallationJobs: (jobs: InstallationJob[]) => saveToStorage(STORAGE_KEYS.INSTALLATION_JOBS, jobs),

  updateInstallationJob: (jobId: string, updates: Partial<InstallationJob>): InstallationJob | null => {
    const jobs = mockStorage.getInstallationJobs();
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return null;
    Object.assign(job, updates);
    mockStorage.saveInstallationJobs(jobs);
    mockStorage.addAuditLog('INSTALLATION_UPDATED', `Technician updated installation job ${job.jobCode} for ${job.vehicleReg}`, 'installer');
    return job;
  },

  // Admin / Device Health
  getDeviceHealth: (): DeviceHealthRecord[] => getFromStorage(STORAGE_KEYS.DEVICE_HEALTH, INITIAL_DEVICE_HEALTH),
  
  getTenants: (): PlatformTenant[] => getFromStorage(STORAGE_KEYS.TENANTS, INITIAL_PLATFORM_TENANTS),

  // Audit Logs (Hash Chained)
  getAuditLogs: (): ActivityAuditLog[] => getFromStorage(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS),

  addAuditLog: (action: string, details: string, role: string, actor = 'Demo User'): ActivityAuditLog => {
    const logs = mockStorage.getAuditLogs();
    const prevHash = logs.length > 0 ? logs[0].currentHash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toLocaleString('en-IN') + ' IST';
    const currentHash = generateMockHash(`${prevHash}:${action}:${details}:${timestamp}`);

    const newLog: ActivityAuditLog = {
      id: `aud_${Date.now()}`,
      timestamp,
      actor,
      role,
      action,
      resource: 'Saarthi Operations Ledger',
      details,
      currentHash,
      previousHash: prevHash,
    };

    const updated = [newLog, ...logs];
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, updated);
    return newLog;
  },

  resetDemoData: () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
