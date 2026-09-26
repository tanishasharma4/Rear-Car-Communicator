import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';
import { 
  Sparkles, 
  Siren, 
  Eye, 
  Vibrate, 
  Layers, 
  Gauge, 
  CloudRain, 
  ShieldCheck, 
  AlertTriangle,
  Play,
  CheckCircle2,
  Video,
  RadioTower,
  Volume2
} from 'lucide-react';

export const AdvancedFeatures: React.FC = () => {
  const { setRearDisplayMessage, speakEnabled } = useApp();

  const [drowsinessAlert, setDrowsinessAlert] = useState<boolean>(false);
  const [ambulanceActive, setAmbulanceActive] = useState<boolean>(false);
  const [hapticPulse, setHapticPulse] = useState<boolean>(false);
  const [arHudMode, setArHudMode] = useState<boolean>(true);
  const [blackboxRecording, setBlackboxRecording] = useState<boolean>(false);

  // Trigger Ambulance Yield Workflow
  const handleTriggerAmbulance = () => {
    setAmbulanceActive(true);
    setRearDisplayMessage('🚑 AMBULANCE — YIELD RIGHT');
    if (speakEnabled) {
      voiceService.speak(
        "Emergency vehicle detected behind. Rear screen signaling yield right.",
        "पीछे एम्बुलेंस आ रही है। रास्ता दाएं दें।"
      );
    }
    setTimeout(() => setAmbulanceActive(false), 8000);
  };

  // Trigger Drowsiness Fatigue Alert Workflow
  const handleTriggerDrowsiness = () => {
    setDrowsinessAlert(true);
    setRearDisplayMessage('😴 DROWSINESS ALERT');
    if (speakEnabled) {
      voiceService.speak(
        "Driver drowsiness detected. Please take a break immediately.",
        "सावधान! चालक को नींद आ रही है। कृपया ब्रेक लें।"
      );
    }
    setTimeout(() => setDrowsinessAlert(false), 8000);
  };

  // Trigger Haptic Vibration Pulse
  const handleTriggerHaptic = () => {
    setHapticPulse(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
    setTimeout(() => setHapticPulse(false), 3000);
  };

  // Trigger Black Box Cloud Recording
  const handleTriggerBlackbox = () => {
    setBlackboxRecording(true);
    setTimeout(() => setBlackboxRecording(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              ADVANCED NEXT-GEN SAFETY MODULES
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Ambulance Siren Detection, Drowsiness Monitor, AR Windshield HUD & Haptic Steering
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-xl">
          6 INNOVATIVE MODULES ACTIVE
        </span>
      </div>

      {/* FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* MODULE 1: AMBULANCE SIREN & CAMERA YIELD DETECTOR */}
        <div className={`glass-panel p-6 rounded-3xl border-slate-800 transition-all ${
          ambulanceActive ? 'border-red-500 bg-red-950/40 animate-pulse' : ''
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Siren className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded font-bold">
              SIREN + CAMERA AI
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            1. Emergency Ambulance Auto-Yield
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            AI analyzes rear camera flashing lights + siren audio frequency (700Hz–1.5kHz). Automatically signals rear traffic: <span className="font-bold text-red-400">"AMBULANCE — YIELD RIGHT"</span>.
          </p>

          <button
            onClick={handleTriggerAmbulance}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Simulate Ambulance Behind</span>
          </button>
        </div>

        {/* MODULE 2: DROWSINESS & EYE FATIGUE MONITOR */}
        <div className={`glass-panel p-6 rounded-3xl border-slate-800 transition-all ${
          drowsinessAlert ? 'border-amber-500 bg-amber-950/40 animate-pulse' : ''
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-bold">
              CABIN VISION AI
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            2. Driver Drowsiness & Fatigue Scan
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Scans blinking duration, yawning frequency, and head tilts via front camera. Triggers bilingual audio rest alerts: <span className="font-bold text-amber-400">"सावधान! ब्रेक लें"</span>.
          </p>

          <button
            onClick={handleTriggerDrowsiness}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Simulate Driver Drowsiness</span>
          </button>
        </div>

        {/* MODULE 3: STEERING WHEEL HAPTIC VIBRATION */}
        <div className={`glass-panel p-6 rounded-3xl border-slate-800 transition-all ${
          hapticPulse ? 'border-cyan-500 bg-cyan-950/40 ring-4 ring-cyan-500/50' : ''
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Vibrate className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded font-bold">
              HAPTIC FEEDBACK
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            3. Haptic Steering Vibration Pulse
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Sends physical vibration pulses through steering wheel motors whenever critical P0 warnings or sudden braking alerts are received from V2V traffic.
          </p>

          <button
            onClick={handleTriggerHaptic}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Vibrate className="w-4 h-4" />
            <span>{hapticPulse ? '📳 VIBRATING STEERING...' : 'Test Steering Vibration'}</span>
          </button>
        </div>

        {/* MODULE 4: WINDSHIELD AR HUD VISUALIZER */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded font-bold">
              AR WINDSHIELD HUD
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            4. Augmented Reality HUD Overlay
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Projects distance vectors (`~40m`), hazard bounding boxes, and lane trajectories directly onto the windshield line of sight.
          </p>

          <button
            onClick={() => setArHudMode(!arHudMode)}
            className="w-full bg-slate-900 border border-purple-500/50 hover:border-purple-400 text-purple-300 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>{arHudMode ? '🕶️ AR HUD Enabled (3D Overlay)' : 'Enable AR HUD Overlay'}</span>
          </button>
        </div>

        {/* MODULE 5: SMART TRAFFIC LIGHT GREEN WAVE (GLOSA) */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Gauge className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded font-bold">
              V2X GREEN WAVE
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            5. Traffic Light Speed Advisory (GLOSA)
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Syncs with smart city traffic lights to recommend exact driving speed to pass green lights without stopping.
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-center font-mono text-xs text-emerald-400 font-bold">
            RECOMMENDED: 42 KM/H FOR GREEN LIGHT WAVE
          </div>
        </div>

        {/* MODULE 6: PRE-CRASH BLACK BOX CLOUD RECORDING */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded font-bold">
              BLACK BOX CLOUD
            </span>
          </div>

          <h3 className="font-extrabold text-white text-base mb-1">
            6. Pre-Crash Black Box Telemetry
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Automatically archives a 10-second video snippet + telemetry sensor log to cloud storage during near-collision events.
          </p>

          <button
            onClick={handleTriggerBlackbox}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{blackboxRecording ? '⏺️ UPLOADING BLACK BOX LOG...' : 'Simulate Black Box Archive'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
