import React, { useState } from 'react';
import { Smartphone, Monitor, RotateCcw, Volume2, Wifi, Battery, Sparkles } from 'lucide-react';

interface MobileDeviceSimulatorProps {
  children: React.ReactNode;
  onExitSimulator: () => void;
  deviceType?: 'iphone' | 'android';
}

export const MobileDeviceSimulator: React.FC<MobileDeviceSimulatorProps> = ({
  children,
  onExitSimulator,
  deviceType = 'iphone'
}) => {
  const [device, setDevice] = useState<'iphone' | 'android'>(deviceType);

  return (
    <div className="py-6 px-4 min-h-screen bg-slate-900/95 flex flex-col items-center justify-center">
      {/* Simulator Control Bar */}
      <div className="mb-4 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2 flex items-center gap-4 text-xs shadow-xl text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-white flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            Interactive Mobile App Mode
          </span>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl">
          <button
            onClick={() => setDevice('iphone')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              device === 'iphone' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            iOS iPhone 16
          </button>
          <button
            onClick={() => setDevice('android')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              device === 'android' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Google Pixel 9
          </button>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        {/* Exit to Desktop button */}
        <button
          id="btn-exit-simulator"
          onClick={onExitSimulator}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Monitor className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exit to Full Desktop</span>
        </button>
      </div>

      {/* Hardware Frame */}
      <div
        className={`relative w-[390px] h-[844px] max-h-[92vh] bg-slate-950 rounded-[50px] p-3 shadow-2xl border-[8px] ${
          device === 'iphone' ? 'border-slate-700' : 'border-slate-800'
        } ring-1 ring-white/20 flex flex-col overflow-hidden`}
      >
        {/* Hardware side buttons decoration */}
        <div className="absolute -left-[11px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[11px] top-38 w-[3px] h-12 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[11px] top-54 w-[3px] h-12 bg-slate-700 rounded-l-xs" />
        <div className="absolute -right-[11px] top-32 w-[3px] h-16 bg-slate-700 rounded-r-xs" />

        {/* Screen Container */}
        <div className="relative w-full h-full bg-slate-100 rounded-[40px] overflow-hidden flex flex-col shadow-inner">
          {/* Dynamic Island / Punch Hole */}
          {device === 'iphone' ? (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-3.5 h-3.5 bg-black rounded-full border border-slate-800" />
          )}

          {/* Child App Body (Scrollable inside device) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-none">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="h-4 bg-white shrink-0 flex items-center justify-center">
            <div className="w-32 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
