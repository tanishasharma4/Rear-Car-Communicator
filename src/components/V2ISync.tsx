import React from 'react';
import { useApp } from '../context/AppContext';
import { RadioTower, Gauge, Clock, ShieldCheck, Zap, Navigation } from 'lucide-react';

export const V2ISync: React.FC = () => {
  const { v2iTrafficLight, vehicle } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <RadioTower className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              V2I TRAFFIC LIGHT SYNCHRONIZER (GLOSA)
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Vehicle-to-Infrastructure Green Wave Speed Advisory & Intersection Telemetry
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold">V2I PROTOCOL: IEEE 1609.2 / 5.9 GHz C-V2X</span>
        </div>
      </div>

      {/* GLOSA HERO GREEN WAVE SPEED ADVISORY DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> GREEN WAVE SPEED ADVISORY (GLOSA)
              </span>
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                ACTIVE V2I SYNC
              </span>
            </div>

            <div className="text-center py-8">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">
                RECOMMENDED GREEN WAVE SPEED
              </span>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-7xl sm:text-9xl font-black font-mono text-emerald-400 tracking-tight animate-pulse">
                  {v2iTrafficLight.recommendedSpeedKmh}
                </span>
                <span className="text-2xl font-bold text-slate-400 font-mono">KM/H</span>
              </div>
              <p className="text-xs font-mono text-emerald-300 mt-4 max-w-md mx-auto">
                Maintain <span className="font-extrabold text-white">55 km/h</span> to pass {v2iTrafficLight.name} without stopping on red.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 font-mono text-xs text-center border-t border-slate-800/80 pt-6">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block mb-1">INTERSECTION</span>
              <span className="font-bold text-white text-xs">{v2iTrafficLight.intersectionId}</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block mb-1">DISTANCE</span>
              <span className="font-bold text-cyan-400 text-xs">{v2iTrafficLight.distanceMeters} meters</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block mb-1">SIGNAL PHASE</span>
              <span className="font-bold text-emerald-400 text-xs flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {v2iTrafficLight.currentPhase} ({v2iTrafficLight.timeRemainingSeconds}s)
              </span>
            </div>
          </div>

        </div>

        {/* V2I INTERSECTION STATUS & TELEMETRY (4 COLS) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
              V2I INTERSECTION TELEMETRY
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Intersection Name</span>
                <span className="font-bold text-white text-[11px] text-right">{v2iTrafficLight.name}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Current Vehicle Speed</span>
                <span className="font-bold text-cyan-400">{vehicle.speed} km/h</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">V2I RSSI Signal</span>
                <span className="font-bold text-emerald-400">-58 dBm (Strong)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">SPaT Data Protocol</span>
                <span className="font-bold text-purple-400">SAE J2735 Active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <p className="font-bold mb-1">🌱 Fuel Efficiency Impact:</p>
            <p className="text-[11px]">Green Wave speed synchronization reduces urban stop-and-go fuel consumption by up to 22%.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
