import React from 'react';
import { ShieldCheck, Lock, Users, Code, Cpu, Eye, FileText } from 'lucide-react';

export const PrivacyAndRoadmap: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* SECTION 28: PRIVACY BY DESIGN */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800 mb-12">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <Lock className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              PRIVACY BY DESIGN ARCHITECTURE
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              On-Device Computer Vision Processing & Anonymous Vehicle Identity Safeguards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>On-Device Video Processing</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Camera frames are analyzed in real-time on local vehicle hardware memory. Raw video streams are never transmitted or stored permanently.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Anonymous Vehicle IDs</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              All V2V mesh messages use rotating anonymous tokens (e.g., RCC-001). Personal driver identification is completely decoupled from hazard telemetry.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Minimal Metadata Storage</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Only anonymous hazard telemetry (GPS coordinates, hazard class, severity rating) is retained for collaborative verification.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 32: THE HACKATHON TEAM */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <Users className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              PROJECT ENGINEERING TEAM
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Multidisciplinary Engineering Team Roles & Architecture Leads
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center font-mono text-xs">
          
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              AI
            </div>
            <h4 className="font-bold text-white text-sm mb-1">AI & Computer Vision</h4>
            <p className="text-[11px] text-slate-400">Model Architecture & Depth Pipeline</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              FS
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Full-Stack Lead</h4>
            <p className="text-[11px] text-slate-400">React + Node + Socket.IO V2V Mesh</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              IoT
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Hardware & IoT</h4>
            <p className="text-[11px] text-slate-400">Arduino / ESP32 & LED Matrix Interface</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              UX
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Product & UI/UX</h4>
            <p className="text-[11px] text-slate-400">Distraction-Free Driver Experience</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              DOC
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Research & Docs</h4>
            <p className="text-[11px] text-slate-400">System Specs & Safety Verification</p>
          </div>

        </div>
      </div>

    </div>
  );
};
