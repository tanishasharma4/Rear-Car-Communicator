import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Send, Sparkles, Sliders, Zap, CheckCircle2 } from 'lucide-react';

export const CustomLEDDesigner: React.FC = () => {
  const { setRearDisplayMessage, vehicle } = useApp();

  const [customText, setCustomText] = useState<string>('PASS FROM LEFT →');
  const [ledColor, setLedColor] = useState<string>('cyan');
  const [scrollSpeed, setScrollSpeed] = useState<number>(5);
  const [isTransmitted, setIsTransmitted] = useState<boolean>(false);

  const handleTransmitCustomText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setRearDisplayMessage(customText.toUpperCase());
    setIsTransmitted(true);
    setTimeout(() => setIsTransmitted(false), 3000);
  };

  const presetMessages = [
    'PASS FROM LEFT →',
    '← PASS FROM RIGHT',
    'WAIT',
    '🚨 EMERGENCY — HELP',
    '⚠️ POTHOLE AHEAD',
    '🛑 VEHICLE STOPPING',
    '🚧 OBSTACLE AHEAD',
    '🚑 AMBULANCE — YIELD RIGHT',
    '🌫️ DENSE FOG ALERT',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              CUSTOM REAR MATRIX LED DESIGNER
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            P5 RGB 64x32 LED Matrix Buffer & Real-Time Driver Message Designer
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-xl">
          P5 RGB 64x32 MATRIX BUFFER ACTIVE
        </span>
      </div>

      {/* MATRIX PREVIEW & CUSTOM DESIGNER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* MATRIX DISPLAY CANVAS PREVIEW (8 COLS) */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border-slate-800 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> LIVE P5 RGB 64x32 DOT MATRIX CANVAS
              </span>
              <span className="text-[11px] font-mono bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-500/30">
                ACTIVE RENDER BUFFER
              </span>
            </div>

            {/* LED Matrix Screen Preview */}
            <div className="led-matrix-display p-10 rounded-2xl text-center min-h-[220px] flex items-center justify-center border-4 border-slate-800 my-4 shadow-inner">
              <span 
                className="led-text-glow text-3xl sm:text-5xl font-black tracking-widest animate-pulse"
                style={{
                  color: ledColor === 'amber' ? '#F59E0B' : ledColor === 'red' ? '#EF4444' : ledColor === 'green' ? '#10B981' : '#00F0FF'
                }}
              >
                {customText.toUpperCase() || 'TYPE YOUR MESSAGE'}
              </span>
            </div>

            {isTransmitted && (
              <div className="bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 p-3 rounded-xl text-center text-xs font-mono font-bold animate-in fade-in">
                ✓ Message transmitted to ESP32 micro-controller and broadcast over V2V mesh!
              </div>
            )}
          </div>

          {/* Form Input Controls */}
          <form onSubmit={handleTransmitCustomText} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                CUSTOM REAR DISPLAY MESSAGE INPUT:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type custom warning message e.g. 'OVERTAKING LEFT'..."
                  maxLength={30}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono font-bold"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Transmit</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* MATRIX STYLING & PRESETS (4 COLS) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            LED MATRIX CONTROLS & PRESETS
          </h3>

          {/* Color Selectors */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
              LED PALETTE COLOR:
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLedColor('cyan')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  ledColor === 'cyan' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Cyan
              </button>
              <button
                type="button"
                onClick={() => setLedColor('amber')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  ledColor === 'amber' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Amber
              </button>
              <button
                type="button"
                onClick={() => setLedColor('red')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  ledColor === 'red' ? 'bg-red-500/20 border-red-400 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Red
              </button>
              <button
                type="button"
                onClick={() => setLedColor('green')}
                className={`py-2 rounded-xl font-bold border transition-all ${
                  ledColor === 'green' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Green
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
              QUICK PRESET MESSAGES:
            </label>
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 text-xs font-mono">
              {presetMessages.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCustomText(preset);
                    setRearDisplayMessage(preset);
                  }}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl transition-all"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
