import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, ArrowRight, X, ShieldAlert, Cpu, Eye, Radio, MapPin } from 'lucide-react';

export const HackathonDemoModal: React.FC = () => {
  const { 
    isDemoRunning, 
    currentDemoStep, 
    demoFlowName, 
    startHackathonDemoFlow, 
    nextDemoStep, 
    stopDemoFlow 
  } = useApp();

  if (!isDemoRunning) return null;

  const flowTitles = {
    hazard: '1️⃣ HAZARD DETECTION & V2V BROADCAST FLOW',
    overtaking: '2️⃣ DRIVER INTENT & REAR DISPLAY OVERTAKING FLOW',
    emergency: '3️⃣ PHYSICAL BUTTON & SOS EMERGENCY WORKFLOW',
  };

  const hazardSteps = [
    { step: 1, title: 'Vehicle Driving', desc: 'Vehicle A (RCC-001) is cruising at 48 km/h on urban roadway.', active: 'Driver App' },
    { step: 2, title: 'AI Camera Scan', desc: 'Front-facing camera stream feeds OpenCV/YOLO neural network.', active: 'AI Road Scan' },
    { step: 3, title: 'Pothole Detection', desc: 'AI identifies deep pothole ahead with 94% neural confidence.', active: 'AI Vision Engine' },
    { step: 4, title: 'Depth & Lane Calculation', desc: 'Distance pipeline calculates ~40m distance directly in driving lane.', active: 'Risk Engine' },
    { step: 5, title: 'Risk Assessment', desc: 'Multi-factor risk engine evaluates speed + distance -> Output: 🔴 HIGH RISK.', active: 'Safety Alert' },
    { step: 6, title: 'Auto Warning Generated', desc: 'System generates "⚠️ POTHOLE AHEAD — ~40m" warning.', active: 'AI Assistant' },
    { step: 7, title: 'V2V Broadcast', desc: 'Vehicle A transmits hazard payload with GPS tags to nearby mesh.', active: 'V2V Network' },
    { step: 8, title: 'Vehicle B Receives Alert', desc: 'Vehicle B (Follower) receives alert in cabin display before visual sight.', active: 'V2V Receiver' },
    { step: 9, title: 'Live Smart Map Updated', desc: 'Hazard marker is pinned on interactive road map for all regional drivers.', active: 'Live Map' },
    { step: 10, title: 'Collaborative Confirmation', desc: 'AI verifies 8 vehicle reports -> Status changed to HAZARD CONFIRMED.', active: 'Traffic Control' },
  ];

  const overtakingSteps = [
    { step: 1, title: 'Driver Voice Input', desc: 'Driver speaks: "I want to overtake from the left."', active: 'Voice Assistant' },
    { step: 2, title: 'NLP Intent Parsing', desc: 'NLP Engine classifies intent -> OVERTAKE_LEFT (Confidence 96%).', active: 'AI Intent Engine' },
    { step: 3, title: 'Hardware LED Display', desc: 'Virtual & Physical Rear LED Matrix animates: PASS FROM LEFT →', active: 'Hardware LED' },
    { step: 4, title: 'V2V Transmission', desc: 'Radio signal broadcasts intent to follower vehicles behind.', active: 'V2V Radio' },
    { step: 5, title: 'Vehicle B Confirmation', desc: 'Rear vehicle acknowledges pass request safely.', active: 'V2V Network' },
  ];

  const emergencySteps = [
    { step: 1, title: 'Physical Button Pressed', desc: 'Driver presses physical hardware HELP push button on steering dashboard.', active: 'Hardware Unit' },
    { step: 2, title: 'Rear Display Emergency LED', desc: 'Rear display instantly overrides normal messages -> 🚨 EMERGENCY — HELP', active: 'Rear Display' },
    { step: 3, title: 'GPS Location Captured', desc: 'Current GPS telemetry (37.7749, -122.4194) is tagged.', active: 'GPS Subsystem' },
    { step: 4, title: 'Broadcast to 6 Nearby Vehicles', desc: 'Immediate high-priority P0 broadcast sent to all surrounding traffic.', active: 'V2V Mesh' },
    { step: 5, title: 'Traffic Control Center Alerted', desc: 'Emergency incident appears on Regional Traffic Command Dashboard.', active: 'Admin Center' },
  ];

  const currentSteps = demoFlowName === 'hazard' ? hazardSteps : demoFlowName === 'overtaking' ? overtakingSteps : emergencySteps;
  const currentInfo = currentSteps.find(s => s.step === currentDemoStep) || currentSteps[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-50 glass-panel-glow p-5 rounded-2xl border-cyan-500/50 shadow-2xl shadow-cyan-500/20 animate-in fade-in slide-in-from-bottom-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            SYSTEM DEMO RUNNER
          </span>
        </div>
        <button 
          onClick={stopDemoFlow}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Flow Switcher Buttons */}
      <div className="grid grid-cols-3 gap-1 mb-4 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-[11px]">
        <button
          onClick={() => startHackathonDemoFlow('hazard')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
            demoFlowName === 'hazard' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Hazard Flow
        </button>
        <button
          onClick={() => startHackathonDemoFlow('overtaking')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
            demoFlowName === 'overtaking' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Overtake
        </button>
        <button
          onClick={() => startHackathonDemoFlow('emergency')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
            demoFlowName === 'emergency' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Emergency
        </button>
      </div>

      {/* Title */}
      <div className="mb-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{flowTitles[demoFlowName]}</span>
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-400 mt-1 font-mono">
          <span>Step {currentDemoStep} of {currentSteps.length}</span>
          <span className="text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
            Target View: {currentInfo.active}
          </span>
        </div>
      </div>

      {/* Step Description Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl mb-4">
        <h5 className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          {currentInfo.title}
        </h5>
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentInfo.desc}
        </p>
      </div>

      {/* Step Indicator Progress Dots */}
      <div className="flex items-center justify-between gap-1 mb-4">
        {currentSteps.map((s) => (
          <div
            key={s.step}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              s.step === currentDemoStep
                ? 'bg-cyan-400 ring-2 ring-cyan-400/40'
                : s.step < currentDemoStep
                ? 'bg-emerald-500'
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={stopDemoFlow}
          className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
        >
          Exit Demo
        </button>

        <button
          onClick={nextDemoStep}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold px-4 py-2 rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all"
        >
          <span>{currentDemoStep === currentSteps.length ? 'Finish Flow' : 'Next Step'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
