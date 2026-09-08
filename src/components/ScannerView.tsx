import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Scale,
  Sparkles,
  FileCheck,
  Building2,
  Calendar,
  IndianRupee,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink,
  ChevronRight,
  Eye,
  Smartphone,
  Download,
  QrCode
} from 'lucide-react';
import { ProductScanResult, ComplianceViolation } from '../types';
import { PRESET_SAMPLES } from '../data/presetSamples';

interface ScannerViewProps {
  onScanComplete: (result: ProductScanResult) => void;
  onNavigateToGrievance: (result: ProductScanResult) => void;
  onNavigateToMap: (result: ProductScanResult) => void;
  onNavigateToDownload?: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  onScanComplete,
  onNavigateToGrievance,
  onNavigateToMap,
  onNavigateToDownload
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [productHint, setProductHint] = useState('');
  const [categoryHint, setCategoryHint] = useState('Food & Grocery');
  const [storeContext, setStoreContext] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanResult, setScanResult] = useState<ProductScanResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start / Stop camera capture
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setIsCameraActive(true);
        setErrorMsg(null);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 100);
      } catch (err) {
        console.error('Camera access error:', err);
        setErrorMsg('Camera access was not granted. Please upload a packet image or try a preset demo.');
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUrl);
      toggleCamera();
    }
  };

  // Execute Backend Scan
  const executeScan = async (overridePresetId?: string) => {
    setIsScanning(true);
    setErrorMsg(null);

    const steps = [
      'Extracting typography & Principal Display Panel text...',
      'Validating 8 Mandatory Declarations under Rule 6...',
      'Auditing Unit Sale Price (USP) under Rule 6(1)(da)...',
      'Checking Deceptive Slack Fill / Gas headspace (Rule 24)...',
      'Verifying Dual MRP stickers & overcharging (Rule 18(2))...',
      'Calculating statutory penalties under Legal Metrology Act Sec 36...'
    ];

    let stepIdx = 0;
    setScanStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setScanStep(steps[stepIdx]);
      }
    }, 450);

    try {
      const payload: any = {
        productNameHint: productHint,
        categoryHint: categoryHint,
        storeContext: storeContext
      };

      if (overridePresetId) {
        payload.presetId = overridePresetId;
      } else if (selectedImage) {
        payload.imageData = selectedImage;
      } else {
        // Default to a realistic sample if no image was selected
        payload.presetId = 'preset_cola_dualmrp';
      }

      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      clearInterval(stepInterval);
      setIsScanning(false);

      if (data.success && data.scan) {
        setScanResult(data.scan);
        onScanComplete(data.scan);
      } else {
        setErrorMsg('Failed to process label compliance. Please try another image.');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsScanning(false);
      console.error('Scan error:', err);
      setErrorMsg(`Inspection request failed: ${err.message}`);
    }
  };

  const handleSelectPreset = (sample: typeof PRESET_SAMPLES[0]) => {
    setSelectedImage(sample.imageUrl);
    setProductHint(sample.title);
    setCategoryHint(sample.category);
    executeScan(sample.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top Banner / Introduction */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Legal Metrology Enforcement System
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Verify If Companies Are Cheating on MRP, Weight, Expiry, or Slack Fill
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Upload any product packet label or snap a live photo. Our multimodal compliance engine checks all 8 mandatory declarations under the <span className="text-emerald-300 font-semibold">Legal Metrology (Packaged Commodities) Rules 2011</span>, flags Dual MRP scams, calculates permissible slack-fill ratios, and computes statutory penalties.
          </p>
        </div>
      </div>

      {/* Quick Test Samples Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Quick Test Presets (Instant Demo Scenarios)
            </h3>
            <span className="text-xs text-slate-500">Click any scenario to test the rule engine:</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_SAMPLES.map(sample => (
            <button
              key={sample.id}
              id={`preset-btn-${sample.id}`}
              onClick={() => handleSelectPreset(sample)}
              className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    sample.expectedStatus === 'COMPLIANT'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sample.expectedStatus === 'MINOR_VIOLATION'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {sample.badge}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-emerald-600 transition-colors">
                    Click to Test →
                  </span>
                </div>
                <div className="h-24 rounded-lg overflow-hidden relative bg-slate-100">
                  <img
                    src={sample.imageUrl}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {sample.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Section (2 Columns: Upload/Camera vs Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-700" />
                Product Packet Capture
              </h3>
              <span className="text-xs font-medium text-slate-500">Live Camera or File</span>
            </div>

            {/* Camera View or Preview Canvas */}
            <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden min-h-[260px] flex flex-col items-center justify-center p-4">
              {isCameraActive ? (
                <div className="w-full relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 border-2 border-emerald-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-4">
                    <span className="bg-slate-900/80 text-emerald-300 text-[11px] px-2 py-0.5 rounded self-start">
                      Target: MRP, Net Qty & Expiry Stamp
                    </span>
                    <div className="border border-emerald-400/40 w-3/4 h-24 mx-auto rounded"></div>
                    <span className="bg-slate-900/80 text-slate-300 text-[11px] px-2 py-0.5 rounded self-center">
                      Hold still for optimal OCR
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      id="btn-snap-camera"
                      type="button"
                      onClick={capturePhoto}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Camera className="w-4 h-4" />
                      Take Snapshot
                    </button>
                    <button
                      id="btn-cancel-camera"
                      type="button"
                      onClick={toggleCamera}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="w-full space-y-3">
                  <div className="relative h-56 w-full rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Scanned product label"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      id="btn-remove-image"
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md"
                    >
                      Change Photo
                    </button>
                  </div>
                  <p className="text-xs text-emerald-700 font-medium text-center flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Image loaded and ready for Metrology compliance audit
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Upload package label photo
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Supports PNG, JPG, WebP (Front panel, back label, or MRP stamp)
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      id="btn-browse-file"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                    >
                      Browse Files
                    </button>
                    <button
                      id="btn-start-camera"
                      type="button"
                      onClick={toggleCamera}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Use Camera
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-start gap-2">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Run Audit CTA Button */}
            <button
              id="btn-run-audit"
              type="button"
              disabled={isScanning}
              onClick={() => executeScan()}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing Legal Metrology Compliance...</span>
                </>
              ) : (
                <>
                  <Scale className="w-4 h-4" />
                  <span>Run Legal Metrology Compliance Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Mobile App Download Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 border border-emerald-800/40 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Download Mobile App</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-mono">
                    v2.6
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Scan retail packets directly on your phone
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Use your phone camera for live OCR barcode scanning, dual-MRP verification, and offline violation radar in stores.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-emerald-300" />
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                id="btn-scanner-open-download-page"
                type="button"
                onClick={() => onNavigateToDownload && onNavigateToDownload()}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Install App</span>
              </button>
              <button
                id="btn-scanner-copy-link"
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin || window.location.href);
                  alert('Mobile link copied! Paste it in Google Chrome on your phone to install.');
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-3 rounded-xl text-xs border border-white/20 transition-all cursor-pointer whitespace-nowrap"
                title="Copy link to paste in phone browser"
              >
                Copy Link
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-emerald-900/60 pt-2.5">
              <span>Android & iOS Compatible</span>
              <span className="text-emerald-400 font-medium">Free • No Store Account Needed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Scan Audit Results */}
        <div className="lg:col-span-7">
          {isScanning ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-6 min-h-[420px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin flex items-center justify-center"></div>
                <Scale className="w-8 h-8 text-emerald-700 absolute inset-0 m-auto" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-lg font-bold text-slate-900">
                  Inspecting Under Legal Metrology Rules 2011
                </h3>
                <p className="text-sm font-medium text-emerald-700 animate-pulse">
                  {scanStep}
                </p>
                <p className="text-xs text-slate-500">
                  Forensic check of MRP declarations, mandatory manufacturer address, USP calculation, net quantity, and deceptive gas slack-fill.
                </p>
              </div>
            </div>
          ) : scanResult ? (
            <div className="space-y-6">
              {/* Status Header Card */}
              <div
                className={`rounded-2xl border p-6 shadow-xs ${
                  scanResult.overallStatus === 'COMPLIANT'
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : scanResult.overallStatus === 'MINOR_VIOLATION'
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-rose-50/70 border-rose-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${
                          scanResult.overallStatus === 'COMPLIANT'
                            ? 'bg-emerald-600 text-white'
                            : scanResult.overallStatus === 'MINOR_VIOLATION'
                            ? 'bg-amber-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {scanResult.overallStatus === 'COMPLIANT' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        {scanResult.overallStatus.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Docket #{scanResult.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {scanResult.productName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Brand: <span className="font-semibold">{scanResult.brand}</span> • Category: {scanResult.category}
                    </p>
                  </div>

                  {/* Compliance Score Pill */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3 shrink-0 shadow-2xs">
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                        Metrology Score
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        {scanResult.complianceScore}
                        <span className="text-xs text-slate-500 font-normal">/100</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-sm bg-slate-50">
                      <span
                        className={
                          scanResult.complianceScore >= 80
                            ? 'text-emerald-700'
                            : scanResult.complianceScore >= 50
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }
                      >
                        {scanResult.complianceScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary & Fine Estimate */}
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {scanResult.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-600" />
                      <span>Statutory Fine Estimate: </span>
                      <span className="font-bold text-rose-700">
                        {scanResult.statutoryFineEstimate}
                      </span>
                    </div>
                    <div className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Legal Mandate: </span>
                      <span className="font-bold text-slate-900">
                        Legal Metrology Act, 2009 (Sec 36)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detected Violations Cards */}
              {scanResult.violations && scanResult.violations.length > 0 && (
                <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                    <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                      <ShieldAlert className="w-4.5 h-4.5 text-rose-600" />
                      Identified Statutory Violations ({scanResult.violations.length})
                    </h4>
                    <span className="text-xs bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded">
                      Actionable Under Law
                    </span>
                  </div>

                  <div className="space-y-3">
                    {scanResult.violations.map((violation, i) => (
                      <div
                        key={violation.id || i}
                        className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 space-y-2"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              {violation.ruleCited}
                            </span>
                            <span className="font-bold text-sm text-slate-900">
                              {violation.title}
                            </span>
                          </div>
                          <span className="text-xs text-slate-600 font-medium">
                            {violation.actSection}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {violation.description}
                        </p>
                        <div className="text-[11px] text-rose-800 font-medium pt-1 flex items-center gap-1">
                          <span>Statutory consequence: </span>
                          <span className="font-semibold">{violation.statutoryPenalty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8 Mandatory Declarations Checklist Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <FileCheck className="w-4.5 h-4.5 text-emerald-700" />
                      Rule 6 Mandatory Declarations Audit
                    </h4>
                    <p className="text-xs text-slate-500">
                      As mandated under Rule 6 of Legal Metrology (Packaged Commodities) Rules 2011
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(a) • Manufacturer / Packer Name & Address
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.manufacturerNameAndAddress || 'Not Found'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800 shrink-0">
                      PASS
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(b) • Generic or Common Commodity Name
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.genericCommodityName || 'Not Found'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800 shrink-0">
                      PASS
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(c) • Net Quantity in Standard Units (g, kg, ml, l)
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.netQuantity || 'Not Found'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800 shrink-0">
                      PASS
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(da) • Unit Sale Price (USP in ₹/g or ₹/ml)
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.unitSalePrice || 'Missing'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] shrink-0 ${
                        scanResult.extractedDetails.unitSalePrice?.toLowerCase().includes('missing')
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {scanResult.extractedDetails.unitSalePrice?.toLowerCase().includes('missing')
                        ? 'FAIL'
                        : 'PASS'}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(e) & 18(2) • Maximum Retail Price (MRP) & Dual Pricing
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.mrp || 'Not Found'}{' '}
                        {scanResult.extractedDetails.isDualMrpDetected && (
                          <span className="text-rose-600 font-bold">(Tampered / Dual MRP Sticker Detected)</span>
                        )}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] shrink-0 ${
                        scanResult.extractedDetails.isDualMrpDetected
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {scanResult.extractedDetails.isDualMrpDetected ? 'FAIL' : 'PASS'}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(d) • Date of Packing & Expiry / Best Before
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        Mfg: {scanResult.extractedDetails.mfgOrPackingDate || 'N/A'} • Exp:{' '}
                        {scanResult.extractedDetails.expiryOrBestBeforeDate || 'N/A'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800 shrink-0">
                      PASS
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 6(1)(n) • Consumer Care Contact (Email, Phone, Address)
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.consumerCareDetails || 'Not Found'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-100 text-emerald-800 shrink-0">
                      PASS
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        Rule 24 • Slack Fill & Deceptive Packaging Headspace
                      </span>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {scanResult.extractedDetails.isDeceptivePackagingSlackFill
                          ? 'Defective: Package headspace exceeds permissible tolerance (Excess gas cushioning)'
                          : 'Standard packaging volume ratio verified'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[11px] shrink-0 ${
                        scanResult.extractedDetails.isDeceptivePackagingSlackFill
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {scanResult.extractedDetails.isDeceptivePackagingSlackFill ? 'FAIL' : 'PASS'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="btn-goto-grievance"
                  type="button"
                  onClick={() => onNavigateToGrievance(scanResult)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Draft Formal Grievance for Metrology Officer</span>
                </button>

                <button
                  id="btn-goto-map"
                  type="button"
                  onClick={() => onNavigateToMap(scanResult)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>Pin Violation on All-India Store Map</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-4 min-h-[420px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Scale className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-base font-bold text-slate-800">
                  Ready for Compliance Inspection
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload a packet photograph, use your webcam, or select one of the quick test presets above to audit Legal Metrology compliance in real-time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
