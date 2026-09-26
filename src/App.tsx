import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HackathonDemoModal } from './components/HackathonDemoModal';
import { LandingPage } from './components/LandingPage';
import { DriverApp } from './components/DriverApp';
import { DrivingMode } from './components/DrivingMode';
import { HardwareInterface } from './components/HardwareInterface';
import { AIRoadScanner } from './components/AIRoadScanner';
import { V2VNetwork } from './components/V2VNetwork';
import { LiveSmartMap } from './components/LiveSmartMap';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyAndRoadmap } from './components/PrivacyAndRoadmap';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17]">
      {/* Hide standard navbar in distraction-free driving mode for full screen focus */}
      {activeTab !== 'driving-mode' && <Navbar />}

      <HackathonDemoModal />

      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'driver' && <DriverApp />}
        {activeTab === 'driving-mode' && <DrivingMode />}
        {activeTab === 'hardware' && <HardwareInterface />}
        {activeTab === 'vision' && <AIRoadScanner />}
        {activeTab === 'v2v' && <V2VNetwork />}
        {activeTab === 'map' && <LiveSmartMap />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'privacy' && <PrivacyAndRoadmap />}
      </main>

      {activeTab !== 'driving-mode' && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
