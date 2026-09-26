import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  Wifi, 
  Radio, 
  Battery, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  HardDrive,
  Usb
} from 'lucide-react';

export const HardwareInterface: React.FC = () => {
  const { 
    vehicle, 
    setRearDisplayMessage, 
    simulateButtonPress, 
    connectHardwareSerial, 
    isHardwareConnected 
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              REAR CAR COMMUNICATOR HARDWARE INTERFACE
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Physical Prototype Controller & Virtual LED Matrix Rendering Unit
          </p>
        </div>

        {/* Real Hardware USB Connect Button */}
        <button
          onClick={connectHardwareSerial}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isHardwareConnected
              ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
              : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
          }`}
        >
          <Usb className="w-4 h-4" />
          <span>{isHardwareConnected ? '🟢 ARDUINO USB CONNECTED' : '🔌 CONNECT PHYSICAL HARDWARE (USB SERIAL)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* VIRTUAL REAR LED MATRIX DISPLAY CARD (8 COLS) */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> REAR DISPLAY MATRIX — LIVE PREVIEW
              </span>
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/30">
                MAX7219 8x32 ALPHANUMERIC LED
              </span>
            </div>

            {/* Glowing Pixel Matrix Board */}
            <div className="led-matrix-display p-10 rounded-2xl text-center my-6 min-h-[200px] flex items-center justify-center">
              <span className="led-text-glow text-3xl sm:text-5xl font-black text-cyan-400 tracking-widest animate-pulse">
                {vehicle.currentMessage}
              </span>
            </div>
          </div>

          {/* Physical Button Action Simulator */}
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              PHYSICAL HARDWARE PUSH BUTTONS SIMULATOR:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <button
                onClick={() => simulateButtonPress('PASS_LEFT')}
                className="bg-slate-900 border-2 border-cyan-500/50 hover:border-cyan-400 p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 group"
              >
                <span className="block text-xs font-extrabold text-cyan-400 group-hover:text-white">
                  PASS FROM LEFT
                </span>
                <span className="text-[10px] font-mono text-slate-500">BTN 1 (PIN 2)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('PASS_RIGHT')}
                className="bg-slate-900 border-2 border-cyan-500/50 hover:border-cyan-400 p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 group"
              >
                <span className="block text-xs font-extrabold text-cyan-400 group-hover:text-white">
                  PASS FROM RIGHT
                </span>
                <span className="text-[10px] font-mono text-slate-500">BTN 2 (PIN 3)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('WAIT')}
                className="bg-slate-900 border-2 border-amber-500/50 hover:border-amber-400 p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 group"
              >
                <span className="block text-xs font-extrabold text-amber-400 group-hover:text-white">
                  WAIT
                </span>
                <span className="text-[10px] font-mono text-slate-500">BTN 3 (PIN 4)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('HELP')}
                className="bg-red-950/80 border-2 border-red-500 hover:border-red-400 p-4 rounded-xl text-center transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-red-500/20"
              >
                <span className="block text-xs font-extrabold text-red-400 group-hover:text-white">
                  HELP / SOS
                </span>
                <span className="text-[10px] font-mono text-red-300/60">BTN 4 (PIN 5)</span>
              </button>

            </div>
          </div>

        </div>

        {/* HARDWARE DIAGNOSTICS & TELEMETRY (4 COLS - SECTION 9) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            CONNECTED VEHICLE DIAGNOSTICS
          </h3>

          <div className="space-y-3 font-mono text-xs">
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Vehicle ID</span>
              <span className="font-bold text-white">{vehicle.id}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Hardware</span>
              <span className="font-bold text-emerald-400">🟢 Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Rear Display</span>
              <span className="font-bold text-emerald-400">🟢 Online</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">GPS Subsystem</span>
              <span className="font-bold text-emerald-400">🟢 Available</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Communication</span>
              <span className="font-bold text-emerald-400">🟢 Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">AI Engine</span>
              <span className="font-bold text-emerald-400">🟢 Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Battery Level</span>
              <span className="font-bold text-cyan-400">{vehicle.battery}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block mb-1">Current Message</span>
              <span className="font-bold text-cyan-300">{vehicle.currentMessage}</span>
            </div>

          </div>
        </div>

      </div>

      {/* HARDWARE DEMO FLOW PIPELINE DIAGRAM (SECTION 10) */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800">
        <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-4">
          HARDWARE DEMO MODE ARCHITECTURE PIPELINE
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
          
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <span className="text-xl mb-1 block">🔘</span>
            <span className="font-bold text-white block">Driver Input</span>
            <span className="text-[10px] text-slate-400">Push Buttons / Voice</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <span className="text-xl mb-1 block">⚙️</span>
            <span className="font-bold block">Communication Engine</span>
            <span className="text-[10px] text-slate-400">Serial JSON / Microcontroller</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 text-purple-400">
            <span className="text-xl mb-1 block">📺</span>
            <span className="font-bold block">Rear Display</span>
            <span className="text-[10px] text-slate-400">MAX7219 LED Matrix</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 text-emerald-400">
            <span className="text-xl mb-1 block">🚗</span>
            <span className="font-bold block">Nearby Vehicle</span>
            <span className="text-[10px] text-slate-400">Dashboard Warning</span>
          </div>

        </div>
      </div>

    </div>
  );
};
