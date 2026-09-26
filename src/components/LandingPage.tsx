import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  Eye, 
  Radio, 
  ShieldAlert, 
  MapPin, 
  Play, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Wifi, 
  Zap,
  Globe,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, startHackathonDemoFlow } = useApp();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-12">
            
            {/* National Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-6 shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>AI VEHICLE COMMUNICATION & SAFETY PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
              🚗 REAR CAR COMMUNICATOR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mt-2">
                Giving Vehicles a Voice for Safer Roads
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
              An AI-powered vehicle communication and road-safety platform that helps drivers communicate intentions, detect hazards and share critical safety information with nearby vehicles.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('driver')}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
              >
                <Car className="w-5 h-5 fill-current" />
                <span>Launch Driver App</span>
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all hover:bg-slate-800"
              >
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>Try AI Vision</span>
              </button>

              <button
                onClick={() => startHackathonDemoFlow('hazard')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>

          </div>

          {/* VISUAL HERO ANIMATION CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
            
            {/* ANIMATION 1: V2V Communication Path */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Radio className="w-4 h-4" /> V2V Overtaking Communication Flow
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                  LIVE SIMULATION
                </span>
              </div>

              <div className="py-6 flex flex-col items-center justify-center gap-4 font-mono text-xs">
                
                {/* Vehicle A */}
                <div className="w-full bg-slate-900/90 border border-cyan-500/40 p-3.5 rounded-xl flex items-center justify-between shadow-lg shadow-cyan-500/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold">
                      🚗 Vehicle A
                    </div>
                    <div>
                      <p className="font-bold text-white">Lead Vehicle (RCC-001)</p>
                      <p className="text-[11px] text-slate-400">Driver signals pass intent</p>
                    </div>
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded font-bold border border-cyan-500/30">
                    PASS FROM LEFT →
                  </span>
                </div>

                {/* Animated Signal Arrow */}
                <div className="flex flex-col items-center gap-1 text-cyan-400 animate-bounce py-1">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-bold">📡 TRANSMITTING SIGNAL</span>
                </div>

                {/* Vehicle B */}
                <div className="w-full bg-slate-900/90 border border-emerald-500/40 p-3.5 rounded-xl flex items-center justify-between shadow-lg shadow-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
                      🚗 Vehicle B
                    </div>
                    <div>
                      <p className="font-bold text-white">Follower Vehicle (RCC-002)</p>
                      <p className="text-[11px] text-slate-400">Dashboard receives warning</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded font-bold border border-emerald-500/30">
                    RECEIVED: PASS FROM LEFT
                  </span>
                </div>

              </div>
            </div>

            {/* ANIMATION 2: AI Hazard Detection to V2V Broadcast */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4" /> AI Road Scanner & Hazard Pipeline
                </span>
                <span className="text-[11px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                  94% CONFIDENCE
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center py-4 text-[11px] font-mono">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                  <span className="text-lg mb-1">📷</span>
                  <span className="font-bold text-slate-300">CAMERA</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-cyan-500/40 flex flex-col items-center justify-center text-cyan-400">
                  <span className="text-lg mb-1">🤖</span>
                  <span className="font-bold">AI SCAN</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-red-500/40 flex flex-col items-center justify-center text-red-400">
                  <span className="text-lg mb-1">🕳️</span>
                  <span className="font-bold">POTHOLE</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-purple-500/40 flex flex-col items-center justify-center text-purple-400">
                  <span className="text-lg mb-1">📡</span>
                  <span className="font-bold">V2V BROADCAST</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-emerald-500/40 flex flex-col items-center justify-center text-emerald-400">
                  <span className="text-lg mb-1">🚗</span>
                  <span className="font-bold">NEARBY MESH</span>
                </div>
              </div>

              <div className="mt-4 bg-red-950/40 border border-red-500/40 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
                  <div>
                    <p className="font-bold text-red-200">⚠️ POTHOLE DETECTED (~40m ahead)</p>
                    <p className="text-[11px] text-red-300/80">Position: Primary Lane | Severity: HIGH</p>
                  </div>
                </div>
                <span className="bg-red-500/20 text-red-300 px-2.5 py-1 rounded font-mono font-bold text-[11px]">
                  AUTOMATED AUDIO WARN
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 41: MOST IMPORTANT USP */}
      <section className="py-16 bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-full">
              CORE INNOVATION & USP
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4 mb-4">
              "REAR CAR COMMUNICATOR IS NOT JUST A REAR DISPLAY."
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              It is a complete physical hardware vehicle communication device, AI vision intelligence layer, real-time hazard detection mesh, V2V communication protocol, GPS locator, and road safety ecosystem.
            </p>
          </div>

          {/* Architecture Flow Chart */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex flex-col items-center gap-6">
              
              {/* Vehicle Node */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold px-6 py-3 rounded-2xl flex items-center gap-2 text-base shadow-lg shadow-cyan-500/20">
                <Car className="w-6 h-6" />
                <span>🚗 CONNECTED VEHICLE PLATFORM</span>
              </div>

              <div className="w-0.5 h-6 bg-slate-700"></div>

              {/* Split Branches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Branch 1: Hardware */}
                <div className="bg-slate-950 border border-cyan-500/30 p-5 rounded-2xl text-center">
                  <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">PHYSICAL HARDWARE LAYER</h4>
                  <p className="text-xs text-slate-400 mb-3">Arduino / ESP32 + Push Buttons</p>
                  <div className="bg-cyan-950/60 border border-cyan-800 text-cyan-300 py-2 rounded font-mono text-xs font-bold">
                    REAR ALPHANUMERIC LED DISPLAY
                  </div>
                </div>

                {/* Branch 2: AI Vision */}
                <div className="bg-slate-950 border border-purple-500/30 p-5 rounded-2xl text-center">
                  <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-3">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">AI INTELLIGENCE LAYER</h4>
                  <p className="text-xs text-slate-400 mb-3">Computer Vision + OpenCV / YOLO</p>
                  <div className="bg-purple-950/60 border border-purple-800 text-purple-300 py-2 rounded font-mono text-xs font-bold">
                    ROAD HAZARD & DEPTH ESTIMATION
                  </div>
                </div>

              </div>

              <div className="w-0.5 h-6 bg-slate-700"></div>

              {/* Unified V2V Network Node */}
              <div className="w-full bg-slate-950 border border-emerald-500/40 p-5 rounded-2xl text-center shadow-lg shadow-emerald-500/10">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <Radio className="w-5 h-5" />
                  <span>📡 V2V & MESH NETWORK COMMUNICATION LAYER</span>
                </div>
                <p className="text-xs text-slate-300">
                  Broadcasts real-time safety alerts, overtaking signals, and emergency SOS directly to surrounding vehicles & regional traffic control dashboard.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 33: WHY IT MATTERS (PROJECT IMPACT) */}
      <section className="py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              PROJECT IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
              WHY REAR CAR COMMUNICATOR MATTERS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clearer Vehicle Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminates dangerous ambiguities caused by relying only on horns, headlights, hand gestures, and driver assumptions.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Earlier Hazard Awareness</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provides follower drivers crucial extra reaction time by detecting road hazards (potholes, debris) ~40m ahead.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Connected Vehicle Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allows surrounding vehicles to automatically share safety alerts and intent signals over peer-to-peer V2V.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Emergency Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provides a structured emergency SOS workflow linking physical HELP buttons directly to nearby vehicles & traffic control.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Collaborative Intelligence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregates reports from multiple vehicles to confirm hazards with 94%+ confidence before pinning on regional smart map.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Distraction-Free Interface</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mobile-first driving mode with hands-free voice control so drivers never need to type while operating the vehicle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 34: FUTURE ROADMAP */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 border border-purple-800 px-3 py-1 rounded-full">
              FUTURE HORIZON
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
              DEVELOPMENT ROADMAP
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-slate-900 border border-cyan-500/40 p-4 rounded-xl">
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                TODAY
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">Hardware + Software</h4>
              <p className="text-xs text-slate-400">Arduino/ESP32 LED prototype + AI vision software app.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                NEXT
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">ESP32 Bluetooth</h4>
              <p className="text-xs text-slate-400">Seamless BLE wireless smartphone integration.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                NEXT
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">Edge AI Processing</h4>
              <p className="text-xs text-slate-400">On-board Jetson Nano / Raspberry Pi 5 neural inference.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                NEXT
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">Dedicated V2X / 5G</h4>
              <p className="text-xs text-slate-400">Sub-millisecond low-latency C-V2X direct radio protocol.</p>
            </div>

            <div className="bg-slate-900 border border-purple-500/40 p-4 rounded-xl">
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                FUTURE
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">Smart Cities Ecosystem</h4>
              <p className="text-xs text-slate-400">Autonomous traffic signal & emergency infrastructure grid.</p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 42: FINAL TAGLINE */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-4">
            REAR CAR COMMUNICATOR
          </h2>
          <p className="text-xl sm:text-2xl text-cyan-400 font-medium font-display tracking-tight mb-8">
            "Giving Vehicles a Voice. Making Roads More Predictable."
          </p>

          <button
            onClick={() => setActiveTab('driver')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-black font-extrabold px-8 py-4 rounded-2xl text-base shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105"
          >
            <span>Experience Connected Safety Platform Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};
