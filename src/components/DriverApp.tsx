import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { voiceService, IntentResult } from '../services/voiceService';
import { 
  Car, 
  ShieldCheck, 
  ShieldAlert, 
  Gauge, 
  Wifi, 
  Eye, 
  Radio, 
  MapPin, 
  Mic, 
  Volume2, 
  AlertTriangle,
  RadioTower,
  Cpu,
  Navigation,
  Send
} from 'lucide-react';

export const DriverApp: React.FC = () => {
  const { 
    vehicle, 
    hazards, 
    setActiveTab, 
    setRearDisplayMessage, 
    reportHazard, 
    triggerEmergency,
    riskAssessment 
  } = useApp();

  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [voiceResult, setVoiceResult] = useState<IntentResult | null>(null);
  const [customTextCommand, setCustomTextCommand] = useState<string>('');

  const handleVoiceCommand = async () => {
    setIsVoiceListening(true);
    const result = await voiceService.listen();
    setIsVoiceListening(false);
    setVoiceResult(result);

    if (result.recommendedDisplayMessage) {
      setRearDisplayMessage(result.recommendedDisplayMessage);
    }
  };

  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTextCommand.trim()) return;
    const result = voiceService.parseIntent(customTextCommand);
    setVoiceResult(result);
    setRearDisplayMessage(result.recommendedDisplayMessage);
    setCustomTextCommand('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Driver Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <h2 className="text-2xl font-display font-extrabold text-white">
              DRIVER DASHBOARD & CONTROL CENTER
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            VEHICLE ID: {vehicle.id} | TELEMETRY MODE: ACTIVE GPS & AI MESH
          </p>
        </div>

        <button
          onClick={() => setActiveTab('driving-mode')}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <Navigation className="w-4 h-4 fill-current" />
          <span>Launch Distraction-Free Driving Mode</span>
        </button>
      </div>

      {/* ROAD STATUS TELEMETRY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        
        {/* Road Status */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">ROAD STATUS</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-lg font-bold text-emerald-400 font-display">🟢 SAFE</span>
          </div>
        </div>

        {/* Speedometer */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">SPEED</p>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <span className="text-xl font-extrabold text-white font-mono">{vehicle.speed}</span>
            <span className="text-xs text-slate-400 font-mono">km/h</span>
          </div>
        </div>

        {/* Road Risk */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">ROAD RISK</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-amber-400 font-display">
              {riskAssessment.level === 'LOW' ? '🟢 LOW' : riskAssessment.level === 'HIGH' ? '🔴 HIGH' : '🟡 MODERATE'}
            </span>
          </div>
        </div>

        {/* Nearby Vehicles */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">NEARBY VEHICLES</p>
          <div className="flex items-center gap-2">
            <RadioTower className="w-5 h-5 text-blue-400" />
            <span className="text-xl font-extrabold text-white font-mono">7</span>
          </div>
        </div>

        {/* Nearby Hazards */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">NEARBY HAZARDS</p>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-xl font-extrabold text-red-400 font-mono">{hazards.length}</span>
          </div>
        </div>

        {/* AI & V2V Status */}
        <div className="glass-panel p-4 rounded-xl border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase mb-1">SYSTEMS</p>
          <div className="text-[11px] font-mono space-y-0.5">
            <p className="text-emerald-400">AI: 🟢 ACTIVE</p>
            <p className="text-emerald-400">V2V: 🟢 ONLINE</p>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS LARGE BUTTONS GRID (Section 6) */}
      <div className="mb-10">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
          QUICK DRIVER ACTIONS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* AI Scan Button */}
          <button
            onClick={() => setActiveTab('vision')}
            className="glass-panel p-6 rounded-2xl border-cyan-500/30 hover:border-cyan-500 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group bg-gradient-to-b from-cyan-950/40 to-slate-900"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">📷 AI SCAN</span>
            <span className="text-[10px] text-slate-400 font-mono">Camera Hazard Radar</span>
          </button>

          {/* Communicate Button */}
          <button
            onClick={() => setActiveTab('hardware')}
            className="glass-panel p-6 rounded-2xl border-blue-500/30 hover:border-blue-500 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group bg-gradient-to-b from-blue-950/40 to-slate-900"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Radio className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">📡 COMMUNICATE</span>
            <span className="text-[10px] text-slate-400 font-mono">Rear Display Signal</span>
          </button>

          {/* Report Hazard Button */}
          <button
            onClick={() => reportHazard({ type: 'pothole', title: 'Deep Pothole', distanceApproxMeters: 40 })}
            className="glass-panel p-6 rounded-2xl border-amber-500/30 hover:border-amber-500 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group bg-gradient-to-b from-amber-950/40 to-slate-900"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">⚠️ REPORT HAZARD</span>
            <span className="text-[10px] text-slate-400 font-mono">Instant Pothole Broadcast</span>
          </button>

          {/* Live Map Button */}
          <button
            onClick={() => setActiveTab('map')}
            className="glass-panel p-6 rounded-2xl border-purple-500/30 hover:border-purple-500 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group bg-gradient-to-b from-purple-950/40 to-slate-900"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">🗺️ LIVE MAP</span>
            <span className="text-[10px] text-slate-400 font-mono">Smart Road Traffic</span>
          </button>

          {/* SOS Button */}
          <button
            onClick={triggerEmergency}
            className="glass-panel-danger p-6 rounded-2xl border-red-500 hover:border-red-400 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 group col-span-2 sm:col-span-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">🚨 SOS EMERGENCY</span>
            <span className="text-[10px] text-red-300 font-mono">Broadcast Emergency HELP</span>
          </button>

        </div>
      </div>

      {/* HANDS-FREE VOICE INTENT PARSER & AI ASSISTANT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Voice Control Interface */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Mic className="w-5 h-5 text-cyan-400" />
              <span>HANDS-FREE VOICE INTENT CLASSIFIER</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2.5 py-0.5 rounded">
              NLP PARSER ACTIVE
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-6">
            Speak natural commands to update rear hardware display and broadcast V2V intent without taking hands off steering wheel.
          </p>

          <div className="flex flex-col items-center justify-center py-6 border border-dashed border-slate-800 rounded-2xl mb-6 bg-slate-950/40">
            <button
              onClick={handleVoiceCommand}
              disabled={isVoiceListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${
                isVoiceListening 
                  ? 'bg-red-500 animate-ping' 
                  : 'bg-gradient-to-tr from-cyan-500 to-blue-600 hover:scale-110 shadow-cyan-500/30'
              }`}
            >
              <Mic className="w-9 h-9" />
            </button>
            <p className="text-xs font-mono font-bold mt-4 text-slate-300">
              {isVoiceListening ? '🎙️ Listening... Speak now!' : 'Click to Speak Voice Command'}
            </p>
          </div>

          {/* Quick Preset Voice Command Chips (English & Hindi) */}
          <div className="space-y-2 mb-6">
            <p className="text-[11px] font-mono text-slate-400 uppercase">Try Voice Phrases (English & हिन्दी):</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                "I want to overtake from the left",
                "बायें से ओवरटेक करना है",
                "गड्ढा है - सावधान",
                "There is an obstacle ahead",
                "मदद चाहिए (Need Help)",
                "I am stopping"
              ].map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const res = voiceService.parseIntent(phrase);
                    setVoiceResult(res);
                    setRearDisplayMessage(res.recommendedDisplayMessage);
                  }}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all"
                >
                  "{phrase}"
                </button>
              ))}
            </div>
          </div>

          {/* Manual Command Input */}
          <form onSubmit={handleCustomTextSubmit} className="flex gap-2">
            <input
              type="text"
              value={customTextCommand}
              onChange={(e) => setCustomTextCommand(e.target.value)}
              placeholder="Or type intent e.g. 'Overtake from right'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Parse</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Voice Classification Output Card */}
          {voiceResult && (
            <div className="mt-4 bg-cyan-950/40 border border-cyan-500/40 p-4 rounded-xl animate-in fade-in">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  CLASSIFIED INTENT: {voiceResult.intent}
                </span>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                  TRANSMITTED
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-2">"{voiceResult.rawText}"</p>
              <div className="bg-black/60 border border-cyan-800 text-cyan-400 p-2 rounded text-xs font-mono font-bold text-center">
                REAR DISPLAY ➔ {voiceResult.recommendedDisplayMessage}
              </div>
            </div>
          )}

        </div>

        {/* Current Active Hardware & V2V Status Summary Card */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>CONNECTED HARDWARE & REAR DISPLAY</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                RCC-001 ACTIVE
              </span>
            </div>

            {/* Virtual Rear LED Screen Preview Box */}
            <div className="my-4">
              <p className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                LIVE REAR LED DISPLAY PREVIEW:
              </p>
              <div className="led-matrix-display p-6 rounded-2xl text-center border-4 border-slate-800">
                <span className="led-text-glow text-xl sm:text-2xl font-black text-cyan-400 tracking-wider">
                  {vehicle.currentMessage}
                </span>
              </div>
            </div>

            {/* Diagnostics Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono mt-6">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">HARDWARE PORT</span>
                <span className="text-emerald-400 font-bold">🟢 USB SERIAL / DEMO</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">BATTERY TELEMETRY</span>
                <span className="text-white font-bold">{vehicle.battery}% OPTIMAL</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">V2V MESH STATUS</span>
                <span className="text-emerald-400 font-bold">🟢 7 VEHICLES CONNECTED</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">GPS COORDINATES</span>
                <span className="text-cyan-400 font-bold">37.7749, -122.4194</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setActiveTab('hardware')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Manage Hardware Controls & Physical Buttons</span>
              <span>➔</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
