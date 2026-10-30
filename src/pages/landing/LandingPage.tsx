import React, { useState } from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { HeroSection } from '../../components/landing/HeroSection';
import { BenefitsStrip } from '../../components/landing/BenefitsStrip';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { HowItWorksSection } from '../../components/landing/HowItWorksSection';
import { InteractiveFleetDemo } from '../../components/landing/InteractiveFleetDemo';
import { DashboardPreviewSection } from '../../components/landing/DashboardPreviewSection';
import { SolutionsSection } from '../../components/landing/SolutionsSection';
import { FuelTransparencySection } from '../../components/landing/FuelTransparencySection';
import { WhySaarthiSection } from '../../components/landing/WhySaarthiSection';
import { ContactDemoForm } from '../../components/landing/ContactDemoForm';
import { FAQSection } from '../../components/landing/FAQSection';
import { Footer } from '../../components/landing/Footer';
import { OnboardingModal } from '../../components/landing/OnboardingModal';
import { UserRole } from '../../types';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenDashboard,
  onSelectRole,
}) => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar
        onOpenLogin={onOpenLogin}
        onOpenDashboard={onOpenDashboard}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Animated Moving Truck */}
        <HeroSection
          onOpenDashboard={onOpenDashboard}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* 3. Trust and Value Strip */}
        <BenefitsStrip />

        {/* 4. Features Section */}
        <FeaturesSection
          onSelectRole={onSelectRole}
          onOpenDashboard={onOpenDashboard}
        />

        {/* 5. How It Works Section */}
        <HowItWorksSection />

        {/* 6. Interactive Fleet Demonstration Cockpit */}
        <InteractiveFleetDemo />

        {/* 7. Product Dashboard Preview */}
        <DashboardPreviewSection onOpenDashboard={onOpenDashboard} />

        {/* 8. Solutions by Role */}
        <SolutionsSection onSelectRole={onSelectRole} />

        {/* 9. Fuel and Expense Transparency */}
        <FuelTransparencySection onOpenDashboard={onOpenDashboard} />

        {/* 10. Why Saarthi Principles */}
        <WhySaarthiSection />

        {/* 11. Contact and Demo Request Form */}
        <ContactDemoForm />

        {/* 12. FAQ Section */}
        <FAQSection />
      </main>

      {/* 13. Footer */}
      <Footer
        onOpenLogin={onOpenLogin}
        onOpenDashboard={onOpenDashboard}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onSelectRole={onSelectRole}
      />

      {/* Onboarding / Demo Access Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSelectRole={onSelectRole}
      />
    </div>
  );
};
