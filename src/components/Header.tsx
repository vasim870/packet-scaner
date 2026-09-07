import React from 'react';
import { ShieldAlert, Scale, MapPin, FileText, BarChart3, Scan, CheckCircle2, AlertTriangle, Smartphone, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  activeTab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics';
  setActiveTab: (tab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics') => void;
  serverStatus: {
    connected: boolean;
    aiService?: string;
    hasKey?: boolean;
  };
  isMobileSimulator?: boolean;
  onToggleMobileSimulator?: () => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  serverStatus,
  isMobileSimulator = false,
  onToggleMobileSimulator,
  onOpenInstallModal
}) => {
  const { isInstalled } = usePWAInstall();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Official Government of India & Ministry Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-medium tracking-wide">
              Ministry of Consumer Affairs, Food & Public Distribution | Government of India
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="hidden sm:inline-block bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono text-[11px] font-semibold">
              Legal Metrology (Packaged Commodities) Rules 2011
            </span>

            {/* Mobile App Mode Toggle Button */}
            {onToggleMobileSimulator && (
              <button
                id="btn-header-toggle-mobile"
                onClick={onToggleMobileSimulator}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-all ${
                  isMobileSimulator
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isMobileSimulator ? 'Exit Phone Mode' : '📱 Mobile App View'}</span>
              </button>
            )}

            {/* Install PWA Button */}
            {!isInstalled && onOpenInstallModal && (
              <button
                id="btn-header-install-app"
                onClick={onOpenInstallModal}
                className="hidden md:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Install App</span>
              </button>
            )}

            <span className="flex items-center gap-1.5 text-[11px]">
              {serverStatus.connected ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Backend Active</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Connecting...</span>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs font-bold text-lg">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Packet Scanner
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                v2.6
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Legal Metrology Compliance, dual MRP overcharging detection & Pan-India violation mapping
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="tab-scanner"
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'scanner'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>Packet Scanner</span>
          </button>

          <button
            id="tab-map"
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>All India Violation Map</span>
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              Live
            </span>
          </button>

          <button
            id="tab-rules"
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Rules & Penalties</span>
          </button>

          <button
            id="tab-grievance"
            onClick={() => setActiveTab('grievance')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'grievance'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lodge Grievance</span>
          </button>

          <button
            id="tab-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Enforcement Stats</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
