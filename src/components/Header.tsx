import React from 'react';
import { ShieldAlert, Scale, MapPin, FileText, BarChart3, Scan, CheckCircle2, AlertTriangle, Smartphone, Download, Sun, Moon } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { AppLogo } from './AppLogo';

interface HeaderProps {
  activeTab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics' | 'download';
  setActiveTab: (tab: 'scanner' | 'map' | 'rules' | 'grievance' | 'analytics' | 'download') => void;
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
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Official Government of India & Ministry Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-medium tracking-wide">
              {t('ministryTitle')}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="hidden sm:inline-block bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono text-[11px] font-semibold">
              {t('metrologyRulesTag')}
            </span>

            {/* Language Selector in Utility Bar */}
            <LanguageSelector variant="pill" id="top-bar-lang" />

            {/* Dark / Light Mode Toggle Button in Utility Bar */}
            <button
              id="btn-header-theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode (Night inspection)"}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span>{t('themeLight')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-300 fill-slate-300/20" />
                  <span>{t('themeDark')}</span>
                </>
              )}
            </button>

            {/* Mobile App Mode Toggle Button */}
            {onToggleMobileSimulator && (
              <button
                id="btn-header-toggle-mobile"
                onClick={onToggleMobileSimulator}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-all cursor-pointer ${
                  isMobileSimulator
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isMobileSimulator ? t('exitPhoneMode') : t('mobileAppView')}</span>
              </button>
            )}

            {/* Install PWA Button - Always visible on mobile & desktop */}
            {!isInstalled && onOpenInstallModal && (
              <button
                id="btn-header-install-app"
                onClick={onOpenInstallModal}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs transition-all cursor-pointer"
                title="Download Packet Scanner on Android or iPhone"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('downloadApp')}</span>
              </button>
            )}

            <span className="flex items-center gap-1.5 text-[11px]">
              {serverStatus.connected ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('backendActive')}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('connecting')}</span>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <AppLogo size="md" rounded="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('appTitle')}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {t('version')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium max-w-xl">
                {t('appSubtitle')}
              </p>
            </div>
          </div>

          {/* Quick theme toggle & language on mobile devices */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant="compact" id="mobile-lang-top" />
            <button
              id="btn-theme-toggle-mobile"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700/20" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Language / Theme Toggle */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <nav className="flex items-center gap-1">
            <button
              id="tab-scanner"
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span>{t('tabScanner')}</span>
            </button>

            <button
              id="tab-map"
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t('tabMap')}</span>
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {t('liveBadge')}
              </span>
            </button>

            <button
              id="tab-rules"
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{t('tabRules')}</span>
            </button>

            <button
              id="tab-grievance"
              onClick={() => setActiveTab('grievance')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'grievance'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t('tabGrievance')}</span>
            </button>

            <button
              id="tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('tabAnalytics')}</span>
            </button>

            <button
              id="tab-download"
              onClick={() => setActiveTab('download')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'download'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300/60'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>{t('tabDownload')}</span>
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {t('apkPwaBadge')}
              </span>
            </button>
          </nav>

          {/* Desktop Language Selector */}
          <LanguageSelector variant="full" id="main-nav-lang" className="hidden md:inline-block" />

          {/* Prominent Theme Toggle in Main Header */}
          <button
            id="btn-theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode (Night inspection)"}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>{t('themeLight')}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700/20" />
                <span>{t('themeDark')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

