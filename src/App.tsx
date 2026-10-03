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
import { AdvancedFeatures } from './components/AdvancedFeatures';
import { PrivacyAndRoadmap } from './components/PrivacyAndRoadmap';
import { V2ISync } from './components/V2ISync';
import { CustomLEDDesigner } from './components/CustomLEDDesigner';
import { Footer } from './components/Footer';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md glass-panel p-8 rounded-2xl border-red-500/50">
            <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ Application Render Error</h2>
            <p className="text-xs text-slate-300 font-mono mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {String(this.state.error?.message || this.state.error)}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs"
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
        {activeTab === 'led-designer' && <CustomLEDDesigner />}
        {activeTab === 'vision' && <AIRoadScanner />}
        {activeTab === 'v2v' && <V2VNetwork />}
        {activeTab === 'v2i' && <V2ISync />}
        {activeTab === 'map' && <LiveSmartMap />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'advanced' && <AdvancedFeatures />}
        {activeTab === 'privacy' && <PrivacyAndRoadmap />}
      </main>

      {activeTab !== 'driving-mode' && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
