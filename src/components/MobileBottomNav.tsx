import React from 'react';
import { Scan, MapPin, BookOpen, FileText, BarChart3, Camera, Download } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics' | 'download';
  setActiveTab: (tab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics' | 'download') => void;
  onQuickCameraClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onQuickCameraClick
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Tab 1: Scanner */}
        <button
          id="mobile-nav-scanner"
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'scanner'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Scan className="w-5 h-5" />
            {activeTab === 'scanner' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Scanner</span>
        </button>

        {/* Tab 2: All India Map */}
        <button
          id="mobile-nav-map"
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative ${
            activeTab === 'map'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <MapPin className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[8px] font-extrabold px-1 rounded-full animate-pulse">
              LIVE
            </span>
            {activeTab === 'map' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">India Map</span>
        </button>

        {/* Center Floating Quick Camera Shutter Button */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            id="mobile-nav-camera-shutter"
            onClick={() => {
              setActiveTab('scanner');
              if (onQuickCameraClick) onQuickCameraClick();
            }}
            title="Instant Camera Scan"
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-500 text-white shadow-lg shadow-emerald-700/40 flex items-center justify-center ring-4 ring-white active:scale-95 transition-transform"
          >
            <Camera className="w-6 h-6" />
          </button>
          <span className="text-[9px] font-bold text-emerald-800 mt-0.5 tracking-tight">
            Quick Scan
          </span>
        </div>

        {/* Tab 3: Rules Compendium */}
        <button
          id="mobile-nav-rules"
          onClick={() => setActiveTab('rules')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'rules'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {activeTab === 'rules' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Rules</span>
        </button>

        {/* Tab 4: Grievance Notice */}
        <button
          id="mobile-nav-grievance"
          onClick={() => setActiveTab('grievance')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'grievance'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <FileText className="w-5 h-5" />
            {activeTab === 'grievance' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Notice</span>
        </button>

        {/* Tab 5: Analytics */}
        <button
          id="mobile-nav-analytics"
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'analytics'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <BarChart3 className="w-5 h-5" />
            {activeTab === 'analytics' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Stats</span>
        </button>

        {/* Tab 6: Download App */}
        <button
          id="mobile-nav-download"
          onClick={() => setActiveTab('download')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'download'
              ? 'text-emerald-700 font-bold'
              : 'text-emerald-800 font-semibold'
          }`}
        >
          <div className="relative">
            <Download className="w-5 h-5 text-emerald-700" />
            {activeTab === 'download' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight text-emerald-700 font-bold">Install</span>
        </button>
      </div>
    </nav>
  );
};
