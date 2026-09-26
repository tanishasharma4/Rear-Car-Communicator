import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hazard } from '../types';
import { MapPin, ShieldAlert, AlertTriangle, CheckCircle2, Car, Radio, X } from 'lucide-react';

export const LiveSmartMap: React.FC = () => {
  const { hazards, vehicle, emergencyState } = useApp();
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(hazards[0] || null);

  // Map markers layout positions on mock road canvas grid
  const mockVehicles = [
    { id: 'RCC-001', name: 'Your Vehicle (RCC-001)', x: 45, y: 55, isUser: true },
    { id: 'RCC-002', name: 'Vehicle B (Follower)', x: 45, y: 75, isUser: false },
    { id: 'RCC-004', name: 'Vehicle C (Ahead)', x: 55, y: 35, isUser: false },
    { id: 'RCC-007', name: 'Vehicle D (Cross Traffic)', x: 25, y: 40, isUser: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              INTERACTIVE SMART ROAD SAFETY MAP
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-Time Vehicle Nodes, AI-Verified Road Hazards & SOS Emergencies
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>🚗 Vehicles (4)</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span>🕳️ Hazards ({hazards.length})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* INTERACTIVE MAP CANVAS VIEWPORT (8 COLS) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border-slate-800 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
          
          {/* Map Controls Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 z-10 relative">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
              LIVE TRAFFIC RADAR GRID (37.7749° N, 122.4194° W)
            </span>
            <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              SATELLITE MESH ACTIVE
            </span>
          </div>

          {/* Interactive Map Visual Surface */}
          <div className="relative w-full h-[400px] bg-[#050811] rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
            
            {/* Grid Line Overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} 
            />

            {/* Simulated Road Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Vertical Highway */}
              <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#ffffff" strokeWidth="3" />
              <line x1="55%" y1="0" x2="55%" y2="100%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 8" />
              
              {/* Horizontal Cross Street */}
              <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffffff" strokeWidth="3" />
            </svg>

            {/* VEHICLE MARKERS */}
            {mockVehicles.map((v) => (
              <div
                key={v.id}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${v.x}%`, top: `${v.y}%` }}
              >
                <div className={`p-2 rounded-full border-2 transition-all group-hover:scale-125 ${
                  v.isUser 
                    ? 'bg-cyan-500 border-white text-black font-bold shadow-lg shadow-cyan-500/50 animate-pulse' 
                    : 'bg-slate-900 border-cyan-400 text-cyan-400'
                }`}>
                  <Car className="w-4 h-4" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap border border-slate-800 pointer-events-none">
                  {v.name}
                </div>
              </div>
            ))}

            {/* HAZARD MARKERS (Section 18) */}
            {hazards.map((h, idx) => (
              <div
                key={h.id}
                onClick={() => setSelectedHazard(h)}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${48 + idx * 8}%`, top: `${40 - idx * 10}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-red-500/50 animate-bounce group-hover:scale-125 transition-transform">
                  {h.type === 'pothole' ? '🕳️' : h.type === 'accident' ? '💥' : '🚧'}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-red-950 text-red-200 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap border border-red-500 font-bold">
                  {h.title} (~{h.distanceApproxMeters}m)
                </div>
              </div>
            ))}

            {/* Emergency SOS Pulse Node if Active */}
            {emergencyState.active && (
              <div 
                className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: '45%', top: '55%' }}
              >
                <div className="w-16 h-16 rounded-full bg-red-600/40 border-2 border-red-500 animate-ping flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-white" />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* HAZARD DETAIL CARD MODAL (4 COLS - SECTION 18) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            SELECTED MAP HAZARD DETAILS
          </h3>

          {selectedHazard ? (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl animate-in fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕳️</span>
                  <div>
                    <h4 className="font-extrabold text-white text-base">{selectedHazard.title}</h4>
                    <p className="text-[11px] font-mono text-slate-400">ID: {selectedHazard.id}</p>
                  </div>
                </div>
                <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedHazard.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4">{selectedHazard.description}</p>

              <div className="space-y-2.5 font-mono text-xs">
                
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Severity</span>
                  <span className="font-bold text-red-400">{selectedHazard.severity}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">AI Confidence</span>
                  <span className="font-bold text-emerald-400">{selectedHazard.confidence}%</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Vehicle Reports</span>
                  <span className="font-bold text-cyan-400">{selectedHazard.confirmationsCount} vehicles</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">First Detected</span>
                  <span className="font-bold text-slate-300">{selectedHazard.timestamp}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Estimated Distance</span>
                  <span className="font-bold text-cyan-300">~{selectedHazard.distanceApproxMeters} meters</span>
                </div>

              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-8">
              Click any hazard marker on the map to inspect AI parameters.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};
