import React from 'react';
import { useApp } from '../context/AppContext';
import { Radio, Wifi, ShieldAlert, CheckCircle2, Car, Activity, Zap, RefreshCw } from 'lucide-react';

export const V2VNetwork: React.FC = () => {
  const { communicationLog, hazards, setRearDisplayMessage } = useApp();

  const confirmedPothole = hazards.find(h => h.status === 'CONFIRMED') || hazards[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              VEHICLE-TO-VEHICLE (V2V) SAFETY MESH
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-Time Peer-to-Peer Signal Broadcasts & Collaborative Hazard Mesh Network
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-bold">V2V RADIO FREQUENCY: 5.9 GHz DSRC / C-V2X</span>
        </div>
      </div>

      {/* SECTION 15: V2V COMMUNICATION ANIMATED TRANSMISSION PATH */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800 mb-8 relative overflow-hidden">
        <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-6">
          TRANSMITTER ➔ RECEIVER V2V PATH SIMULATION
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          
          {/* VEHICLE A (TRANSMITTER) */}
          <div className="lg:col-span-4 bg-slate-900 border-2 border-cyan-500/50 p-6 rounded-2xl shadow-xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="font-extrabold text-white text-sm flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <span>🚗 VEHICLE A (TRANSMITTER)</span>
              </span>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                RCC-001
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">Broadcast Message payload:</p>
            
            <div className="led-matrix-display p-4 rounded-xl text-center mb-4">
              <span className="led-text-glow text-lg font-bold text-cyan-400">
                PASS FROM LEFT →
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 bg-cyan-950/60 p-2 rounded-lg border border-cyan-800">
              <span>STATUS:</span>
              <span className="font-bold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> TRANSMITTING
              </span>
            </div>
          </div>

          {/* ANIMATED WAVE TRANSMISSION BRIDGE */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-4">
            <div className="w-full flex items-center justify-between px-4 text-cyan-400">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 mx-2 relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-cyan-400 animate-marquee" />
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 font-bold">
              📡 SUB-MILLISECOND V2V BROADCAST
            </span>
          </div>

          {/* VEHICLE B (RECEIVER) */}
          <div className="lg:col-span-4 bg-slate-900 border-2 border-emerald-500/50 p-6 rounded-2xl shadow-xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="font-extrabold text-white text-sm flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-400" />
                <span>🚗 VEHICLE B (FOLLOWER)</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                RCC-002
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">Dashboard Display Alert:</p>

            <div className="bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 p-4 rounded-xl text-center mb-4 text-sm font-bold font-mono shadow-inner">
              MESSAGE RECEIVED: PASS FROM LEFT →
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
              <span>STATUS:</span>
              <span className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ACKNOWLEDGED
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 17: COLLABORATIVE HAZARD VERIFICATION MESH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>COLLABORATIVE HAZARD VERIFICATION ENGINE</span>
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              STATUS: CONFIRMED
            </span>
          </div>

          <div className="bg-red-950/40 border border-red-500/50 p-5 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-white text-base">
                🕳️ {confirmedPothole.title}
              </span>
              <span className="text-xs font-mono font-bold bg-red-600 text-white px-2.5 py-0.5 rounded">
                HAZARD CONFIRMED
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              AI aggregated 8 independent vehicle reports at this exact GPS location within the past 5 minutes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="bg-black/60 p-2.5 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">REPORTS</span>
                <span className="font-bold text-white text-sm">8 Vehicles</span>
              </div>
              <div className="bg-black/60 p-2.5 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">AI CONFIDENCE</span>
                <span className="font-bold text-emerald-400 text-sm">94%</span>
              </div>
              <div className="bg-black/60 p-2.5 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">EST. DISTANCE</span>
                <span className="font-bold text-cyan-400 text-sm">~40 m</span>
              </div>
              <div className="bg-black/60 p-2.5 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">SEVERITY</span>
                <span className="font-bold text-red-400 text-sm">HIGH</span>
              </div>
            </div>
          </div>

          {/* Multi-vehicle report list */}
          <div className="space-y-2 text-xs font-mono">
            <p className="text-slate-400 text-[11px] uppercase">Vehicle Reporting Feed:</p>
            {['Vehicle RCC-001 (Pothole detected)', 'Vehicle RCC-004 (Pothole detected)', 'Vehicle RCC-007 (Pothole detected)'].map((rep, idx) => (
              <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
                <span>🚗 {rep}</span>
                <span className="text-[10px] text-slate-500">Verified</span>
              </div>
            ))}
          </div>

        </div>

        {/* V2V BROADCAST LOG STREAM */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            REAL-TIME V2V TRANSMISSION STREAM LOG ({communicationLog.length})
          </h3>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 font-mono text-xs">
            {communicationLog.map((log) => (
              <div key={log.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-cyan-400">{log.senderVehicleName}</span>
                  <span className="text-slate-500">{log.timestamp}</span>
                </div>
                <div className="bg-black/80 text-white p-2 rounded border border-slate-800 text-[11px] font-bold">
                  {log.displayMessage}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                  <span>Priority: {log.priority}</span>
                  <span className="text-emerald-400 font-bold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
