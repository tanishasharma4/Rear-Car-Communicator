import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AIVisionService } from '../services/aiVisionService';
import { AIDetection } from '../types';
import { voiceService } from '../services/voiceService';
import { 
  Eye, 
  Camera, 
  Upload, 
  Play, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Cpu, 
  Volume2,
  CloudFog,
  CloudRain,
  HelpCircle
} from 'lucide-react';

export const AIRoadScanner: React.FC = () => {
  const { reportHazard, speakEnabled, setRearDisplayMessage } = useApp();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeDetections, setActiveDetections] = useState<AIDetection[]>(AIVisionService.sampleDetections);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [activeMediaSource, setActiveMediaSource] = useState<'demo' | 'webcam' | 'upload'>('demo');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Weather & Visibility AI Condition State
  const [visibilityState, setVisibilityState] = useState<'CLEAR' | 'FOG' | 'HEAVY_RAIN'>('CLEAR');
  const [cameraConfidenceLow, setCameraConfidenceLow] = useState<boolean>(false);

  const handleVisibilityChange = (condition: 'CLEAR' | 'FOG' | 'HEAVY_RAIN') => {
    setVisibilityState(condition);
    if (condition === 'FOG') {
      setCameraConfidenceLow(true); // Fog lowers visual clarity confidence
      setRearDisplayMessage('🌫️ DENSE FOG ALERT');
      if (speakEnabled) {
        voiceService.speak(
          "Low visibility detected due to dense fog. Rear display signaling Caution.",
          "सावधान! घना कोहरा - दृश्यता कम है। गाड़ियों को अलर्ट भेजा गया है।"
        );
      }
    } else if (condition === 'HEAVY_RAIN') {
      setCameraConfidenceLow(true);
      setRearDisplayMessage('⚠️ CAUTION — LOW VISIBILITY');
      if (speakEnabled) {
        voiceService.speak(
          "Heavy rain detected. Low road visibility alert active.",
          "सावधान! भारी बारिश - दृश्यता कम है। धीमे चलें।"
        );
      }
    } else {
      setCameraConfidenceLow(false);
      setRearDisplayMessage('PASS FROM LEFT →');
    }
  };

  // Draw bounding boxes on canvas whenever detections or media change
  useEffect(() => {
    if (canvasRef.current) {
      AIVisionService.drawDetections(canvasRef.current, activeDetections, 640, 360);
    }
  }, [activeDetections, selectedImage]);

  const handleStartWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 360 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        setActiveMediaSource('webcam');
      }
    } catch (err) {
      console.warn('Webcam permission denied or unavailable. Using Demo Vision Mode.');
      setActiveMediaSource('demo');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setActiveMediaSource('upload');
    }
  };

  const primaryPothole = activeDetections.find(d => d.type === 'pothole');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-display font-extrabold text-white">
              AI ROAD SCANNER & COMPUTER VISION LAB
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-Time Object Scanner, Multi-Class Hazard Detection & Distance Pipeline
          </p>
        </div>

        {/* Media Selector Controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setActiveMediaSource('demo'); setSelectedImage(null); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeMediaSource === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎬 Demo Mode
          </button>
          
          <button
            onClick={handleStartWebcam}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              activeMediaSource === 'webcam' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Webcam</span>
          </button>

          <label className="px-3 py-1.5 rounded-lg font-bold text-slate-400 hover:text-white cursor-pointer flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
            <input type="file" accept="image/*,video/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* AI VISIBILITY & WEATHER CONDITION SELECTOR BAR */}
      <div className="mb-8 glass-panel p-4 rounded-2xl border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CloudFog className="w-5 h-5 text-cyan-400" />
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              AI VISIBILITY & WEATHER CONDITION MONITOR
            </h4>
            <p className="text-[11px] text-slate-400">
              Identifies fog, rain, or low visibility $\rightarrow$ Sends CAUTION signal to rear traffic.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => handleVisibilityChange('CLEAR')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              visibilityState === 'CLEAR' ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            ☀️ Clear Visibility
          </button>
          
          <button
            onClick={() => handleVisibilityChange('FOG')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visibilityState === 'FOG' ? 'bg-cyan-500 text-black animate-pulse' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <CloudFog className="w-3.5 h-3.5" />
            <span>🌫️ Dense Fog (कोहरा)</span>
          </button>

          <button
            onClick={() => handleVisibilityChange('HEAVY_RAIN')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visibilityState === 'HEAVY_RAIN' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>🌧️ Heavy Rain</span>
          </button>
        </div>
      </div>

      {/* LOW VISIBILITY / LOW AI CONFIDENCE WARNING CARD */}
      {visibilityState !== 'CLEAR' && (
        <div className="mb-8 bg-cyan-950/80 border-2 border-cyan-500/80 p-5 rounded-2xl shadow-xl shadow-cyan-500/10 animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CloudFog className="w-8 h-8 text-cyan-400" />
              <div>
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <span>🌫️ LOW VISIBILITY DETECTED ({visibilityState === 'FOG' ? 'DENSE FOG' : 'HEAVY RAIN'})</span>
                </h4>
                <p className="text-xs font-mono text-cyan-200 mt-0.5">
                  Clear sight range reduced to ~15m $\rightarrow$ Rear display signaling <span className="font-extrabold text-white">"⚠️ CAUTION — LOW VISIBILITY"</span>
                </p>
              </div>
            </div>

            {cameraConfidenceLow && (
              <div className="bg-amber-950/80 border border-amber-500/80 px-3.5 py-2 rounded-xl text-amber-300 font-mono text-xs flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>AI CONFIDENCE: LOW (&lt;60%) — UNVERIFIED WARNING</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 12: POTHOLE WARNING ALERT BANNER */}
      {primaryPothole && (
        <div className="mb-8 bg-red-950/80 border-2 border-red-500/80 p-6 rounded-3xl shadow-2xl shadow-red-500/20 animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  ⚠️ POTHOLE DETECTED
                </h3>
                <p className="text-sm font-mono text-red-200 mt-0.5">
                  Approximately <span className="font-extrabold text-white">~{primaryPothole.distanceApproxMeters} meters</span> ahead in <span className="font-extrabold text-white">{primaryPothole.lanePosition}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="bg-black/60 px-3 py-2 rounded-xl border border-red-500/40 text-red-300">
                AI Confidence: <span className="font-bold text-white">{primaryPothole.confidence}%</span>
              </div>
              <div className="bg-black/60 px-3 py-2 rounded-xl border border-red-500/40 text-red-300">
                Severity: <span className="font-bold text-white">{primaryPothole.severity}</span>
              </div>
              <button
                onClick={() => reportHazard(primaryPothole)}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold px-4 py-2 rounded-xl shadow-lg transition-all"
              >
                Broadcast Warning ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CAMERA CANVAS SCANNER DISPLAY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* CAMERA / IMAGE FEED WITH CANVAS BOUNDING BOX OVERLAY (8 COLS) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-4 h-4" /> AI NEURAL SCANNER OVERLAY
              </span>
              <span className="text-[11px] font-mono bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded border border-purple-500/30">
                YOLOv8 + OPENCV DEPTH
              </span>
            </div>

            {/* Video / Canvas Viewport */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
              
              {/* Webcam Video Tag */}
              <video 
                ref={videoRef} 
                className={`absolute inset-0 w-full h-full object-cover ${activeMediaSource === 'webcam' ? 'block' : 'hidden'}`} 
                muted 
                playsInline 
              />

              {/* Demo Road Simulation Background Image */}
              {activeMediaSource !== 'webcam' && (
                <div className="absolute inset-0 bg-[#0B0F17] flex items-center justify-center">
                  <div className="w-full h-full relative opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent z-10" />
                    {/* Simulated Highway Scene Canvas Backing */}
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center text-slate-700 font-mono text-sm">
                      🛣️ SIMULATED ROADWAY CAMERA FEED (HIGHWAY SCENE 4K)
                    </div>
                  </div>
                </div>
              )}

              {/* Uploaded Image Feed */}
              {activeMediaSource === 'upload' && selectedImage && (
                <img src={selectedImage} alt="Uploaded Road Scene" className="absolute inset-0 w-full h-full object-cover" />
              )}

              {/* Bounding Box Drawing Canvas Layer */}
              <canvas
                ref={canvasRef}
                width={640}
                height={360}
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              />

              {/* Radar Scanning Line Animation Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent h-1/4 animate-pulse pointer-events-none z-10" />

            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DETECTED CLASSES: 🚗 CAR, 🏍️ MOTORCYCLE, 🚶 PEDESTRIAN, 🕳️ POTHOLE, 🚧 BARRIER</span>
            <span className="text-purple-400">FPS: 30.2</span>
          </div>

        </div>

        {/* DETECTED OBJECTS LIST & DETAILED CARDS (4 COLS) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            AI SCANNER DETECTIONS ({activeDetections.length})
          </h3>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {activeDetections.map((det) => (
              <div
                key={det.id}
                className={`p-3.5 rounded-xl border text-xs font-mono transition-all ${
                  det.severity === 'HIGH'
                    ? 'bg-red-950/40 border-red-500/50 text-red-200'
                    : det.severity === 'MODERATE'
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-white text-sm">
                    {det.type === 'pothole' ? '🕳️' : det.type === 'vehicle' ? '🚗' : '🚧'} {det.label}
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold">
                    {det.confidence}% CONF
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>
                    <span>Distance: </span>
                    <span className="text-white font-bold">~{det.distanceApproxMeters} m</span>
                  </div>
                  <div>
                    <span>Lane: </span>
                    <span className="text-white font-bold">{det.lanePosition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 13: AI DISTANCE ESTIMATION PIPELINE VISUALIZER */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800">
        <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-4">
          DEPTH & DISTANCE ESTIMATION PIPELINE ARCHITECTURE
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center font-mono text-xs">
          
          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-lg block mb-1">📷</span>
            <span className="font-bold text-white block">Camera Input</span>
            <span className="text-[10px] text-slate-400">1080p 60fps</span>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-purple-500/40 text-purple-300">
            <span className="text-lg block mb-1">🤖</span>
            <span className="font-bold block">Object Detection</span>
            <span className="text-[10px] text-slate-400">YOLO Model</span>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-red-500/40 text-red-300">
            <span className="text-lg block mb-1">⚠️</span>
            <span className="font-bold block">Hazard Detection</span>
            <span className="text-[10px] text-slate-400">Classification</span>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-cyan-500/40 text-cyan-300">
            <span className="text-lg block mb-1">📐</span>
            <span className="font-bold block">Depth Estimation</span>
            <span className="text-[10px] text-slate-400">MonoDepth ~40m</span>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-emerald-500/40 text-emerald-300">
            <span className="text-lg block mb-1">🛣️</span>
            <span className="font-bold block">Lane Position</span>
            <span className="text-[10px] text-slate-400">Trajectory Fit</span>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-amber-500/40 text-amber-300">
            <span className="text-lg block mb-1">🛡️</span>
            <span className="font-bold block">Risk Engine</span>
            <span className="text-[10px] text-slate-400">High Risk Alert</span>
          </div>

        </div>

        <p className="text-[11px] font-mono text-slate-400 mt-4 text-center">
          * Note: Distance measurements are calculated via AI focal length estimation (~40m approx range). Never presented as guaranteed collision metrics.
        </p>
      </div>

    </div>
  );
};
