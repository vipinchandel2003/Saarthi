import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import {
  ArrowRight,
  ChevronRight,
  Compass,
  LayoutDashboard,
  LogIn,
  Menu,
  Shield,
  Truck,
  X,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenDashboard,
  onOpenOnboarding,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Fleet Demo', href: '#fleet-demo' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Fuel Proof', href: '#fuel-transparency' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <Logo variant="light" size="sm" showTagline={false} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 transition"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>Login</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 transition shadow-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Open Dashboard</span>
          </button>

          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 hover:opacity-95 shadow-md shadow-sky-500/20 transition active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenDashboard}
            className="px-2.5 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold sm:hidden"
          >
            App
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-sm font-semibold text-slate-200 hover:text-sky-400 py-1.5 border-b border-slate-900"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-slate-900 border border-slate-700 text-white"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-sky-600 text-white"
            >
              Open Dashboard
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOnboarding();
            }}
            className="w-full py-3 rounded-xl text-xs font-black text-center bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 shadow-md"
          >
            Get Started / Free Demo →
          </button>
        </div>
      )}
    </header>
  );
};
