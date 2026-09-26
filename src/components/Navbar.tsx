import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  Eye, 
  Cpu, 
  Radio, 
  MapPin, 
  BarChart3, 
  Play, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Navigation,
  Sparkles,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    vehicle, 
    emergencyState, 
    startHackathonDemoFlow, 
    speakEnabled, 
    setSpeakEnabled 
  } = useApp();

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Sparkles },
    { id: 'driver', label: 'Driver App', icon: Car },
    { id: 'driving-mode', label: 'Driving Mode', icon: Navigation },
    { id: 'hardware', label: 'Hardware LED', icon: Cpu },
    { id: 'vision', label: 'AI Road Scan', icon: Eye },
    { id: 'v2v', label: 'V2V Network', icon: Radio },
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'admin', label: 'Control Center', icon: BarChart3 },
    { id: 'privacy', label: 'Privacy & Team', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      {/* Top emergency warning bar if emergency active */}
      {emergencyState.active && (
        <div className="bg-red-600 text-white px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2 animate-pulse">
          <ShieldAlert className="w-4 h-4" />
          <span>🚨 EMERGENCY SOS ACTIVE — VEHICLE RCC-001 BROADCASTING LOCATION TO NEARBY TRAFFIC & SOS CONTROL CENTER</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 text-left group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-black font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  REAR CAR COMMUNICATOR
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-bold border border-cyan-500/30">
                  AI ROAD SAFETY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Giving Vehicles a Voice for Safer Roads
              </p>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Audio Voice Toggle */}
            <button
              onClick={() => setSpeakEnabled(!speakEnabled)}
              title={speakEnabled ? "Mute Voice Warnings" : "Enable Voice Warnings"}
              className={`p-2 rounded-lg border text-xs transition-all ${
                speakEnabled
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {speakEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Hardware Status Indicator Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-mono text-[11px]">
                {vehicle.id} | HARDWARE: <span className="text-emerald-400 font-semibold">ONLINE</span>
              </span>
            </div>

            {/* 🎬 START SYSTEM DEMO BUTTON */}
            <button
              onClick={() => startHackathonDemoFlow('hazard')}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all animate-pulse"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="tracking-wide">🎬 START SYSTEM DEMO</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Tab Scroll Menu */}
      <div className="lg:hidden flex overflow-x-auto gap-1 px-4 py-2 border-t border-slate-800/60 bg-slate-950/80 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 bg-slate-900 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
