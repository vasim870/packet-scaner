/**
 * Types for Packaged Commodity Compliance Scanner (PCCS)
 * Legal Metrology (Packaged Commodities) Rules 2011 Compliance System
 */

export type SeverityLevel = 'compliant' | 'minor' | 'critical';

export interface ComplianceViolation {
  id: string;
  ruleCited: string; // e.g. "Rule 6(1)(da)", "Rule 18(2)", "Rule 24"
  actSection: string; // e.g. "Section 36(1) of Legal Metrology Act, 2009"
  title: string;
  description: string;
  severity: SeverityLevel;
  statutoryPenalty: string;
}

export interface ProductScanResult {
  id: string;
  timestamp: string;
  productName: string;
  brand: string;
  category: string;
  imageUrl?: string;
  complianceScore: number; // 0 - 100
  overallStatus: 'COMPLIANT' | 'MINOR_VIOLATION' | 'SEVERE_VIOLATION';
  summary: string;
  extractedDetails: {
    manufacturerNameAndAddress?: string;
    genericCommodityName?: string;
    netQuantity?: string;
    mfgOrPackingDate?: string;
    expiryOrBestBeforeDate?: string;
    mrp?: string;
    unitSalePrice?: string;
    consumerCareDetails?: string;
    countryOfOrigin?: string;
    batchNumber?: string;
    isDualMrpDetected?: boolean;
    isDeceptivePackagingSlackFill?: boolean;
  };
  rulesEvaluated: {
    rule: string;
    clause: string;
    status: 'PASS' | 'FAIL' | 'WARNING';
    notes: string;
  }[];
  violations: ComplianceViolation[];
  statutoryFineEstimate: string;
  consumerActionPlan: string[];
}

export interface StoreViolationReport {
  id: string;
  storeName: string;
  storeType: 'Supermarket' | 'Kirana' | 'Cinema / Multiplex' | 'Airport / Station Stall' | 'Pharmacy' | 'Bakery';
  locality: string;
  city: string;
  state?: string;
  zone?: 'North' | 'South' | 'West' | 'East' | 'Central';
  coordinates: {
    lat: number;
    lng: number;
  };
  productName: string;
  brand: string;
  mrpPrinted: number;
  priceCharged: number;
  violationType: 'Dual MRP / Overcharging' | 'Expired Goods' | 'Missing Unit Sale Price' | 'Slack Fill / Weight Discrepancy' | 'Missing Importer / Label Info';
  reportDate: string;
  status: 'PENDING_INSPECTION' | 'INSPECTOR_ASSIGNED' | 'NOTICE_ISSUED' | 'PENALIZED_RESOLVED';
  verificationCount: number;
  userEvidenceNotes: string;
  evidencePhotoUrl?: string;
}

export interface GrievanceDraft {
  complaintNumber: string;
  generatedDate: string;
  petitioner: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
  respondent: {
    storeName: string;
    locality: string;
    city: string;
    manufacturerOrBrand: string;
  };
  violations: ComplianceViolation[];
  legalClausesBreached: string[];
  demandedRelief: string[];
  noticeBody: string;
}

export interface ScanPresetSample {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  expectedStatus: 'COMPLIANT' | 'MINOR_VIOLATION' | 'SEVERE_VIOLATION';
  imageUrl: string;
  presetData: Partial<ProductScanResult>;
}
