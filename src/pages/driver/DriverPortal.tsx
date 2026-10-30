import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockStorage } from '../../services/mockStorage';
import { Trip, FuelRecord, Expense } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Camera,
  Check,
  CheckCircle,
  Clock,
  Compass,
  CreditCard,
  FileText,
  Fuel,
  Globe,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Shield,
  ShieldCheck,
  Smartphone,
  Truck,
  Upload,
  User,
  Wifi,
  WifiOff,
} from 'lucide-react';

export const DriverPortal: React.FC = () => {
  const { currentUser, language, setLanguage } = useAuth();
  const isHi = language === 'hi';

  const [trips, setTrips] = useState<Trip[]>(() => mockStorage.getTrips());
  const [driver, setDriver] = useState(() => {
    const drivers = mockStorage.getDrivers();
    return drivers.find((d) => d.id === currentUser.id) || drivers[0];
  });

  // Active Assigned Trip
  const activeTrip = trips.find((t) => t.driverId === driver.id && t.status === 'in_progress') ||
    trips.find((t) => t.driverId === driver.id) || trips[0];

  // Forms states
  const [activeScreen, setActiveScreen] = useState<'home' | 'fuel' | 'expense' | 'consent'>('home');
  const [isOffline, setIsOffline] = useState(false);

  // Fuel form
  const [fuelLitres, setFuelLitres] = useState('');
  const [fuelAmount, setFuelAmount] = useState('');
  const [pumpName, setPumpName] = useState('IOCL Swastik Fuel Station, Sendhwa Bypass');
  const [odometer, setOdometer] = useState('84320');
  const [meterPhoto, setMeterPhoto] = useState<string | null>(null);
  const [receiptPhoto, setReceiptPhoto] = useState<string | null>(null);
  const [fuelSuccessMsg, setFuelSuccessMsg] = useState(false);

  // Expense form
  const [expCategory, setExpCategory] = useState<'toll' | 'driver_bhatta' | 'repair' | 'other'>('toll');
  const [expAmount, setExpAmount] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expPhoto, setExpPhoto] = useState<string | null>(null);
  const [expSuccessMsg, setExpSuccessMsg] = useState(false);

  // Calculate default fuel amount when litres change
  const handleLitresChange = (val: string) => {
    setFuelLitres(val);
    const l = parseFloat(val);
    if (!isNaN(l)) {
      setFuelAmount((l * 94).toFixed(0)); // Standard ₹94/L
    }
  };

  // Submit Fuel Refill
  const handleFuelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fuelLitres || !fuelAmount) return;

    mockStorage.addFuelRecord({
      vehicleId: activeTrip ? activeTrip.vehicleId : 'veh_01',
      vehicleReg: activeTrip ? activeTrip.vehicleReg : driver.assignedVehicleReg || 'MP 09 HG 4821',
      driverId: driver.id,
      driverName: driver.name,
      tripId: activeTrip?.id,
      timestamp: new Date().toLocaleString('en-IN'),
      litres: Number(fuelLitres),
      amountRupees: Number(fuelAmount),
      ratePerLitre: 94.0,
      pumpName,
      odometerKm: Number(odometer) || 84320,
      meterPhotoUrl: meterPhoto || 'https://images.unsplash.com/photo-1579734662649-807f6144c661?w=400&auto=format&fit=crop&q=80',
      receiptPhotoUrl: receiptPhoto || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80',
    });

    setFuelSuccessMsg(true);
    setTimeout(() => {
      setFuelSuccessMsg(false);
      setActiveScreen('home');
      setFuelLitres('');
      setFuelAmount('');
      setMeterPhoto(null);
      setReceiptPhoto(null);
    }, 1800);
  };

  // Submit Expense
  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount) return;

    mockStorage.addExpense({
      tripId: activeTrip?.id || 'trp_101',
      tripNumber: activeTrip?.tripNumber || 'TRP-2026-1042',
      vehicleReg: activeTrip?.vehicleReg || 'MP 09 HG 4821',
      driverId: driver.id,
      driverName: driver.name,
      category: expCategory,
      amountRupees: Number(expAmount),
      date: new Date().toLocaleDateString('en-GB'),
      description: expDesc || (isHi ? 'टोल पर्ची या भरण खर्च' : 'Highway expense claim'),
      receiptPhotoUrl: expPhoto || 'https://images.unsplash.com/photo-1554415707-9e4c07dca04d?w=400&auto=format&fit=crop&q=80',
    });

    setExpSuccessMsg(true);
    setTimeout(() => {
      setExpSuccessMsg(false);
      setActiveScreen('home');
      setExpAmount('');
      setExpDesc('');
      setExpPhoto(null);
    }, 1800);
  };

  // Consent Handler
  const handleGiveConsent = () => {
    mockStorage.updateDriverConsent(driver.id, true);
    setDriver({ ...driver, dpdpConsentGiven: true });
    setActiveScreen('home');
  };

  // Handle Photo selection simulation
  const handleSimulatePhoto = (type: 'meter' | 'receipt' | 'exp') => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1579734662649-807f6144c661?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554415707-9e4c07dca04d?w=400&auto=format&fit=crop&q=80',
    ];
    if (type === 'meter') setMeterPhoto(samplePhotos[0]);
    if (type === 'receipt') setReceiptPhoto(samplePhotos[1]);
    if (type === 'exp') setExpPhoto(samplePhotos[2]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 text-slate-100 flex flex-col shadow-2xl relative">
      {/* Mobile Top App Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white shadow-md">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight leading-tight text-white">
              सारथी <span className="text-xs font-normal text-sky-400">| Saarthi Driver</span>
            </h1>
            <p className="text-[10px] text-slate-400">
              {driver.name} ({activeTrip?.vehicleReg || 'MP 09 HG 4821'})
            </p>
          </div>
        </div>

        {/* Language & Offline Simulation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(isHi ? 'en' : 'hi')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 text-xs font-bold border border-slate-700 flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            {isHi ? 'English' : 'हिंदी'}
          </button>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`p-1.5 rounded-lg border text-xs transition ${
              isOffline
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}
            title={isOffline ? 'Offline Mode (Local Storage Sync)' : 'Connected to Saarthi Cloud'}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* DPDP Consent Banner if not given */}
      {!driver.dpdpConsentGiven && activeScreen !== 'consent' && (
        <div className="bg-amber-500/20 border-b border-amber-500/40 p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Shield className="w-4 h-4 shrink-0" />
            <span>{isHi ? 'निजता एवं स्थान सहमति आवश्यक' : 'DPDP Privacy Consent Required'}</span>
          </div>
          <button
            onClick={() => setActiveScreen('consent')}
            className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-[11px]"
          >
            {isHi ? 'सहमति दें' : 'Review'}
          </button>
        </div>
      )}

      {/* Main Content Areas */}
      <div className="flex-1 p-4 pb-24 overflow-y-auto space-y-4">
        {/* VIEW 1: HOME & ACTIVE TRIP */}
        {activeScreen === 'home' && (
          <div className="space-y-4">
            {/* Active Trip Card */}
            {activeTrip && (
              <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono text-xs font-bold">
                    {activeTrip.tripNumber}
                  </span>
                  <StatusBadge status={activeTrip.status} size="sm" />
                </div>

                {/* Route Diagram */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-sky-400 shrink-0 ring-4 ring-sky-900" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        {isHi ? 'प्रस्थान स्थल (Origin)' : 'Origin Depot'}
                      </p>
                      <p className="text-sm font-bold text-white">{activeTrip.origin}</p>
                    </div>
                  </div>

                  <div className="ml-1.5 w-0.5 h-6 bg-slate-700 border-l border-dashed border-slate-500" />

                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-emerald-400 shrink-0 ring-4 ring-emerald-900" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        {isHi ? 'गंतव्य (Destination)' : 'Destination'}
                      </p>
                      <p className="text-sm font-bold text-white">{activeTrip.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Cargo & Advance Details */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-400">{isHi ? 'ट्रिप एडवांस' : 'Trip Advance'}</p>
                    <p className="text-sm font-black text-emerald-400 font-mono">
                      ₹{activeTrip.advanceAmountRupees.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-400">{isHi ? 'वाहन नंबर' : 'Vehicle Reg'}</p>
                    <p className="text-sm font-mono font-bold text-white">{activeTrip.vehicleReg}</p>
                  </div>
                </div>

                {/* Trip State Actions */}
                <div className="pt-2">
                  {activeTrip.status === 'planned' ? (
                    <button
                      onClick={() => {
                        mockStorage.updateTripStatus(activeTrip.id, 'in_progress');
                        setTrips(mockStorage.getTrips());
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      <Compass className="w-5 h-5" />
                      {isHi ? 'यात्रा शुरू करें (Start Trip)' : 'Start Trip'}
                    </button>
                  ) : activeTrip.status === 'in_progress' ? (
                    <button
                      onClick={() => {
                        mockStorage.updateTripStatus(activeTrip.id, 'completed');
                        setTrips(mockStorage.getTrips());
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {isHi ? 'यात्रा पूरी करें (Mark Trip Completed)' : 'Complete Trip'}
                    </button>
                  ) : (
                    <div className="text-center p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      ✓ {isHi ? 'यह यात्रा पूरी हो चुकी है' : 'Trip Completed Successfully'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick 2-Tap Action Buttons (PRD: Large Touch Targets ≥ 48px) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveScreen('fuel')}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-left space-y-2 transition shadow-md active:scale-95"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 w-fit">
                  <Fuel className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    {isHi ? 'ईंधन भरें' : 'Log Fuel Refill'}
                  </h3>
                  <p className="text-[11px] text-amber-200">
                    {isHi ? 'मीटर व पर्ची फोटो सहित' : 'With Meter Photo Proof'}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveScreen('expense')}
                className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/40 hover:border-sky-400 text-left space-y-2 transition shadow-md active:scale-95"
              >
                <div className="p-2.5 rounded-xl bg-sky-500 text-slate-950 w-fit">
                  <CreditCard className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    {isHi ? 'खर्च जोड़ें' : 'Add Expense'}
                  </h3>
                  <p className="text-[11px] text-sky-200">
                    {isHi ? 'टोल, भत्ता, मरम्मत पर्ची' : 'Toll, Repair, Bhatta'}
                  </p>
                </div>
              </button>
            </div>

            {/* Driver Trust Score & Verified Fills Incentive (PRD FR-34, Q15) */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isHi ? 'सारथी चालक विश्वास स्कोर' : 'Saarthi Driver Trust Record'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {driver.verifiedFillsCount} {isHi ? 'सत्यापित ईंधन प्रविष्टियाँ (ईमानदारी प्रमाण)' : 'Verified fills on record'}
                  </p>
                </div>
              </div>
              <span className="font-black text-lg text-emerald-400 font-mono">
                ★ {driver.rating}
              </span>
            </div>
          </div>
        )}

        {/* VIEW 2: FAST FUEL ENTRY (PRD: Under 3 taps) */}
        {activeScreen === 'fuel' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">
                {isHi ? 'डीजल भराव प्रविष्टि (Fuel Refill)' : 'Log Fuel Refill'}
              </h2>
              <button
                onClick={() => setActiveScreen('home')}
                className="text-xs text-slate-400 hover:text-white"
              >
                {isHi ? 'वापस' : 'Back'}
              </button>
            </div>

            {fuelSuccessMsg ? (
              <div className="p-8 text-center bg-emerald-500/20 border border-emerald-500/40 rounded-2xl space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {isHi ? 'ईंधन प्रविष्टि सफलतापूर्वक दर्ज हुई!' : 'Refill Saved Successfully!'}
                </h3>
                <p className="text-xs text-emerald-300">
                  {isHi ? 'सेंसर मिलान व रिपोर्ट तैयार की जा रही है...' : 'Reconciling with capacitive fuel sensor...'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFuelSubmit} className="space-y-4 text-xs">
                {/* Litres Input */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'कितने लीटर डीजल भराया?' : 'Fuel Quantity (Litres)'} *
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 120"
                    value={fuelLitres}
                    onChange={(e) => handleLitresChange(e.target.value)}
                    required
                    className="w-full text-2xl font-black font-mono p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Total Rupee Amount */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'कुल राशि (रुपये)' : 'Total Amount (₹)'} *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 11280"
                    value={fuelAmount}
                    onChange={(e) => setFuelAmount(e.target.value)}
                    required
                    className="w-full text-xl font-black font-mono p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isHi ? 'अनुमानित दर: ₹94.00 प्रति लीटर' : 'Calculated at standard ₹94.00/L'}
                  </p>
                </div>

                {/* Pump Outlet Name */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'पेट्रोल पंप / स्थान का नाम' : 'Fuel Pump / Outlet Name'}
                  </label>
                  <input
                    type="text"
                    value={pumpName}
                    onChange={(e) => setPumpName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200"
                  />
                </div>

                {/* Odometer Reading */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'ओडोमीटर रीडिंग (किलोमीटर)' : 'Current Odometer (km)'}
                  </label>
                  <input
                    type="number"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono"
                  />
                </div>

                {/* Camera / Photo Upload for Meter & Receipt (PRD FR-34, AC-9) */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center space-y-2">
                    <p className="font-bold text-white text-[11px]">
                      {isHi ? 'पंप मीटर फोटो' : 'Pump Meter'}
                    </p>
                    {meterPhoto ? (
                      <div className="relative">
                        <img src={meterPhoto} alt="Meter" className="w-full h-24 object-cover rounded-lg" />
                        <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] px-1 rounded">✓</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto('meter')}
                        className="w-full py-4 rounded-lg border border-dashed border-slate-600 hover:border-amber-400 text-slate-400 flex flex-col items-center gap-1 transition"
                      >
                        <Camera className="w-6 h-6 text-amber-400" />
                        <span className="text-[10px]">{isHi ? 'फोटो खींचें' : 'Snap Photo'}</span>
                      </button>
                    )}
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center space-y-2">
                    <p className="font-bold text-white text-[11px]">
                      {isHi ? 'डीजल रसीद फोटो' : 'Fuel Bill Receipt'}
                    </p>
                    {receiptPhoto ? (
                      <div className="relative">
                        <img src={receiptPhoto} alt="Receipt" className="w-full h-24 object-cover rounded-lg" />
                        <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] px-1 rounded">✓</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto('receipt')}
                        className="w-full py-4 rounded-lg border border-dashed border-slate-600 hover:border-amber-400 text-slate-400 flex flex-col items-center gap-1 transition"
                      >
                        <Camera className="w-6 h-6 text-amber-400" />
                        <span className="text-[10px]">{isHi ? 'रसीद खींचें' : 'Snap Bill'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Fast Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg transition active:scale-95"
                >
                  {isHi ? 'प्रविष्टि दर्ज करें (Submit Refill)' : 'Submit Refill Entry'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 3: FAST EXPENSE ENTRY */}
        {activeScreen === 'expense' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white">
                {isHi ? 'ट्रिप खर्च जोड़ें (Add Expense)' : 'Add Trip Expense'}
              </h2>
              <button
                onClick={() => setActiveScreen('home')}
                className="text-xs text-slate-400 hover:text-white"
              >
                {isHi ? 'वापस' : 'Back'}
              </button>
            </div>

            {expSuccessMsg ? (
              <div className="p-8 text-center bg-emerald-500/20 border border-emerald-500/40 rounded-2xl space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {isHi ? 'खर्च सफलतापूर्वक भेजा गया!' : 'Expense Submitted for Review!'}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleExpenseSubmit} className="space-y-4 text-xs">
                {/* Category Selector */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'खर्च का प्रकार' : 'Expense Category'} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'toll', labelHi: 'टोल टैक्स (Toll)', labelEn: 'Toll Tax' },
                      { id: 'driver_bhatta', labelHi: 'चालक भत्ता (Bhatta)', labelEn: 'Driver Bhatta' },
                      { id: 'repair', labelHi: 'टायर / मरम्मत (Repair)', labelEn: 'Repair / Maintenance' },
                      { id: 'other', labelHi: 'अन्य खर्च (Other)', labelEn: 'Other Expense' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setExpCategory(cat.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold transition ${
                          expCategory === cat.id
                            ? 'bg-sky-600 text-white border-sky-400'
                            : 'bg-slate-950 text-slate-300 border-slate-700'
                        }`}
                      >
                        {isHi ? cat.labelHi : cat.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'रुपये (Amount ₹)' : 'Amount (₹)'} *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    required
                    className="w-full text-2xl font-black font-mono p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'विवरण (Description)' : 'Description / Remarks'}
                  </label>
                  <input
                    type="text"
                    placeholder={isHi ? 'उदा: शिरपुर टोल कैश पर्ची' : 'e.g. Toll plaza cash ticket'}
                    value={expDesc}
                    onChange={(e) => setExpDesc(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                {/* Photo upload */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    {isHi ? 'पर्ची / रसीद की फोटो' : 'Receipt / Ticket Photo'}
                  </label>
                  {expPhoto ? (
                    <div className="relative">
                      <img src={expPhoto} alt="Expense photo" className="w-full h-32 object-cover rounded-xl border border-slate-700" />
                      <button
                        type="button"
                        onClick={() => setExpPhoto(null)}
                        className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 text-white rounded text-[10px]"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulatePhoto('exp')}
                      className="w-full py-6 rounded-xl border border-dashed border-slate-700 hover:border-sky-400 text-slate-400 flex flex-col items-center gap-1 transition"
                    >
                      <Camera className="w-6 h-6 text-sky-400" />
                      <span className="text-[11px] font-bold text-slate-300">
                        {isHi ? 'पर्ची की फोटो खींचें' : 'Take Photo of Receipt'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Submit Expense */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-base shadow-lg transition active:scale-95"
                >
                  {isHi ? 'खर्च दर्ज करें (Submit Claim)' : 'Submit Expense Claim'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 4: DPDP PRIVACY & CONSENT NOTICE (PRD FR-38, FR-51, AC-15) */}
        {activeScreen === 'consent' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-white">
              {isHi ? 'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) सूचना' : 'DPDP Privacy Notice & Consent'}
            </h2>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-800 text-sky-200">
                <p className="font-bold">
                  {isHi ? 'सारथी पारदर्शिता गारंटी' : 'Saarthi Transparency Guarantee'}
                </p>
                <p className="mt-1 text-[11px]">
                  {isHi
                    ? 'स्थान और ईंधन फोटो केवल यात्रा सुरक्षा, पंप धोखाधड़ी से सुरक्षा और आपकी ईमानदारी साबित करने के लिए उपयोग किया जाता है।'
                    : 'Location and fuel photos are collected strictly for trip operations and to verify driver honesty against pump discrepancies.'}
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1">
                  {isHi ? 'हम क्या एकत्र करते हैं:' : 'What We Collect:'}
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                  <li>{isHi ? 'ट्रिप के दौरान वाहन का जीपीएस स्थान' : 'Vehicle GPS location during active trip'}</li>
                  <li>{isHi ? 'ईंधन भरते समय मीटर व रसीद की फोटो' : 'Meter and receipt photos during refill'}</li>
                  <li>{isHi ? 'ओडोमीटर रीडिंग और टोल पर्चियां' : 'Odometer readings and toll cash tickets'}</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-1">
                  {isHi ? 'डेटा प्रतिधारण व अधिकार:' : 'Data Retention & Rights:'}
                </p>
                <p className="text-[11px]">
                  {isHi
                    ? 'जीपीएस डेटा 12 माह तथा फोटो 6 माह पश्चात स्वचालित रूप से नष्ट कर दिए जाते हैं।'
                    : 'GPS data is retained for 12 months; photos for 6 months, after which they are purged.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleGiveConsent}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg transition"
            >
              ✓ {isHi ? 'मैं नियम समझकर सहमति देता हूँ' : 'I Understand & Give Consent'}
            </button>
          </div>
        )}
      </div>

      {/* Driver Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveScreen('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeScreen === 'home' ? 'text-sky-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">{isHi ? 'यात्रा' : 'Trip'}</span>
        </button>

        <button
          onClick={() => setActiveScreen('fuel')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeScreen === 'fuel' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Fuel className="w-5 h-5" />
          <span className="text-[10px]">{isHi ? 'ईंधन' : 'Fuel'}</span>
        </button>

        <button
          onClick={() => setActiveScreen('expense')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeScreen === 'expense' ? 'text-sky-400 font-bold' : 'text-slate-400'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[10px]">{isHi ? 'खर्च' : 'Expense'}</span>
        </button>

        <button
          onClick={() => setActiveScreen('consent')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeScreen === 'consent' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">{isHi ? 'निजता' : 'DPDP'}</span>
        </button>
      </div>
    </div>
  );
};
