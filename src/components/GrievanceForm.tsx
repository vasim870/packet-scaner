import React, { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  Printer,
  Copy,
  CheckCircle2,
  AlertCircle,
  Building2,
  ShieldCheck,
  Download,
  Scale,
  RefreshCw
} from 'lucide-react';
import { ProductScanResult, GrievanceDraft, StoreViolationReport } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface GrievanceFormProps {
  initialScanData?: ProductScanResult | null;
  initialStoreData?: StoreViolationReport | null;
}

export const GrievanceForm: React.FC<GrievanceFormProps> = ({ initialScanData, initialStoreData }) => {
  const { t } = useLanguage();
  const [petitionerName, setPetitionerName] = useState('Vasim Akram');
  const [petitionerEmail, setPetitionerEmail] = useState('dvasimakram870@gmail.com');
  const [petitionerPhone, setPetitionerPhone] = useState('+91 98480 12345');
  const [storeName, setStoreName] = useState('PVR Director\'s Cut Concessions');
  const [locality, setLocality] = useState('Connaught Place, New Delhi');
  const [productName, setProductName] = useState(initialScanData?.productName || 'Sparkling Water Can (330ml)');
  const [brand, setBrand] = useState(initialScanData?.brand || 'Himalayan Spring Bottlers');
  const [mrp, setMrp] = useState(initialScanData?.extractedDetails.mrp?.replace(/[^0-9.]/g, '') || '60');
  const [chargedPrice, setChargedPrice] = useState('120');
  const [notes, setNotes] = useState('Sticker was affixed over printed MRP of ₹60 demanding ₹120. When challenged, concession staff cited venue premium policy.');

  const [loading, setLoading] = useState(false);
  const [draftResult, setDraftResult] = useState<GrievanceDraft | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialStoreData) {
      setStoreName(initialStoreData.storeName);
      setLocality(`${initialStoreData.locality}, ${initialStoreData.city}`);
      setProductName(initialStoreData.productName);
      setBrand(initialStoreData.brand);
      if (initialStoreData.mrpPrinted) setMrp(String(initialStoreData.mrpPrinted));
      if (initialStoreData.priceCharged) setChargedPrice(String(initialStoreData.priceCharged));
      if (initialStoreData.userEvidenceNotes) setNotes(initialStoreData.userEvidenceNotes);
    } else if (initialScanData) {
      setProductName(initialScanData.productName);
      setBrand(initialScanData.brand);
      if (initialScanData.extractedDetails.mrp) {
        const cleaned = initialScanData.extractedDetails.mrp.replace(/[^0-9.]/g, '');
        if (cleaned) setMrp(cleaned);
      }
    }
  }, [initialScanData, initialStoreData]);

  const handleGenerateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        petitionerName,
        petitionerEmail,
        petitionerPhone,
        storeName,
        locality,
        productName,
        brand,
        mrp,
        chargedPrice,
        violationsList: initialScanData?.violations || [],
        additionalNotes: notes
      };

      const res = await fetch('/api/complaint/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.complaint) {
        setDraftResult(data.complaint);
      }
    } catch (err) {
      console.error('Failed to generate notice:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (draftResult?.noticeBody) {
      navigator.clipboard.writeText(draftResult.noticeBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              National Consumer Helpline (NCH 1915) & Legal Metrology
            </span>
            <span className="text-xs text-slate-500 font-medium">Department of Consumer Affairs</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            {t('grievanceHeader')}
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            {t('grievanceSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Scale className="w-4.5 h-4.5 text-emerald-700" />
              {t('petitionerDetails')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in the transaction details to draft the statutory complaint
            </p>
          </div>

          <form onSubmit={handleGenerateNotice} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Complainant Name *
                </label>
                <input
                  id="input-grievance-name"
                  type="text"
                  required
                  value={petitionerName}
                  onChange={e => setPetitionerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="input-grievance-phone"
                  type="text"
                  value={petitionerPhone}
                  onChange={e => setPetitionerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Complainant Email
              </label>
              <input
                id="input-grievance-email"
                type="email"
                value={petitionerEmail}
                onChange={e => setPetitionerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-1">
                Respondent Establishment (Store Name) *
              </label>
              <input
                id="input-grievance-store"
                type="text"
                required
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                placeholder="e.g. Inox Banjara Hills, Supermarket KPHB"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Store Locality & Address *
              </label>
              <input
                id="input-grievance-locality"
                type="text"
                required
                value={locality}
                onChange={e => setLocality(e.target.value)}
                placeholder="e.g. Road No. 1, Banjara Hills, Hyderabad"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Commodity Name *
                </label>
                <input
                  id="input-grievance-product"
                  type="text"
                  required
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Brand / Packer
                </label>
                <input
                  id="input-grievance-brand"
                  type="text"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Printed MRP (₹)
                </label>
                <input
                  id="input-grievance-mrp"
                  type="number"
                  value={mrp}
                  onChange={e => setMrp(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Amount Demanded / Charged (₹)
                </label>
                <input
                  id="input-grievance-charged"
                  type="number"
                  value={chargedPrice}
                  onChange={e => setChargedPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Transaction Evidence & Notes
              </label>
              <textarea
                id="textarea-grievance-notes"
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <button
              id="btn-generate-grievance-draft"
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Drafting Legal Notice...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>{t('generateNoticeBtn')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Notice Preview */}
        <div className="lg:col-span-7 space-y-4">
          {draftResult ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              {/* Header Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full">
                      Case Docket: {draftResult.complaintNumber}
                    </span>
                    <span className="text-xs text-slate-500">{draftResult.generatedDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mt-1">
                    Formal Legal Metrology Grievance Notice
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-notice"
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : t('copyNoticeBtn')}</span>
                  </button>
                  <button
                    id="btn-print-notice"
                    onClick={handlePrint}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t('printNoticeBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Printable Legal Notice Document Body */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-line space-y-4 max-h-[500px] overflow-y-auto">
                {draftResult.noticeBody}
              </div>

              {/* Direct Portal Submission Guide */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <h5 className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Direct Submission Channels
                </h5>
                <ul className="space-y-1 list-disc list-inside text-emerald-800 text-[11px]">
                  <li>
                    <strong>National Consumer Helpline:</strong> Call toll-free <strong>1915</strong> or register at consumerhelpline.gov.in (INGRAM).
                  </li>
                  <li>
                    <strong>Telangana Legal Metrology Department:</strong> Email to <strong>controller-lm@telangana.gov.in</strong> or lodge at consumer.telangana.gov.in.
                  </li>
                  <li>
                    <strong>WhatsApp Grievance:</strong> Send docket text & receipt photo to <strong>+91 88000 01915</strong>.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-3 min-h-[420px] flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                No Notice Generated Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Enter the retailer and product details on the left, then click "Generate Formal Notice" to produce an official complaint docket with exact Legal Metrology Act sections cited.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
