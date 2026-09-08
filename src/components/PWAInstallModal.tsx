import React, { useState } from 'react';
import {
  Download,
  X,
  Share2,
  PlusSquare,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Zap,
  Camera,
  MapPin,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../i18n/LanguageContext';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenExternal = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-tr from-slate-900 via-emerald-950 to-slate-900 text-white p-5 relative">
          <button
            id="btn-close-install-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 p-1 flex items-center justify-center shadow-md">
              <img src="/pwa-192x192.png" alt="Packet Scanner App Icon" className="w-10 h-10 rounded-xl" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {t('downloadApp')}
              </h3>
              <p className="text-xs text-emerald-300">
                Official Consumer Legal Metrology Mobile App
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          {/* Key Advantages */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Instant Camera Barcode Scan</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Offline Pan-India Radar</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Rule 18(2) Overcharge Alert</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Fast Home Screen Launch</span>
            </div>
          </div>

          {/* Installation Flow */}
          {isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="font-bold text-emerald-900 text-sm">App Already Installed</p>
              <p className="text-[11px] text-emerald-700">
                Packet Scanner is running in standalone mode or already installed on your device home screen.
              </p>
            </div>
          ) : isInstallable ? (
            <div className="space-y-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
              <p className="text-slate-700 font-medium text-[11px]">
                Ready to install directly onto your Android device:
              </p>
              <button
                id="btn-confirm-install-pwa"
                onClick={handleInstallClick}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadInstallBtn')}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* If opened inside an iframe or preview, explain why native prompt doesn't pop up */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <p className="font-bold text-[11px] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  How to download on Android Phone:
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Web apps cannot be installed while viewing inside a preview iframe or in-app browser. Open this link directly in <strong>Google Chrome</strong>:
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleOpenExternal}
                    className="flex-1 bg-amber-700 hover:bg-amber-800 active:scale-95 text-white font-bold py-2 px-3 rounded-lg text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Chrome Tab</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="bg-white hover:bg-amber-100 active:scale-95 text-amber-900 border border-amber-300 font-semibold py-2 px-3 rounded-lg text-[11px] flex items-center gap-1 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step-by-Step Android Instructions */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-slate-700">
                <p className="font-bold text-slate-900 text-[11px]">
                  3 Simple Steps in Android Chrome:
                </p>
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <p>
                      In <strong>Google Chrome</strong>, tap the <strong>three dots (`⋮`)</strong> menu in the top-right corner.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <p>
                      Scroll down and tap <strong>"Install app"</strong> (or <strong>"Add to Home screen"</strong>).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <p>
                      Tap <strong>"Install"</strong>. The official <strong>Packet Scanner</strong> icon will appear on your phone home screen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isIOS && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
              <p className="font-bold text-xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                iOS Safari Install Instructions:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-emerald-900 leading-relaxed font-medium">
                <li>
                  Tap the <Share2 className="w-3.5 h-3.5 inline text-emerald-700 mx-1" /> <strong>Share</strong> icon in the Safari bottom toolbar.
                </li>
                <li>
                  Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-emerald-700 mx-1" /> <strong>Add to Home Screen</strong>.
                </li>
                <li>
                  Confirm <strong>Add</strong> to place the Packet Scanner app on your home screen.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Version 2.6 • Progressive Web App</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
