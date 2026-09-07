import React from 'react';
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
  MapPin
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
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
              <img src="/icon.svg" alt="PCCS App Icon" className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                PCCS Mobile App
              </h3>
              <p className="text-xs text-emerald-300">
                Department of Consumer Affairs • Legal Metrology Division
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Key Advantages */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Direct Camera Label Scanner</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Hyderabad Offline Radar</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Rule 18(2) Overcharge Alert</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-800 text-[11px]">Instant Home Screen Launch</span>
            </div>
          </div>

          {/* Installation Instructions based on Platform */}
          {isIOS ? (
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
                  Confirm <strong>Add</strong> to place the PCCS app icon on your home screen.
                </li>
              </ol>
            </div>
          ) : isInstallable ? (
            <div className="space-y-3">
              <p className="text-slate-600">
                Click below to install the application directly to your Android or desktop system without going through app store downloads.
              </p>
              <button
                id="btn-confirm-install-pwa"
                onClick={handleInstallClick}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Install PCCS Mobile App</span>
              </button>
            </div>
          ) : isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="font-bold text-emerald-900">App Already Installed</p>
              <p className="text-[11px] text-emerald-700">
                PCCS is running in standalone mode or installed on your device launcher.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-slate-600" />
                Install on Android / Chrome:
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Open browser options (⋮ on top right) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Version 2.6 • Offline PWA Ready</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
