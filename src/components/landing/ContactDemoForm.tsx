import React, { useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone,
  RotateCcw,
  Send,
  Truck,
  User,
} from 'lucide-react';

export const ContactDemoForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('21–50');
  const [role, setRole] = useState('Fleet Owner');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Business email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Indian phone regex (10 digits, optional +91 prefix)
    const cleanedPhone = phone.replace(/[\s-]/g, '').replace(/^\+91/, '');
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!companyName.trim()) newErrors.companyName = 'Fleet or company name is required';
    if (!message.trim()) newErrors.message = 'Please provide details about your fleet needs';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setVehicleCount('21–50');
    setRole('Fleet Owner');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            Connect With Saarthi
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Let's Bring Your Fleet Operations Together.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal">
            Tell us about your transport business and explore how Saarthi could fit your operational workflow.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Demo Request Successfully Logged!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your operational inquiry for <strong>{companyName}</strong> ({vehicleCount} vehicles) has been recorded in our demonstration registry.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-sky-300 max-w-md mx-auto">
                Demonstration Notice: In a live environment, a Saarthi transport engineer coordinates sensor benchmarks and pilot calibration within 24 hours.
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Agrawal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. rajesh@agrawalroadlines.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Phone Number (India) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 98260 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Company / Fleet Name */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Company or Fleet Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Agrawal Roadlines Indore"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.companyName ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.companyName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Number of Vehicles */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Number of Vehicles in Fleet *
                  </label>
                  <select
                    value={vehicleCount}
                    onChange={(e) => setVehicleCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="1–5">1–5 Commercial Vehicles</option>
                    <option value="6–20">6–20 Commercial Vehicles</option>
                    <option value="21–50">21–50 Commercial Vehicles</option>
                    <option value="51–100">51–100 Commercial Vehicles</option>
                    <option value="100+">100+ Commercial Vehicles</option>
                  </select>
                </div>

                {/* Your Role */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Your Operational Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Fleet Owner">Fleet Owner / Transporter</option>
                    <option value="Fleet Manager">Fleet Manager</option>
                    <option value="Dispatcher">Dispatcher / Operations Executive</option>
                    <option value="Logistics Operator">Logistics Operator</option>
                    <option value="Other">Other Stakeholder</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Message / Fleet Route Details *
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about your primary routes (e.g. Indore-Mumbai, MP-Gujarat) and key operational pain points..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full p-3 rounded-xl bg-slate-900 border text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.message ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.message && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Form Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-slate-500">
                  Protected by DPDP-compliant enterprise privacy policies.
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-xs transition"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Logging Request...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
