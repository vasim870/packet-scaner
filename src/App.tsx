/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileAppHeader } from './components/MobileAppHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDeviceSimulator } from './components/MobileDeviceSimulator';
import { PWAInstallModal } from './components/PWAInstallModal';
import { ScannerView } from './components/ScannerView';
import { IndiaViolationMap } from './components/IndiaViolationMap';
import { RulesAndPenaltyGuide } from './components/RulesAndPenaltyGuide';
import { GrievanceForm } from './components/GrievanceForm';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { MobileDownloadView } from './components/MobileDownloadView';
import { ProductScanResult, StoreViolationReport } from './types';
import { Scale, Phone, ExternalLink, ShieldCheck, Smartphone, Download, X } from 'lucide-react';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'scanner' | 'map' | 'rules' | 'grievance' | 'analytics' | 'download'>('scanner');

  const [latestScan, setLatestScan] = useState<ProductScanResult | null>(null);
  const [selectedStoreForNotice, setSelectedStoreForNotice] = useState<StoreViolationReport | null>(null);
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [showMobileBanner, setShowMobileBanner] = useState(true);
  const { isInstalled } = usePWAInstall();

  const [serverStatus, setServerStatus] = useState<{
    connected: boolean;
    aiService?: string;
    hasKey?: boolean;
  }>({
    connected: false
  });

  // Check backend server health
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setServerStatus({
            connected: true,
            aiService: data.aiService,
            hasKey: data.hasGeminiApiKey
          });
        } else {
          setServerStatus({ connected: false });
        }
      } catch (e) {
        setServerStatus({ connected: false });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleScanComplete = (result: ProductScanResult) => {
    setLatestScan(result);
  };

  const handleNavigateToGrievance = (result: ProductScanResult) => {
    setLatestScan(result);
    setSelectedStoreForNotice(null);
    setActiveTab('grievance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromMapToGrievance = (scanData?: ProductScanResult | null, storeData?: StoreViolationReport) => {
    if (scanData) setLatestScan(scanData);
    if (storeData) setSelectedStoreForNotice(storeData);
    setActiveTab('grievance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMap = (result: ProductScanResult) => {
    setLatestScan(result);
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickCameraClick = () => {
    setActiveTab('scanner');
    // Scroll to camera in scanner
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Content renderer for both desktop and mobile modes
  const renderMainContent = () => (
    <>
      {activeTab === 'scanner' && (
        <ScannerView
          onScanComplete={handleScanComplete}
          onNavigateToGrievance={handleNavigateToGrievance}
          onNavigateToMap={handleNavigateToMap}
          onNavigateToDownload={() => setActiveTab('download')}
        />
      )}

      {activeTab === 'map' && (
        <IndiaViolationMap
          initialScanForReport={latestScan}
          onNavigateToGrievance={handleNavigateFromMapToGrievance}
        />
      )}

      {activeTab === 'rules' && <RulesAndPenaltyGuide />}

      {activeTab === 'grievance' && (
        <GrievanceForm
          initialScanData={latestScan}
          initialStoreData={selectedStoreForNotice}
        />
      )}

      {activeTab === 'analytics' && <AnalyticsDashboard />}

      {activeTab === 'download' && (
        <MobileDownloadView onOpenScanner={() => setActiveTab('scanner')} />
      )}
    </>
  );

  // If user activated the interactive phone simulator on desktop
  if (isMobileSimulator) {
    return (
      <>
        <MobileDeviceSimulator onExitSimulator={() => setIsMobileSimulator(false)}>
          <MobileAppHeader
            isSimulator={true}
            onToggleSimulator={() => setIsMobileSimulator(false)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
          <div className="flex-1 pb-20">
            {renderMainContent()}
          </div>
          <MobileBottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onQuickCameraClick={handleQuickCameraClick}
          />
        </MobileDeviceSimulator>

        <PWAInstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-emerald-200 selection:text-emerald-900 pb-16 md:pb-0 transition-colors duration-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        serverStatus={serverStatus}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Mobile Download/Install Notification Banner */}
      {!isInstalled && showMobileBanner && (
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-emerald-700/50 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Download className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Download Packet Scanner App</span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Android & iOS
                </span>
              </p>
              <p className="text-[11px] text-emerald-200">
                Install on your phone home screen for instant camera barcode scans
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-banner-download-app"
              onClick={() => setIsInstallModalOpen(true)}
              className="bg-white hover:bg-emerald-50 active:scale-95 text-emerald-900 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              Install App
            </button>
            <button
              id="btn-banner-close"
              onClick={() => setShowMobileBanner(false)}
              className="p-1 rounded-md text-emerald-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 pb-6">
        {renderMainContent()}
      </main>

      {/* Mobile-Only Bottom Navigation Bar (Visible on phones & small screens) */}
      <div className="block md:hidden">
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onQuickCameraClick={handleQuickCameraClick}
        />
      </div>

      {/* PWA Install Instructions Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Official Footer (Visible on desktop) */}
      <footer className="hidden md:block bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">
                  Department of Consumer Affairs • Legal Metrology Division
                </p>
                <p className="text-[11px] text-slate-400">
                  Packaged Commodities Statutory Compliance & Consumer Protection Portal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                id="btn-footer-download-app"
                onClick={() => setActiveTab('download')}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Mobile App</span>
              </button>
              <button
                onClick={() => setIsMobileSimulator(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors font-medium"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Open Mobile Simulator</span>
              </button>
              <span className="flex items-center gap-1 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Helpline: <strong className="text-white font-mono">1915</strong>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Metrology Act, 2009
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              Packet Scanner v2.6 • Legal Metrology (Packaged Commodities) Rules 2011 • Progressive Web App (PWA) & Mobile Ready.
            </p>
            <p className="font-mono">
              National Consumer Helpline • Pan-India Radar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


