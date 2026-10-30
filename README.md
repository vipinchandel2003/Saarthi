# Saarthi – Integrated Transport Operations Management System

> **Tagline:** *Your Fleet. Your Fuel. Your Business. Connected.*  
> **Region / Pilot Focus:** Central India Transport Corridor (Indore, Pithampur SEZ, Dewas, Sendhwa, Dhule, Bhiwandi / Mumbai, Gujarat)

---

## 🚀 Overview

**Saarthi** is a modern, responsive, production-ready SaaS platform engineered specifically for Indian transporters and fleet operations (5–100 trucks). Built strictly in accordance with the **Product Requirements Document (Fuel + Trip + Khata Platform MVP v0.1)**.

The platform includes a **public-facing marketing website** with an animated transport vehicle in the hero background, interactive fleet demonstration, and instant access to **five dedicated operational portals**.

---

## 🌟 The Public Website & Key Sections

- **Hero with Animated Moving Transport Truck:** Cinematic highway scene with custom SVG Indian multi-axle container hauler, suspension bounce, spinning alloy wheels, glowing LED headlights, and flowing road markings.
- **Hero Floating Telemetry Card:** Live simulated tracking card for `MP 09 HG 4821` on the Indore ➔ Bhiwandi corridor with an animated trip progress bar (68%).
- **Trust & Value Strip:** Core benefits: Fleet Visibility, Fuel Monitoring, Trip Management, Expense Tracking, and Operational Insights.
- **8 Comprehensive Feature Cards:** Direct links to deep portal workflows.
- **How It Works Timeline:** 4-step connected process (Connect Fleet, Plan & Assign, Record Operations, Review & Improve).
- **Interactive Fleet Demonstration Cockpit:** Searchable vehicle list with status filters (Running, Idle, Stopped) and interactive Central India SVG route map.
- **Product Dashboard Preview:** Tabbed browser mockup showcasing the Owner Overview, Trip Dispatches, and Fuel Recharts curve.
- **Solutions by Role:** Role cards for Fleet Owners, Managers, Drivers, Installers, and Admins with one-click portal launch buttons.
- **Fuel & Expense Transparency:** Highlight of the Fuel Proof Report & reconciliation engine (-27L discrepancy flagged with dispenser meter and cash memo photos).
- **Contact & Pilot Request Form:** Form with 10-digit Indian mobile validation, fleet size tiers, and demo registry feedback.
- **Accordion FAQ:** 8 questions based on PRD covering telematics hardware, slosh filtering, and DPDP compliance.
- **Onboarding Modal:** 1-click sandbox access to any of the 5 portals.

---

## 🌟 The 5 Dedicated Operational Portals

### 1. 🏢 Owner / Fleet Owner Portal (`Rajesh Agrawal – Agrawal Roadlines Indore`)
- **Fleet Overview:** Real-time KPI cockpit (Vehicles, active trips, idle/stopped/offline status, diesel spend, khata expense total, open fuel anomalies).
- **Vehicle Management:** Searchable, filterable fleet table with diesel tank levels (L / %), battery voltages, assigned drivers, and an "Add New Truck" modal.
- **Live GPS Tracking:** Interactive Central India transport route map (NH-52 corridor) with speed callouts, telemetry inspector, trip track playback simulation, and Teltonika FMC130 Codec 8 simulated telemetry.
- **Fuel Monitoring & Proof Reports (Flagship Differentiator):**
  - Sudden fuel drain detection (e.g. 38.5L drop in 8 mins on NH-52 bypass while engine was off).
  - Pump reconciliation mismatch detection (Driver entered bill claim of 145L vs RS-485 sensor rise of only 118L = 27L discrepancy).
  - Confidence scoring (0–100%).
  - Full Fuel Proof Report modal with interactive sensor level graph, engine states, map location, pump meter & receipt photos, and one-click "Confirm Refill / Verify Incident" or "Mark as False Alarm" review action.
- **Trip Operations & Expense Khata:** Freight khata, toll surcharge records, driver bhatta logs, and repair tickets.
- **Reports & Analytics:** Fleet mileage (km/L) charts, expense breakdown, and anomaly frequency trends.
- **WhatsApp Integration Settings:** Configurable daily summary dispatch time (default 8:00 PM IST per PRD AC-13) and alert thresholds.

### 2. 📋 Manager / Dispatcher Portal (`Vikram Chouhan`)
- **Operations Cockpit:** Active highway dispatches, available assets, delayed trips, and pending reviews.
- **Trip Planning & Fast Dispatch:** Modal for creating trips with origin/destination, cargo, agreed freight ₹, advance ₹, and strict validation preventing assignment of unavailable trucks or drivers.
- **Live Trip Progression:** Status tracking and direct action to mark trips completed.
- **Driver Expense Review & Approvals:** Review toll, bhatta, and repair claims with attached receipt photos. Mandatory rejection reason required per PRD AC-12.
- **Alert Triage Queue:** Triage queue ranked by confidence score.

### 3. 📱 Driver Portal – Mobile-First Smartphone Experience (`Ramesh Verma`)
- **Mobile-First Smartphone Layout:** Optimized for touchscreens with touch targets ≥ 48px.
- **Bilingual Interface:** Instant English & हिंदी (Devanagari) toggle (`सारथी चालक`, `ईंधन भरें`, `खर्च जोड़ें`).
- **DPDP Act Privacy Notice & Consent Flow:** In-app consent screen before location/photo capture, explaining that fuel and location data protect driver honesty against pump discrepancies (PRD FR-38, AC-15).
- **At Most 3 Taps Fuel Refill:**
  1. Tap "ईंधन भरें (Log Fuel)"
  2. Enter litres (auto-calculates amount at ₹94/L) and snap/preview dispenser meter & receipt photos
  3. Tap "प्रविष्टि दर्ज करें (Submit)"
- **Trip Khata Expense Entry:** Log toll, food/bhatta, repair tickets with photo preview.
- **Offline Sync Indicator:** Shows server connectivity and offline sync resilience.
- **Driver Trust Rating:** Verified refills count and driver honesty incentive.

### 4. 🔧 Installer / Technician Portal (`Mukesh Sharma`)
- **Assigned Calibration Jobs:** Telematics sensor fitting jobs at Indore Depot / Dewas Yard.
- **QR Code Provisioning:** Pairing Teltonika FMC130 4G tracker IMEI with vehicle diesel tanks (PRD FR-8, AC-1).
- **Tank Calibration Wizard:** Multi-point calibration curve table (Depth in mm, Sensor raw mV, Litres) with add/edit point.
- **Live Telemetry Packet Verification (AC-1):** Live Codec 8 TCP packet verification test showing 24.3V external chassis voltage, sensor mV, and GPS lock before sign-off.
- **Quality Checklist:** Anti-slosh baffle verification, grounding braid, and tamper seal check.

### 5. 🛡️ Platform Administrator Portal (`Amitabh Sengupta`)
- **Multi-Tenant Fleet Management:** Transporter tenant organizations with plan tiers.
- **User & Role-Based Access Control (RBAC):** All 5 user roles managed.
- **Device & Telemetry Health Dashboard:** Real-time Teltonika tracker monitoring (IMEIs, SIM ICCID, firmware version, voltage, sensor health, tamper alerts).
- **Tamper-Evident Hash-Chained Audit Ledger (NFR-15, AC-17):** Cryptographic SHA-256 hash chaining of fuel events and administrative actions with interactive "Verify Ledger Integrity" checker.
- **DPDP Data Retention Policies:** 12 months for GPS, 6 months for photos, 7 years for statutory audit ledger.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Charts:** Recharts
- **State & Services:** Typed local mock storage service with reactive state persistence

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/vipinchandel2003/Saarthi.git

# Navigate into the project
cd Saarthi

# Install dependencies
npm install

# Run the local development server
npm run dev

# Or build for production
npm run build
```

Open your browser at `http://localhost:5173/` to explore the public homepage and all five portals!
