import React from 'react';
import { Car, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
            <Car className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-white text-lg tracking-tight">
            REAR CAR COMMUNICATOR
          </span>
        </div>

        <p className="text-xs font-mono text-cyan-400 mb-6 font-semibold">
          "REAR CAR COMMUNICATOR IS NOT JUST A REAR DISPLAY."
        </p>

        <p className="text-sm font-display text-slate-300 max-w-xl mx-auto mb-8">
          Giving Vehicles a Voice. Making Roads More Predictable.
        </p>

        <div className="border-t border-slate-900 pt-6 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 REAR CAR COMMUNICATOR — VEHICLE ROAD SAFETY PLATFORM</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Road Safety & Connected Intelligent Transportation
          </span>
        </div>

      </div>
    </footer>
  );
};
