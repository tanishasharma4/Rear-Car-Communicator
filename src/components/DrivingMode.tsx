import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';
import { 
  ShieldAlert, 
  Mic, 
  ArrowLeft, 
  Radio, 
  Gauge, 
  AlertTriangle,
  Volume2
} from 'lucide-react';

export const DrivingMode: React.FC = () => {
  const { 
    vehicle, 
    riskAssessment, 
    setRearDisplayMessage, 
    triggerEmergency, 
    setActiveTab 
  } = useApp();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [activeVoicePrompt, setActiveVoicePrompt] = useState<string>('');

  const handleMicClick = async () => {
    setIsListening(true);
    const res = await voiceService.listen();
    setIsListening(false);
    setActiveVoicePrompt(res.rawText);
    if (res.recommendedDisplayMessage) {
      setRearDisplayMessage(res.recommendedDisplayMessage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black text-white p-4 sm:p-8 flex flex-col justify-between">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <button
          onClick={() => setActiveTab('driver')}
          className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Driving Mode</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-xs font-bold text-emerald-400">
            DISTRACTION-FREE DRIVING MODE
          </span>
        </div>
      </div>

      {/* Main High-Visibility Dashboard */}
      <div className="my-auto max-w-5xl mx-auto w-full py-6">
        
        {/* Speed & Risk Hero Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-center">
          
          {/* Speedometer */}
          <div className="bg-slate-950 border-2 border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
              CURRENT SPEED
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl sm:text-8xl font-black font-mono text-white tracking-tighter">
                {vehicle.speed}
              </span>
              <span className="text-xl font-bold text-slate-400 font-mono">KM/H</span>
            </div>
          </div>

          {/* Road Risk Indicator */}
          <div className={`border-2 p-8 rounded-3xl flex flex-col items-center justify-center ${
            riskAssessment.level === 'HIGH'
              ? 'bg-red-950/40 border-red-500 text-red-400'
              : riskAssessment.level === 'MODERATE'
              ? 'bg-amber-950/40 border-amber-500 text-amber-400'
              : 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
          }`}>
            <span className="text-xs font-mono uppercase tracking-widest mb-1 opacity-80">
              ROAD RISK RATING
            </span>
            <span className="text-5xl sm:text-6xl font-black font-display tracking-tight">
              {riskAssessment.level}
            </span>
            <p className="text-xs font-mono mt-2 opacity-90 max-w-xs">
              {riskAssessment.recommendation}
            </p>
          </div>

        </div>

        {/* Current Rear Display Active Message Banner */}
        <div className="bg-slate-950 border-2 border-cyan-500/50 p-6 rounded-3xl text-center mb-8 shadow-2xl shadow-cyan-500/10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
            CURRENT REAR COMMUNICATOR DISPLAY
          </span>
          <div className="led-text-glow text-3xl sm:text-5xl font-black text-cyan-400 tracking-wider">
            {vehicle.currentMessage}
          </div>
        </div>

        {/* Large Touch Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <button
            onClick={() => setRearDisplayMessage('PASS FROM LEFT →')}
            className="bg-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 py-6 px-4 rounded-2xl text-center transition-all active:scale-95"
          >
            <span className="block font-black text-lg sm:text-xl text-cyan-400">PASS LEFT</span>
            <span className="text-[10px] font-mono text-slate-400">SIGNAL OVERTAKE</span>
          </button>

          <button
            onClick={() => setRearDisplayMessage('← PASS FROM RIGHT')}
            className="bg-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 py-6 px-4 rounded-2xl text-center transition-all active:scale-95"
          >
            <span className="block font-black text-lg sm:text-xl text-cyan-400">PASS RIGHT</span>
            <span className="text-[10px] font-mono text-slate-400">SIGNAL OVERTAKE</span>
          </button>

          <button
            onClick={() => setRearDisplayMessage('WAIT')}
            className="bg-slate-900 border-2 border-amber-500/40 hover:border-amber-400 py-6 px-4 rounded-2xl text-center transition-all active:scale-95"
          >
            <span className="block font-black text-lg sm:text-xl text-amber-400">WAIT</span>
            <span className="text-[10px] font-mono text-slate-400">HOLD POSITION</span>
          </button>

          <button
            onClick={triggerEmergency}
            className="bg-red-600 border-2 border-red-400 py-6 px-4 rounded-2xl text-center transition-all active:scale-95 shadow-xl shadow-red-600/40 animate-pulse"
          >
            <span className="block font-black text-lg sm:text-xl text-white">🚨 HELP / SOS</span>
            <span className="text-[10px] font-mono text-white/80">EMERGENCY BROADCAST</span>
          </button>

        </div>

      </div>

      {/* Bottom Hands-Free Voice Launcher */}
      <div className="max-w-2xl mx-auto w-full pt-4 border-t border-slate-900 text-center">
        <button
          onClick={handleMicClick}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-sm transition-all ${
            isListening
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-xl shadow-cyan-500/20'
          }`}
        >
          <Mic className="w-6 h-6" />
          <span>{isListening ? 'LISTENING... SPEAK YOUR INTENT NOW' : 'TAP FOR HANDS-FREE VOICE COMMAND'}</span>
        </button>
        {activeVoicePrompt && (
          <p className="text-xs font-mono text-cyan-400 mt-2">
            Last heard: "{activeVoicePrompt}"
          </p>
        )}
      </div>

    </div>
  );
};
