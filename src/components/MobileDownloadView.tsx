import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  PlusSquare,
  ExternalLink,
  Copy,
  Check,
  Camera,
  ShieldAlert,
  Zap,
  HardDrive,
  QrCode,
  ArrowRight,
  Info
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../i18n/LanguageContext';
import { AppLogo } from './AppLogo';

interface MobileDownloadViewProps {
  onOpenScanner?: () => void;
}

export const MobileDownloadView: React.FC<MobileDownloadViewProps> = ({ onOpenScanner }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [selectedOS, setSelectedOS] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');
  const [installTriggered, setInstallTriggered] = useState(false);

  const currentUrl = typeof window !== 'undefined'
    ? (window.location.origin || 'https://ais-pre-2zang23cdgr2czusz6sj22-634797793863.asia-east1.run.app')
    : 'https://ais-pre-2zang23cdgr2czusz6sj22-634797793863.asia-east1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallApp = async () => {
    setInstallTriggered(true);
    if (isInstallable) {
      await install();
    } else {
      // If prompt isn't native, open in standalone tab or prompt browser menu
      window.open(currentUrl, '_blank');
    }
  };

  // Download a standalone mobile web launcher file
  const handleDownloadLauncher = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Packet Scanner Mobile</title>
  <meta http-equiv="refresh" content="0; url=${currentUrl}">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #064e3b; color: #fff; text-align: center; padding: 20px; }
    .btn { display: inline-block; background: #10b981; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Packet Scanner</h1>
  <p>Launching Legal Metrology & Dual MRP Inspection App...</p>
  <a class="btn" href="${currentUrl}">Launch Packet Scanner</a>
  <script>window.location.href = "${currentUrl}";</script>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packet-scanner-mobile.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <AppLogo size="lg" rounded="2xl" />
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Official Mobile Application • Version 2.6</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Download <span className="text-emerald-400">Packet Scanner</span> on Your Phone
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Install the Legal Metrology & Dual MRP Scanner directly on your Android or iPhone device. No Google Play Store or App Store account required — install in seconds with instant offline access and direct camera OCR.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-download-install-primary"
                onClick={handleInstallApp}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isInstalled ? 'App Already Installed' : t('downloadInstallBtn')}</span>
              </button>

              <button
                id="btn-copy-mobile-url"
                onClick={handleCopyLink}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-4 py-3 rounded-xl text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">{t('linkCopiedAlert')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t('copyLinkBtn')}</span>
                  </>
                )}
              </button>

              <button
                id="btn-download-launcher-file"
                onClick={handleDownloadLauncher}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-xl text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download offline mobile shortcut file"
              >
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Offline Shortcut</span>
              </button>
            </div>

            {/* Status tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero storage overhead (~2MB)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Works without active WiFi/Data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Hardware camera integration
              </span>
            </div>
          </div>

          {/* QR Code Card for Desktop to Mobile handoff */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-emerald-500/30 text-center max-w-xs w-full space-y-4">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <QrCode className="w-4 h-4" />
                <span>Scan with Phone Camera</span>
              </div>

              {/* Real QR Code linking directly to app */}
              <div className="keep-white bg-white p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
                <QRCodeSVG
                  value={currentUrl}
                  size={180}
                  level="M"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  className="rounded-lg mx-auto"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900">
                  Point phone camera at this QR
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Instant mobile access without typing the URL.
                </p>
              </div>

              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <span>Open in New Mobile Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* OS Selection Tabs & Step-by-Step Instructions */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-700" />
              Step-by-Step Mobile Installation Guide
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your operating system below for 1-minute setup instructions
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedOS('android')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                selectedOS === 'android'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🤖 Android (Chrome / Brave / Edge)</span>
            </button>
            <button
              onClick={() => setSelectedOS('ios')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                selectedOS === 'ios'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🍏 iPhone / iPad (Safari)</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {selectedOS === 'android' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Open in Google Chrome
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open this URL on your Android mobile device using Google Chrome, Samsung Internet, or Brave Browser.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-[11px] font-mono text-emerald-800 break-all">
                    {currentUrl}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Tap Menu or Install Prompt
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tap the <strong>three vertical dots (`⋮`)</strong> in the top-right corner of Chrome, or tap the green <strong>"Install App"</strong> button inside this web page.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>Select "Install app" or "Add to Home screen"</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Confirm & Launch
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tap <strong>"Install"</strong> in the confirmation prompt. The official <strong>Packet Scanner</strong> icon will appear on your phone home screen and app launcher.
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Ready for instant camera packet inspection</span>
                  </div>
                </div>
              </div>

              {/* Android direct trigger card */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Are you on your Android phone right now?
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click the download button below to trigger the Android system install dialog directly.
                  </p>
                </div>
                <button
                  id="btn-trigger-android-direct"
                  onClick={handleInstallApp}
                  className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Start Android Download / Install</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Open in Apple Safari
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open this URL in <strong>Apple Safari</strong> on your iPhone or iPad (Apple only supports home screen installs via Safari).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Tap the Share Button
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tap the <Share2 className="w-4 h-4 inline text-emerald-700 mx-1" /> <strong>Share</strong> button at the bottom navigation bar of Safari.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Add to Home Screen
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scroll down and tap <PlusSquare className="w-4 h-4 inline text-emerald-700 mx-1" /> <strong>"Add to Home Screen"</strong>, then tap <strong>"Add"</strong> in the top right.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature comparison: Web vs Mobile App */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Hardware Camera OCR</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Point phone lens at retail packets for real-time 0.4s detection of MRP, Net Qty, and Expiry stamps.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Full-Screen Standalone</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Launches without URL bars, browser headers, or tabs for maximum screen area when taking photos in stores.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Offline Radar</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Access past scans, penalty calculators, and Pan-India retail violation records even in basements with no network.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Instant Grievance Notice</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Geotag store coordinates and generate official Form 1 statutory notices directly from the grocery aisle.
          </p>
        </div>
      </div>
    </div>
  );
};
