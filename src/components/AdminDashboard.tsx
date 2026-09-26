import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Car, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  HelpCircle,
  TrendingUp,
  Clock,
  Radio,
  Activity
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { emergencyState, resolveEmergency } = useApp();
  const [showExplainabilityModal, setShowExplainabilityModal] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              REGIONAL TRAFFIC CONTROL COMMAND CENTER
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-Time Vehicle Safety Analytics, AI Detection Telemetry & Incident Response
          </p>
        </div>

        <button
          onClick={() => setShowExplainabilityModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Why Did AI Generate This Alert?</span>
        </button>
      </div>

      {/* SECTION 26: DESKTOP COMMAND CENTER KPIS (6 CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">CONNECTED VEHICLES</p>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-cyan-400" />
            <span className="text-xl font-extrabold text-white font-mono">1,248</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">ACTIVE HAZARDS</p>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className="text-xl font-extrabold text-amber-400 font-mono">38</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">EMERGENCY ALERTS</p>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-xl font-extrabold text-red-400 font-mono">6</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">AI DETECTIONS</p>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-extrabold text-white font-mono">4,892</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">VERIFIED HAZARDS</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xl font-extrabold text-emerald-400 font-mono">31</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">AVG ALERT DELIVERY</p>
          <div className="flex items-center gap-1.5">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-xl font-extrabold text-white font-mono">2.4</span>
            <span className="text-xs text-slate-400 font-mono">sec</span>
          </div>
        </div>

      </div>

      {/* EMERGENCY RESPONSE INCIDENT MODAL / PANEL */}
      {emergencyState.active && (
        <div className="mb-8 bg-red-950 border-2 border-red-500 p-6 rounded-3xl shadow-2xl animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ShieldAlert className="w-10 h-10 text-red-400" />
              <div>
                <h3 className="text-xl font-extrabold text-white">🚨 SOS EMERGENCY INCIDENT IN PROGRESS</h3>
                <p className="text-xs font-mono text-red-200 mt-0.5">
                  Vehicle {emergencyState.vehicleId} | GPS: {emergencyState.latitude}, {emergencyState.longitude} | Nearby Alerted: {emergencyState.nearbyAlertedCount} Vehicles
                </p>
              </div>
            </div>

            <button
              onClick={resolveEmergency}
              className="bg-white hover:bg-slate-200 text-red-600 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-lg"
            >
              Resolve & Dismiss SOS Alert
            </button>
          </div>
        </div>
      )}

      {/* ANALYTICS CHARTS & REASONING PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Visual Charts (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-6">
            HAZARD CATEGORIES & V2V DELIVERIES OVER TIME
          </h3>

          {/* Bar Chart Visualization */}
          <div className="space-y-4 mb-8 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Potholes & Road Cracks</span>
                <span className="text-cyan-400 font-bold">1,842 (38%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Unannounced Construction</span>
                <span className="text-amber-400 font-bold">1,210 (25%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Stray Animals & Debris</span>
                <span className="text-purple-400 font-bold">940 (19%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '19%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Vehicle Breakdowns & Accidents</span>
                <span className="text-red-400 font-bold">900 (18%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">PEAK BROADCAST RATE</span>
              <span className="text-white font-extrabold text-base">420 Msgs / Sec</span>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">COLLABORATIVE ACCURACY</span>
              <span className="text-emerald-400 font-extrabold text-base">98.4% Precision</span>
            </div>
          </div>
        </div>

        {/* SECTION 27: AI EXPLAINABILITY PANEL (4 COLS) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> WHY DID AI GENERATE THIS ALERT?
            </h3>
          </div>

          <div className="bg-slate-900 border border-purple-500/40 p-4 rounded-2xl text-xs font-mono">
            <p className="font-bold text-white mb-3 text-sm">POTHOLE WARNING REASONING LOGIC:</p>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Pothole detected via neural vision</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Directly in primary driving lane</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Estimated distance ~40 meters ahead</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>High depth severity rating</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Multiple nearby vehicle confirmations</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 bg-purple-950/60 p-2.5 rounded-xl border border-purple-800 text-purple-200 text-center font-bold">
              THEREFORE: HIGH PRIORITY SAFETY ALERT
            </div>
          </div>

        </div>

      </div>

      {/* EXPLAINABILITY FULL MODAL */}
      {showExplainabilityModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/50 p-6 rounded-3xl max-w-lg w-full text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-white text-base">AI EXPLAINABILITY TRANSPARENCY</h3>
              <button onClick={() => setShowExplainabilityModal(false)} className="text-slate-400 hover:text-white font-mono text-sm">✕</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All safety alerts issued by Rear Car Communicator include full explainability metadata detailing every decision factor (neural confidence %, lane trajectory fit, focal distance, and peer verification count).
            </p>
            <button
              onClick={() => setShowExplainabilityModal(false)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Close Explainability Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
