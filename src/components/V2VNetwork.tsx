import React from 'react';
import { useApp } from '../context/AppContext';
import { Radio, Wifi, ShieldAlert, CheckCircle2, Car, Activity, Zap, WifiOff, HardDrive } from 'lucide-react';

export const V2VNetwork: React.FC = () => {
  const { communicationLog, hazards, espNowPackets, offlineMeshMode, setOfflineMeshMode } = useApp();

  const confirmedPothole = hazards.find(h => h.status === 'CONFIRMED') || hazards[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              V2V ESP-NOW MESH NETWORK PACKET INSPECTOR
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Peer-to-Peer ESP-NOW Radio Mesh Protocol (2.4GHz Wi-Fi MAC layer) & Offline Resilience Mode
          </p>
        </div>

        {/* Offline Mesh Resilience Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOfflineMeshMode(!offlineMeshMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
              offlineMeshMode
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {offlineMeshMode ? <WifiOff className="w-4 h-4 text-emerald-400" /> : <Wifi className="w-4 h-4" />}
            <span>{offlineMeshMode ? '🟢 OFFLINE RESILIENCE MODE: ESP-NOW RADIO ACTIVE' : 'CELLULAR FALLBACK MODE'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 15: V2V COMMUNICATION ANIMATED TRANSMISSION PATH */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800 mb-8 relative overflow-hidden shadow-2xl">
        <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-6 flex items-center justify-between">
          <span>TRANSMITTER ➔ RECEIVER ESP-NOW RADIO PATH SIMULATION</span>
          <span className="text-emerald-400 text-[11px]">RSSI: -64 dBm | PROTOCOL: ESP-NOW (MAC-DIRECT)</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          
          {/* VEHICLE A (TRANSMITTER) */}
          <div className="lg:col-span-4 bg-slate-900 border-2 border-cyan-500/50 p-6 rounded-2xl shadow-xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="font-extrabold text-white text-sm flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <span>🚗 VEHICLE A (NODE RCC-001)</span>
              </span>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                ESP32 MAC: 24:0AC4:00:01:0A
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3 font-mono">ESP-NOW Packet Payload:</p>
            
            <div className="led-matrix-display p-4 rounded-xl text-center mb-4">
              <span className="led-text-glow text-lg font-bold text-cyan-400">
                PASS FROM LEFT →
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 bg-cyan-950/60 p-2 rounded-lg border border-cyan-800">
              <span>RADIO BROADCAST:</span>
              <span className="font-bold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" /> ESP-NOW 2.4GHz
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
            <span className="text-[10px] font-mono text-emerald-400 mt-2 font-bold">
              📡 SUB-MILLISECOND NO-INTERNET RADIO MESH
            </span>
          </div>

          {/* VEHICLE B (RECEIVER) */}
          <div className="lg:col-span-4 bg-slate-900 border-2 border-emerald-500/50 p-6 rounded-2xl shadow-xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="font-extrabold text-white text-sm flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-400" />
                <span>🚗 VEHICLE B (NODE RCC-042)</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                ESP32 MAC: 24:0AC4:00:04:2B
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3 font-mono">Receiver Cabin Alert:</p>

            <div className="bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 p-4 rounded-xl text-center mb-4 text-sm font-bold font-mono shadow-inner">
              RECEIVED: PASS FROM LEFT →
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
              <span>RADIO ACK:</span>
              <span className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> RSSI: -64 dBm ACK
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ESP-NOW LIVE PACKET LOG INSPECTOR & COLLABORATIVE MESH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* ESP-NOW LIVE PACKET LOG INSPECTOR (7 COLS) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>ESP-NOW RADIO PACKET INSPECTOR</span>
            </h3>
            <span className="text-[10px] font-mono bg-cyan-950/60 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded font-bold">
              MAC LAYER DIRECT
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs max-h-[380px] overflow-y-auto pr-1">
            {espNowPackets.map((pkt) => (
              <div key={pkt.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-[11px] mb-2 border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-cyan-400">Node: {pkt.senderNode} ➔ {pkt.targetNode}</span>
                  <span className="text-slate-500">{pkt.timestamp}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 mb-2">
                  <div>Protocol: <span className="text-emerald-400 font-bold">{pkt.protocol}</span></div>
                  <div>RSSI: <span className="text-cyan-300 font-bold">{pkt.rssi} dBm</span></div>
                  <div>Payload: <span className="text-white font-bold">{pkt.payloadBytes} bytes</span></div>
                </div>

                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] text-cyan-300 font-bold">
                  PAYLOAD: "{pkt.messagePayload}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLLABORATIVE HAZARD VERIFICATION MESH (5 COLS) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>COLLABORATIVE HAZARD MESH</span>
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              STATUS: CONFIRMED
            </span>
          </div>

          <div className="bg-red-950/40 border border-red-500/50 p-5 rounded-2xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-white text-base">
                🕳️ {confirmedPothole.title}
              </span>
              <span className="text-xs font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded">
                8 VEHICLE CORROBORATIONS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs mt-3">
              <div className="bg-black/60 p-2 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">AI CONFIDENCE</span>
                <span className="font-bold text-emerald-400">94%</span>
              </div>
              <div className="bg-black/60 p-2 rounded-xl border border-red-500/30">
                <span className="text-[10px] text-slate-400 block">EST. DISTANCE</span>
                <span className="font-bold text-cyan-400">~38 m</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <p className="text-slate-400 text-[10px] uppercase">Radio Mesh Node Feed:</p>
            {['Node RCC-001 (Pothole payload broadcast)', 'Node RCC-042 (ESP-NOW packet received)', 'Node RCC-089 (Peer verification ACK)'].map((rep, idx) => (
              <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300 text-[11px]">
                <span>📡 {rep}</span>
                <span className="text-[10px] text-emerald-400 font-bold">RSSI: -64dBm</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
