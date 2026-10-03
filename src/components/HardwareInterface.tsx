import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  Terminal, 
  Radio, 
  Battery, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  HardDrive,
  Usb,
  Activity
} from 'lucide-react';

export const HardwareInterface: React.FC = () => {
  const { 
    vehicle, 
    simulateButtonPress, 
    connectHardwareSerial, 
    isHardwareConnected,
    esp32Pins,
    serialLogs 
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              ESP32 HARDWARE & TELEMETRY MONITOR
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            ESP32 Microcontroller Board, P5 RGB 64x32 Rear LED Matrix & 115200 bps Serial Console
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
          <span>{isHardwareConnected ? '🟢 ESP32 USB CONNECTED (115200 BPS)' : '🔌 CONNECT ESP32 USB SERIAL'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* VIRTUAL P5 RGB 64x32 REAR LED MATRIX DISPLAY (8 COLS) */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border-slate-800 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> P5 RGB 64x32 REAR MATRIX LED — LIVE RENDERER
              </span>
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/30">
                P5 RGB 64x32 PANEL ONLINE
              </span>
            </div>

            {/* Glowing Pixel Matrix Board */}
            <div className="led-matrix-display p-10 rounded-2xl text-center my-6 min-h-[200px] flex items-center justify-center border-4 border-slate-800 shadow-inner">
              <span className="led-text-glow text-3xl sm:text-5xl font-black text-cyan-400 tracking-widest animate-pulse">
                {vehicle.currentMessage}
              </span>
            </div>
          </div>

          {/* ESP32 GPIO Interrupt Button Simulator */}
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>ESP32 GPIO INTERRUPT PUSH BUTTON SIMULATORS:</span>
              <span className="text-emerald-400 font-bold text-[10px]">115200 BPS ACTIVE</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              
              <button
                onClick={() => simulateButtonPress('PASS_LEFT')}
                className={`p-4 rounded-xl text-center border-2 transition-all hover:scale-105 active:scale-95 group ${
                  esp32Pins.gpio14_passLeft ? 'bg-cyan-500 text-black border-white ring-4 ring-cyan-500/40' : 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400'
                }`}
              >
                <span className={`block text-xs font-extrabold ${esp32Pins.gpio14_passLeft ? 'text-black' : 'text-cyan-400 group-hover:text-white'}`}>
                  PASS FROM LEFT
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">GPIO 14 (Pass Left)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('PASS_RIGHT')}
                className={`p-4 rounded-xl text-center border-2 transition-all hover:scale-105 active:scale-95 group ${
                  esp32Pins.gpio27_passRight ? 'bg-cyan-500 text-black border-white ring-4 ring-cyan-500/40' : 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400'
                }`}
              >
                <span className={`block text-xs font-extrabold ${esp32Pins.gpio27_passRight ? 'text-black' : 'text-cyan-400 group-hover:text-white'}`}>
                  PASS FROM RIGHT
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">GPIO 27 (Pass Right)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('WAIT')}
                className={`p-4 rounded-xl text-center border-2 transition-all hover:scale-105 active:scale-95 group ${
                  esp32Pins.gpio26_slowDown ? 'bg-amber-500 text-black border-white ring-4 ring-amber-500/40' : 'bg-slate-900 border-amber-500/50 hover:border-amber-400'
                }`}
              >
                <span className={`block text-xs font-extrabold ${esp32Pins.gpio26_slowDown ? 'text-black' : 'text-amber-400 group-hover:text-white'}`}>
                  SLOW DOWN / WAIT
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">GPIO 26 (Slow Down)</span>
              </button>

              <button
                onClick={() => simulateButtonPress('HELP')}
                className={`p-4 rounded-xl text-center border-2 transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-red-500/20 ${
                  esp32Pins.gpio32_emergencySOS ? 'bg-red-600 text-white border-white ring-4 ring-red-500/40' : 'bg-red-950/80 border-red-500 hover:border-red-400'
                }`}
              >
                <span className="block text-xs font-extrabold text-red-300 group-hover:text-white">
                  HELP / SOS
                </span>
                <span className="text-[10px] text-red-300/80 block mt-1">GPIO 32 (SOS Button)</span>
              </button>

            </div>
          </div>

        </div>

        {/* ESP32 DIAGNOSTICS & TELEMETRY PANEL (4 COLS) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
              ESP32 TELEMETRY DIAGNOSTICS
            </h3>

            <div className="space-y-3 font-mono text-xs">
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Microcontroller</span>
                <span className="font-bold text-cyan-400">ESP32 DevModule</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Serial Baud Rate</span>
                <span className="font-bold text-emerald-400">115200 bps</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">LED Matrix Hardware</span>
                <span className="font-bold text-emerald-400">P5 RGB 64x32 Panel</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">ESP-NOW Radio</span>
                <span className="font-bold text-emerald-400">2.4GHz Wi-Fi Mesh</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">GPS Subsystem</span>
                <span className="font-bold text-emerald-400">NEO-6M Active</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Vehicle Node ID</span>
                <span className="font-bold text-white">RCC-001</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block mb-1">Current Screen Output</span>
                <span className="font-bold text-cyan-300">{vehicle.currentMessage}</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* LIVE 115200 BPS SERIAL MONITOR CONSOLE TERMINAL */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4" /> LIVE ESP32 SERIAL MONITOR CONSOLE (115200 BPS)
          </h3>
          <span className="text-[10px] font-mono bg-cyan-950/60 border border-cyan-800 text-cyan-300 px-2.5 py-0.5 rounded font-bold">
            BAUD: 115200 BPS
          </span>
        </div>

        <div className="bg-black/90 border border-slate-800 rounded-2xl p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5 shadow-inner">
          {serialLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={`font-bold shrink-0 ${
                log.level === 'INTERRUPT' ? 'text-amber-400' : log.level === 'TX' ? 'text-cyan-400' : log.level === 'WARN' ? 'text-red-400' : 'text-emerald-400'
              }`}>
                [{log.level}]
              </span>
              <span className="text-slate-200">{log.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
