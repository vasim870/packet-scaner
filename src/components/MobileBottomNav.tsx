import React from 'react';
import { Scan, MapPin, BookOpen, FileText, BarChart3, Camera, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Tab 1: Scanner */}
        <button
          id="mobile-nav-scanner"
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'scanner'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Scan className="w-5 h-5" />
            {activeTab === 'scanner' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">{t('tabScanner')}</span>
        </button>

        {/* Tab 2: All India Map */}
        <button
          id="mobile-nav-map"
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative cursor-pointer ${
            activeTab === 'map'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <MapPin className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[8px] font-extrabold px-1 rounded-full animate-pulse">
              LIVE
            </span>
            {activeTab === 'map' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">{t('tabMap')}</span>
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
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-500 text-white shadow-lg shadow-emerald-700/40 flex items-center justify-center ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform cursor-pointer"
          >
            <Camera className="w-6 h-6" />
          </button>
          <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 mt-0.5 tracking-tight">
            {t('takePhoto')}
          </span>
        </div>

        {/* Tab 3: Rules Compendium */}
        <button
          id="mobile-nav-rules"
          onClick={() => setActiveTab('rules')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'rules'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {activeTab === 'rules' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">{t('tabRules')}</span>
        </button>

        {/* Tab 4: Grievance Notice */}
        <button
          id="mobile-nav-grievance"
          onClick={() => setActiveTab('grievance')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'grievance'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <FileText className="w-5 h-5" />
            {activeTab === 'grievance' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">{t('tabGrievance')}</span>
        </button>

        {/* Tab 5: Analytics */}
        <button
          id="mobile-nav-analytics"
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <BarChart3 className="w-5 h-5" />
            {activeTab === 'analytics' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">{t('tabAnalytics')}</span>
        </button>

        {/* Tab 6: Download App */}
        <button
          id="mobile-nav-download"
          onClick={() => setActiveTab('download')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'download'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-emerald-800 dark:text-emerald-300 font-semibold'
          }`}
        >
          <div className="relative">
            <Download className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            {activeTab === 'download' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight text-emerald-700 dark:text-emerald-400 font-bold">{t('tabDownload')}</span>
        </button>
      </div>
    </nav>
  );
};

