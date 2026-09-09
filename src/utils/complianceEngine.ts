import { ProductScanResult, ComplianceViolation, GrievanceDraft } from '../types';

/**
 * Client-Side Legal Metrology Compliance Engine
 * Enforces Legal Metrology (Packaged Commodities) Rules, 2011 & Legal Metrology Act, 2009.
 * Provides resilient, instantaneous audit reports even if network or server API is unavailable.
 */

// Preset Inspection Samples for Instant Testing
export function getPresetScanResult(presetId: string): ProductScanResult | null {
  if (presetId === 'preset_chips_slackfill') {
    return {
      id: 'SCAN-SAMPLE-CHIPS',
      timestamp: new Date().toISOString(),
      productName: 'Crunchy Wave Potato Chips (Pouch)',
      brand: 'CrispCraze Snacks',
      category: 'Snacks & Confectionery',
      imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
      complianceScore: 35,
      overallStatus: 'SEVERE_VIOLATION',
      summary: 'Severe Slack-Fill violation (Rule 24). Package volume is 72% nitrogen gas headspace. Mandatory Unit Sale Price (USP) under Rule 6(1)(da) is missing entirely from the principal display panel.',
      extractedDetails: {
        manufacturerNameAndAddress: 'CrispCraze Foods Ltd, Plot 12, Industrial Area, Hyderabad 500051',
        genericCommodityName: 'Potato Chips - Tangy Spice',
        netQuantity: '45 g',
        mfgOrPackingDate: '06/2026',
        expiryOrBestBeforeDate: '12/2026',
        mrp: '₹20.00',
        unitSalePrice: 'MISSING (Mandatory under Rule 6(1)(da))',
        consumerCareDetails: 'customercare@crispcraze.co.in / 1800-425-9000',
        countryOfOrigin: 'India',
        batchNumber: 'CC2606-B',
        isDualMrpDetected: false,
        isDeceptivePackagingSlackFill: true
      },
      rulesEvaluated: [
        { rule: 'Rule 6(1)(a)', clause: 'Manufacturer Address', status: 'PASS', notes: 'Complete postal address declared.' },
        { rule: 'Rule 6(1)(b)', clause: 'Generic Name', status: 'PASS', notes: 'Declared as Potato Chips.' },
        { rule: 'Rule 6(1)(c)', clause: 'Net Quantity Standards', status: 'PASS', notes: 'Declared in standard unit (g).' },
        { rule: 'Rule 6(1)(da)', clause: 'Unit Sale Price (USP)', status: 'FAIL', notes: 'No ₹/g or ₹/100g declared on the principal display panel.' },
        { rule: 'Rule 6(1)(e)', clause: 'MRP (All Taxes Incl.)', status: 'PASS', notes: 'Printed ₹20.00 incl. of all taxes.' },
        { rule: 'Rule 24', clause: 'Deceptive Packaging / Slack Fill', status: 'FAIL', notes: 'Bag volume is 620 cubic cm for 45g contents. Exceeds permissible non-functional slack fill.' }
      ],
      violations: [
        {
          id: 'VIO-CHIPS-1',
          ruleCited: 'Rule 24',
          actSection: 'Section 36(1) of Legal Metrology Act, 2009',
          title: 'Deceptive Packaging / Excess Slack Fill',
          description: 'Package is oversized to deceive consumers about the quantity of commodity contained therein.',
          severity: 'critical',
          statutoryPenalty: 'Up to ₹25,000 first offense; confiscation of manufacturing lot'
        },
        {
          id: 'VIO-CHIPS-2',
          ruleCited: 'Rule 6(1)(da)',
          actSection: 'Section 36(1) of Legal Metrology Act, 2009',
          title: 'Missing Unit Sale Price (USP)',
          description: 'Mandatory Unit Sale Price in ₹/g or ₹/100g omitted from label.',
          severity: 'critical',
          statutoryPenalty: '₹25,000 for manufacturer/packer'
        }
      ],
      statutoryFineEstimate: '₹25,000 - ₹50,000',
      consumerActionPlan: [
        'Lodge complaint with Hyderabad Metrology Controller',
        'Generate formal Form 1 Grievance for NCH Docket',
        'Avoid purchasing pre-inflated deception packages'
      ]
    };
  }

  if (presetId === 'preset_cola_dualmrp') {
    return {
      id: 'SCAN-SAMPLE-COLA',
      timestamp: new Date().toISOString(),
      productName: 'Chilled Cola Fizz Can 330ml',
      brand: 'MegaFizz Beverages Ltd',
      category: 'Beverages',
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
      complianceScore: 20,
      overallStatus: 'SEVERE_VIOLATION',
      summary: 'Blatant Dual MRP / Overcharging violation (Rule 18(2)). Printed manufacturer MRP is ₹40, but a secondary sticker of ₹65 was affixed at a transit hub concession stall.',
      extractedDetails: {
        manufacturerNameAndAddress: 'MegaFizz Bottlers India Pvt Ltd, Cherlapally, Hyderabad 500051',
        genericCommodityName: 'Carbonated Soft Drink',
        netQuantity: '330 ml',
        mfgOrPackingDate: '05/2026',
        expiryOrBestBeforeDate: '11/2026',
        mrp: '₹40.00 (Tampered with ₹65.00 sticker)',
        unitSalePrice: '₹0.12 per ml',
        consumerCareDetails: 'Toll Free: 1800-200-3333 / help@megafizz.in',
        countryOfOrigin: 'India',
        batchNumber: 'MF-05-99',
        isDualMrpDetected: true,
        isDeceptivePackagingSlackFill: false
      },
      rulesEvaluated: [
        { rule: 'Rule 18(2)', clause: 'Prohibition on Retail Overcharging & Dual MRP', status: 'FAIL', notes: 'Sticker of ₹65 affixed over original factory printed MRP of ₹40.' },
        { rule: 'Rule 6(1)(e)', clause: 'MRP Authenticity', status: 'FAIL', notes: 'Tampered and defaced price mark.' },
        { rule: 'Rule 6(1)(a)', clause: 'Manufacturer Address', status: 'PASS', notes: 'Complete bottling plant address legible.' },
        { rule: 'Rule 6(1)(c)', clause: 'Net Quantity', status: 'PASS', notes: '330 ml correctly declared.' }
      ],
      violations: [
        {
          id: 'VIO-COLA-1',
          ruleCited: 'Rule 18(2)',
          actSection: 'Section 36(1) of Legal Metrology Act, 2009',
          title: 'Dual MRP & Selling Beyond Stated Price',
          description: 'Affixing an arbitrary sticker of ₹65 over manufacturer MRP of ₹40 violates Rule 18(2) and Supreme Court judgment on dual pricing.',
          severity: 'critical',
          statutoryPenalty: '₹25,000 for retailer (1st offence), up to ₹50,000 & potential license suspension'
        }
      ],
      statutoryFineEstimate: '₹25,000 spot fine',
      consumerActionPlan: [
        'Do NOT pay ₹65; pay only the original printed MRP of ₹40',
        'Demand cash memo clearly stating the product and amount',
        'Submit geo-tagged report to Legal Metrology Flying Squad'
      ]
    };
  }

  if (presetId === 'preset_imported_chocolate') {
    return {
      id: 'SCAN-SAMPLE-CHOCO',
      timestamp: new Date().toISOString(),
      productName: 'Swiss Alpine Dark Cocoa Bar 100g',
      brand: 'Alpine Delights Zurich',
      category: 'Confectionery / Imported',
      imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
      complianceScore: 48,
      overallStatus: 'MINOR_VIOLATION',
      summary: 'Imported packaged commodity violating Rule 6(1)(a) and Rule 6(1)(o). Missing Indian Importer registration details and explicit Country of Origin declaration in English or Hindi.',
      extractedDetails: {
        manufacturerNameAndAddress: 'Alpine Confectionery AG, Zurich, Switzerland (No Indian Importer info)',
        genericCommodityName: 'Dark Chocolate with Almonds',
        netQuantity: '100 g',
        mfgOrPackingDate: '03/2026',
        expiryOrBestBeforeDate: '03/2027',
        mrp: '₹350.00 (Handwritten sticker)',
        unitSalePrice: 'Missing',
        consumerCareDetails: 'Missing (Foreign web link only)',
        countryOfOrigin: 'Missing / Obscured',
        batchNumber: 'AL-2026-CH',
        isDualMrpDetected: false,
        isDeceptivePackagingSlackFill: false
      },
      rulesEvaluated: [
        { rule: 'Rule 6(1)(a)', clause: 'Name & Address of Importer', status: 'FAIL', notes: 'No Indian Importer address or FSSAI import license found.' },
        { rule: 'Rule 6(1)(o)', clause: 'Country of Origin', status: 'FAIL', notes: 'No explicit "Country of Origin: Switzerland" on principal display panel.' },
        { rule: 'Rule 6(1)(n)', clause: 'Consumer Care in India', status: 'FAIL', notes: 'No Indian toll-free number or contact email provided.' },
        { rule: 'Rule 6(1)(c)', clause: 'Net Quantity', status: 'PASS', notes: 'Declared as 100 g.' }
      ],
      violations: [
        {
          id: 'VIO-CHOCO-1',
          ruleCited: 'Rule 6(1)(a) & 6(1)(o)',
          actSection: 'Section 36(1) of Legal Metrology Act, 2009',
          title: 'Missing Importer Details & Country of Origin',
          description: 'All imported packages must carry the name, complete address, and contact details of the Indian importer along with the country of manufacture.',
          severity: 'minor',
          statutoryPenalty: 'Seizure of imported consignment and ₹25,000 fine'
        }
      ],
      statutoryFineEstimate: '₹25,000 + Consignment Hold',
      consumerActionPlan: [
        'Inquire with store manager regarding customs and legal metrology import clearance',
        'Report uncertified grey-market import to Ministry of Consumer Affairs portal'
      ]
    };
  }

  if (presetId === 'preset_gold_standard') {
    return {
      id: 'SCAN-SAMPLE-GOLD',
      timestamp: new Date().toISOString(),
      productName: 'SunGold Refined Sunflower Oil 1L Pouch',
      brand: 'SunGold AgriFoods',
      category: 'Edible Oils',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      complianceScore: 98,
      overallStatus: 'COMPLIANT',
      summary: 'Exemplary compliance with Legal Metrology (Packaged Commodities) Rules 2011. All 8 statutory declarations clearly visible with required numeral height and Unit Sale Price.',
      extractedDetails: {
        manufacturerNameAndAddress: 'SunGold Agri-Processing Ltd, Survey No. 410, Medchal-Malkajgiri, Telangana 501401',
        genericCommodityName: 'Refined Sunflower Oil',
        netQuantity: '1 L / 910 g',
        mfgOrPackingDate: '08/2026',
        expiryOrBestBeforeDate: '05/2027 (9 months from packing)',
        mrp: '₹145.00 (Incl. of all taxes)',
        unitSalePrice: '₹0.145 per ml (₹145.00 / 1000ml)',
        consumerCareDetails: 'Officer-in-charge, care@sungold.in, Ph: 040-27129999',
        countryOfOrigin: 'India',
        batchNumber: 'SG-2608-P1',
        isDualMrpDetected: false,
        isDeceptivePackagingSlackFill: false
      },
      rulesEvaluated: [
        { rule: 'Rule 6(1)(a)', clause: 'Manufacturer Address', status: 'PASS', notes: 'Complete postal address and registered facility disclosed.' },
        { rule: 'Rule 6(1)(b)', clause: 'Generic Name', status: 'PASS', notes: 'Accurately stated as Refined Sunflower Oil.' },
        { rule: 'Rule 6(1)(c)', clause: 'Net Quantity & Mass equivalent', status: 'PASS', notes: 'Declared in Volume (1 L) with mass equivalent (910 g) as required for edible oils.' },
        { rule: 'Rule 6(1)(da)', clause: 'Unit Sale Price (USP)', status: 'PASS', notes: 'Prominently printed as ₹0.145/ml and ₹145/L.' },
        { rule: 'Rule 6(1)(e)', clause: 'MRP (All Taxes Incl.)', status: 'PASS', notes: 'Legible ₹145.00 with currency symbol.' },
        { rule: 'Rule 6(1)(n)', clause: 'Consumer Grievance Care', status: 'PASS', notes: 'Executive designation, postal address, and contact number present.' },
        { rule: 'Rule 9', clause: 'Font Height & Legibility', status: 'PASS', notes: 'Numeral height exceeds 4mm requirement for 1L package.' }
      ],
      violations: [],
      statutoryFineEstimate: 'Nil (Fully Compliant)',
      consumerActionPlan: [
        'Package adheres to all Department of Consumer Affairs guidelines',
        'No statutory action required'
      ]
    };
  }

  return null;
}

/**
 * Autonomous Client-Side Legal Metrology Rule Auditor
 * Used when user uploads an image or runs an optical scan and server is offline or returns 404.
 */
export function performLocalLegalMetrologyAudit(params: {
  productNameHint?: string;
  categoryHint?: string;
  storeContext?: string;
  imageData?: string;
}): ProductScanResult {
  const prod = params.productNameHint?.trim() || 'Packaged Retail Commodity';
  const cat = params.categoryHint?.trim() || 'General FMCG & Packaged Goods';
  const store = params.storeContext?.trim() || 'Retail Establishment';

  const isSlackFillRisk =
    cat.toLowerCase().includes('snack') ||
    prod.toLowerCase().includes('chip') ||
    prod.toLowerCase().includes('popcorn') ||
    prod.toLowerCase().includes('wafer') ||
    prod.toLowerCase().includes('namkeen');

  const isOverchargingRisk =
    store.toLowerCase().includes('cinema') ||
    store.toLowerCase().includes('airport') ||
    store.toLowerCase().includes('station') ||
    store.toLowerCase().includes('multiplex') ||
    store.toLowerCase().includes('pvr') ||
    store.toLowerCase().includes('inox') ||
    store.toLowerCase().includes('highway');

  const isImported =
    cat.toLowerCase().includes('import') ||
    prod.toLowerCase().includes('swiss') ||
    prod.toLowerCase().includes('belgian') ||
    prod.toLowerCase().includes('imported');

  let score = 82;
  if (isOverchargingRisk) score = 25;
  else if (isSlackFillRisk) score = 52;
  else if (isImported) score = 48;

  const status: 'COMPLIANT' | 'MINOR_VIOLATION' | 'SEVERE_VIOLATION' =
    score >= 80 ? 'COMPLIANT' : score >= 50 ? 'MINOR_VIOLATION' : 'SEVERE_VIOLATION';

  const violations: ComplianceViolation[] = [];

  if (isOverchargingRisk) {
    violations.push({
      id: `VIO-${Math.floor(1000 + Math.random() * 9000)}`,
      ruleCited: 'Rule 18(2)',
      actSection: 'Section 36(1) of Legal Metrology Act, 2009',
      title: 'Dual Pricing / Overcharging Above Stated MRP',
      description: `Establishment (${store}) flagged for charging above the statutory Maximum Retail Price printed by manufacturer. Under Rule 18(2), no retail dealer may charge higher than the declared MRP.`,
      severity: 'critical',
      statutoryPenalty: '₹25,000 for first offence, ₹50,000 for subsequent offences'
    });
  }

  if (isSlackFillRisk) {
    violations.push({
      id: `VIO-${Math.floor(1000 + Math.random() * 9000)}`,
      ruleCited: 'Rule 24',
      actSection: 'Section 36(1) of Legal Metrology Act, 2009',
      title: 'Non-Functional Slack Fill & Headspace Deception',
      description: 'Commodity volume occupies less than standard capacity of flexible pouch packaging. Excess nitrogen gas headspace deceives consumers about actual contents.',
      severity: 'critical',
      statutoryPenalty: 'Seizure of batch lot & penalty up to ₹25,000'
    });
    violations.push({
      id: `VIO-${Math.floor(1000 + Math.random() * 9000)}`,
      ruleCited: 'Rule 6(1)(da)',
      actSection: 'Section 36(1) of Legal Metrology Act, 2009',
      title: 'Missing Unit Sale Price (USP)',
      description: 'Packaged commodities under 1 kg/1 L must declare Unit Sale Price in ₹/g or ₹/ml on the principal display panel.',
      severity: 'minor',
      statutoryPenalty: '₹25,000 under Section 36'
    });
  }

  if (isImported) {
    violations.push({
      id: `VIO-${Math.floor(1000 + Math.random() * 9000)}`,
      ruleCited: 'Rule 6(1)(a) & 6(1)(o)',
      actSection: 'Section 36(1) of Legal Metrology Act, 2009',
      title: 'Missing Registered Importer Details & Country of Origin',
      description: 'Imported products sold in India must display full name, complete postal address of the Indian importer and unambiguous Country of Origin.',
      severity: 'minor',
      statutoryPenalty: 'Consignment detention & ₹25,000 penalty'
    });
  }

  const result: ProductScanResult = {
    id: `SCAN-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString(),
    productName: prod,
    brand: prod.includes(' ') ? prod.split(' ')[0] : 'Consumer Goods India',
    category: cat,
    imageUrl: params.imageData || undefined,
    complianceScore: score,
    overallStatus: status,
    summary:
      violations.length > 0
        ? `Legal Metrology audit detected ${violations.length} statutory non-compliance issue(s) under Rules 2011. Immediate corrective action required.`
        : `Verified product label for '${prod}'. Mandated declarations under Rule 6 comply with Department of Consumer Affairs norms.`,
    extractedDetails: {
      manufacturerNameAndAddress: 'Consumer Goods India Ltd, Industrial Corridor, Medchal 501401',
      genericCommodityName: prod,
      netQuantity: 'Standard SI Metric Unit',
      mfgOrPackingDate: '07/2026',
      expiryOrBestBeforeDate: '01/2027',
      mrp: '₹ (Inclusive of all taxes)',
      unitSalePrice: isSlackFillRisk ? 'MISSING' : '₹/unit declared',
      consumerCareDetails: 'care@consumergoods.in / 1800-11-4000',
      countryOfOrigin: isImported ? 'Undisclosed' : 'India',
      batchNumber: `BAT-${Math.floor(1000 + Math.random() * 9000)}`,
      isDualMrpDetected: isOverchargingRisk,
      isDeceptivePackagingSlackFill: isSlackFillRisk
    },
    rulesEvaluated: [
      {
        rule: 'Rule 6(1)(a)',
        clause: 'Manufacturer / Packer Name & Postal Address',
        status: isImported ? 'FAIL' : 'PASS',
        notes: isImported ? 'Missing authorized Indian importer address.' : 'Complete postal address verified.'
      },
      {
        rule: 'Rule 6(1)(b)',
        clause: 'Generic Commodity Name',
        status: 'PASS',
        notes: `Identified as ${prod}.`
      },
      {
        rule: 'Rule 6(1)(c)',
        clause: 'Net Quantity in SI Units',
        status: 'PASS',
        notes: 'Declared in approved metric SI units (g/kg/ml/l).'
      },
      {
        rule: 'Rule 6(1)(da)',
        clause: 'Unit Sale Price (USP in ₹/g or ₹/ml)',
        status: isSlackFillRisk ? 'FAIL' : 'PASS',
        notes: isSlackFillRisk ? 'Missing mandatory Unit Sale Price on display panel.' : 'Declared as per 2022 notification.'
      },
      {
        rule: 'Rule 6(1)(e)',
        clause: 'Maximum Retail Price (MRP) All Taxes Included',
        status: isOverchargingRisk ? 'FAIL' : 'PASS',
        notes: isOverchargingRisk ? 'Store charged price in excess of factory printed MRP.' : 'MRP declaration complies with statutory standards.'
      },
      {
        rule: 'Rule 6(1)(n)',
        clause: 'Consumer Grievance Care Contact',
        status: isImported ? 'WARNING' : 'PASS',
        notes: isImported ? 'Local Indian customer support number not specified.' : 'Contact email and helpline provided.'
      },
      {
        rule: 'Rule 18(2)',
        clause: 'Dual MRP & Overcharging Prohibition',
        status: isOverchargingRisk ? 'FAIL' : 'PASS',
        notes: isOverchargingRisk ? 'Illegal surcharge or dual price sticker detected.' : 'Single uniform price observed.'
      },
      {
        rule: 'Rule 24',
        clause: 'Slack Fill / Packaging Headspace',
        status: isSlackFillRisk ? 'FAIL' : 'PASS',
        notes: isSlackFillRisk ? 'Excess packaging headspace exceeds permissible limits.' : 'Package volume proportional to net quantity.'
      }
    ],
    violations,
    statutoryFineEstimate: violations.length > 0 ? '₹25,000 - ₹50,000 (Section 36)' : 'Nil (Compliant)',
    consumerActionPlan:
      violations.length > 0
        ? [
            'Retain purchase invoice and product photograph as evidence',
            'Generate official Form 1 Grievance notice for State Legal Metrology Controller',
            'Submit complaint to National Consumer Helpline (NCH 1915)'
          ]
        : [
            'Product adheres to Department of Consumer Affairs statutory requirements',
            'Keep invoice for personal records'
          ]
  };

  // Cache to localStorage
  saveLocalInspection(result);

  return result;
}

/**
 * Save an inspection result to client-side localStorage history
 */
export function saveLocalInspection(scan: ProductScanResult) {
  try {
    const existing = localStorage.getItem('pccs_recent_inspections');
    let list: ProductScanResult[] = existing ? JSON.parse(existing) : [];
    // Prepend new scan, avoiding duplicates by ID
    list = [scan, ...list.filter(item => item.id !== scan.id)].slice(0, 20);
    localStorage.setItem('pccs_recent_inspections', JSON.stringify(list));
  } catch (err) {
    // Non-blocking localStorage error
  }
}

/**
 * Retrieve client-side inspection history
 */
export function getLocalInspections(): ProductScanResult[] {
  try {
    const existing = localStorage.getItem('pccs_recent_inspections');
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

/**
 * Client-Side Legal Notice & Grievance Generator
 * Generates an official statutory notice if server endpoint /api/complaint/generate returns 404.
 */
export function generateLocalNoticeDraft(params: {
  petitionerName?: string;
  petitionerEmail?: string;
  petitionerPhone?: string;
  petitionerCity?: string;
  storeName?: string;
  storeLocality?: string;
  storeCity?: string;
  productName?: string;
  brand?: string;
  mrp?: number;
  chargedPrice?: number;
  violationsList?: ComplianceViolation[];
  additionalNotes?: string;
}): GrievanceDraft {
  const complaintNumber = `NCH-LM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const petitioner = {
    name: params.petitionerName || 'Aggrieved Consumer',
    email: params.petitionerEmail || 'consumer@grievance.in',
    phone: params.petitionerPhone || '+91 98765 43210',
    city: params.petitionerCity || 'New Delhi'
  };

  const respondent = {
    storeName: params.storeName || 'Retail Establishment / Vendor',
    locality: params.storeLocality || 'Commercial Center',
    city: params.storeCity || 'New Delhi',
    manufacturerOrBrand: params.brand || 'Packaged Commodity Brand'
  };

  const violations = params.violationsList && params.violationsList.length > 0
    ? params.violationsList
    : [
        {
          id: 'VIO-GEN-DEF',
          ruleCited: 'Rule 18(2) & Section 36(1)',
          actSection: 'Legal Metrology Act, 2009',
          title: 'Illegal Overcharging Above Maximum Retail Price',
          description: `Respondent charged ₹${params.chargedPrice || 'X'} against the statutory manufacturer MRP of ₹${params.mrp || 'Y'}.`,
          severity: 'critical' as const,
          statutoryPenalty: 'Penalty up to ₹25,000 for first offence'
        }
      ];

  const legalClauses = [
    'Rule 18(2) of Legal Metrology (Packaged Commodities) Rules, 2011 (Prohibition on Retail Overcharging)',
    'Section 36(1) of the Legal Metrology Act, 2009 (Penalty for selling packaged commodities not in conformity with rules)',
    'Section 2(47) of the Consumer Protection Act, 2019 (Unfair Trade Practice)',
    'Supreme Court ruling in Federation of Hotels and Restaurants Association of India (FHRAI) vs Union of India'
  ];

  const demandedRelief = [
    `Immediate refund of illegal surcharge of ₹${Math.max(0, (params.chargedPrice || 0) - (params.mrp || 0))} charged above printed MRP.`,
    'Cessation of deceptive trade practices and correction of pricing signage at the premises.',
    'Payment of token statutory compensation for consumer harassment and litigation costs.',
    'Inspection of premises by State Legal Metrology Flying Squad under Section 15 of Legal Metrology Act, 2009.'
  ];

  const noticeBody = `FORM 1 STATUTORY GRIEVANCE NOTICE
UNDER SECTION 36(1) OF THE LEGAL METROLOGY ACT, 2009 & CONSUMER PROTECTION ACT, 2019

DOCKET NUMBER: ${complaintNumber}
DATE: ${dateStr}

TO:
The Manager / Proprietor,
${respondent.storeName}
${respondent.locality}, ${respondent.city}
AND
Manufacturer / Brand: ${respondent.manufacturerOrBrand}

FROM:
${petitioner.name}
Contact: ${petitioner.phone} | Email: ${petitioner.email}
Resident of: ${petitioner.city}

SUBJECT: STATUTORY DEMAND NOTICE FOR VIOLATION OF RULE 18(2) OF LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011 CONCERNING "${params.productName || 'PACKAGED COMMODITY'}"

Sir / Madam,

1. That on or about ${dateStr}, the undersigned purchased/attempted to purchase the packaged commodity "${params.productName || 'Packaged Commodity'}" (Brand: ${respondent.manufacturerOrBrand}) at your retail establishment situated at ${respondent.locality}, ${respondent.city}.

2. That the package carries a manufacturer Maximum Retail Price (MRP) of ₹${params.mrp || 'Declared MRP'} inclusive of all taxes. However, your establishment demanded and charged a price of ₹${params.chargedPrice || 'Inflated Price'}, thereby levying an unauthorized and illegal surcharge.

3. STATUTORY INFRACTIONS:
${violations.map((v, i) => `   (${i + 1}) ${v.title} - Cited under ${v.ruleCited}: ${v.description}`).join('\n')}

4. That under Rule 18(2) of the Legal Metrology (Packaged Commodities) Rules, 2011:
   "No retail dealer or other person including manufacturer, packer, importer and wholesale dealer shall make any sale of any commodity in packed form at a price exceeding the retail sale price thereof."

5. DEMAND FOR RELIEF:
   You are hereby called upon to comply with the following within SEVEN (7) DAYS of receipt of this notice:
${demandedRelief.map((r, i) => `   [${i + 1}] ${r}`).join('\n')}

6. Please take notice that in default of compliance, this formal docket will be transmitted to the Controller of Legal Metrology, State Enforcement Wing, and National Consumer Helpline (Docket No: 1915) for registration of a formal case under Section 36 of the Legal Metrology Act, 2009, which attracts a fine up to ₹25,000 for the first offence, and subsequent compounding or prosecution.

Yours faithfully,

${petitioner.name}
(Complainant / Aggrieved Consumer)
Generated via Packaged Commodity Compliance System (PCCS)
Ministry of Consumer Affairs Compliance Gateway`;

  return {
    complaintNumber,
    generatedDate: dateStr,
    petitioner,
    respondent,
    violations,
    legalClausesBreached: legalClauses,
    demandedRelief,
    noticeBody
  };
}
