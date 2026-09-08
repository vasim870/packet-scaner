import React, { useState, useEffect } from 'react';
import { Scale, Download, Share2, Smartphone, Monitor, ShieldCheck, Wifi, Battery, Sun, Moon } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { AppLogo } from './AppLogo';

interface MobileAppHeaderProps {
  isSimulator?: boolean;
  onToggleSimulator?: () => void;
  onOpenInstallModal?: () => void;
}

export const MobileAppHeader: React.FC<MobileAppHeaderProps> = ({
  isSimulator = false,
  onToggleSimulator,
  onOpenInstallModal
}) => {
  const { isInstallable, isInstalled } = usePWAInstall();
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md select-none">
      {/* Mobile Status Bar (Visible in simulator or standalone mobile mode) */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between text-[11px] font-medium text-slate-400 border-b border-slate-800/60">
        <span className="font-mono text-white font-semibold">{currentTime}</span>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-[10px] font-bold text-emerald-400">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-mono">98%</span>
            <Battery className="w-3.5 h-3.5 fill-current text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Main Mobile App Action Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AppLogo size="sm" rounded="lg" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm tracking-tight text-white">
                {t('appTitle')}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded font-mono">
                Official
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Legal Metrology Compliance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <LanguageSelector variant="compact" id="mobile-app-header-lang" />

          {/* Theme Toggle Button */}
          <button
            id="mobile-header-theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center border border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-300 fill-slate-300/20" />
            )}
          </button>

          {/* Install App Button */}
          {!isInstalled && (
            <button
              id="mobile-header-install-btn"
              onClick={onOpenInstallModal}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('downloadApp')}</span>
            </button>
          )}

          {/* Desktop/Mobile Simulator Toggle (if supported) */}
          {onToggleSimulator && (
            <button
              id="btn-toggle-device-view"
              onClick={onToggleSimulator}
              title={isSimulator ? 'Exit Mobile Frame' : 'Preview in Phone Frame'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              {isSimulator ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] hidden sm:inline">Desktop</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] hidden sm:inline">Phone</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

