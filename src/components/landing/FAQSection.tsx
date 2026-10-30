import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'What is Saarthi?',
      a: 'Saarthi is an integrated transport operations management system designed for Indian small-to-medium fleet owners (5–100 trucks). It centralizes fleet tracking, trip planning, capacitive fuel monitoring, driver bhatta khata, and operational analytics into one intuitive platform.',
    },
    {
      q: 'Who can use Saarthi?',
      a: 'Saarthi provides five dedicated role portals: Fleet Owners (for high-level health and fuel proof reports), Fleet Managers / Dispatchers (for daily trip planning and expense reviews), Truck Drivers (a bilingual mobile app for logging fuel and expenses), Technicians / Installers (for QR pairing and tank calibration), and Platform Administrators.',
    },
    {
      q: 'Can Saarthi help manage multiple vehicles?',
      a: 'Yes. Saarthi is built for commercial fleets ranging from single depot operators with 5 trucks to multi-branch logistics companies with 100+ commercial vehicles. Each vehicle includes fuel tank capacity records, maintenance history, and assigned driver profiles.',
    },
    {
      q: 'How does trip management work?',
      a: 'Managers create trips with designated origins, destinations, cargo descriptions, agreed freight rates, and advances. The system validates vehicle and driver availability in real time to prevent duplicate bookings, and drivers can start, update milestones, and complete trips directly from their phones.',
    },
    {
      q: 'Can drivers record fuel and expenses on low-connectivity highways?',
      a: 'Yes. The Saarthi driver portal features an offline-first mobile design. Drivers can log diesel refills and snap dispenser meter and receipt photos in under 3 taps. Entries are saved locally on the device and sync automatically once network returns, avoiding duplicates.',
    },
    {
      q: 'Does Saarthi provide live vehicle tracking?',
      a: 'Yes. Saarthi integrates certified Teltonika FMC130/FMB trackers streaming Codec 8 telemetry over TCP. The tracking screen provides 10-second live location refreshes, trip speed, battery voltages, and historic route playbacks across national highway corridors.',
    },
    {
      q: 'How does Saarthi prevent false fuel theft alarms?',
      a: 'Unlike generic GPS fuel graphs that trigger on road inclines and liquid slosh, Saarthi standardizes on high-precision RS-485 capacitive fuel sensors and a multi-point tank calibration table. Anomaly detection evaluates vehicle movement states (engine OFF and stationary) and generates a Fuel Proof Report with confidence scoring before notifying the owner on WhatsApp.',
    },
    {
      q: 'Can Saarthi connect to existing GPS devices?',
      a: 'Saarthi’s ingest architecture is built on a hardware abstraction layer currently optimized for certified Teltonika FMB/FMC trackers and standard RS-485 capacitive level sensors. Integration with third-party or OEM telematics depends on configured API protocols.',
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Answers to Common Operational Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Everything you need to know about Saarthi's capabilities, hardware compatibility, and deployment.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-sky-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-850 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
