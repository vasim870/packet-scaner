import { ScanPresetSample } from '../types';

export const PRESET_SAMPLES: ScanPresetSample[] = [
  {
    id: 'preset_cola_dualmrp',
    title: 'Cold Beverage Can (330ml)',
    subtitle: 'Dual MRP Sticker over factory price',
    category: 'Beverages',
    badge: 'Dual MRP Scam',
    expectedStatus: 'SEVERE_VIOLATION',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    presetData: {
      productName: 'Chilled Cola Fizz Can 330ml',
      brand: 'MegaFizz Beverages Ltd',
      complianceScore: 20,
      overallStatus: 'SEVERE_VIOLATION',
      statutoryFineEstimate: '₹25,000 spot fine (Sec 36)'
    }
  },
  {
    id: 'preset_chips_slackfill',
    title: 'Tangy Potato Chips (Pouch)',
    subtitle: '72% Gas Slack-Fill & Missing Unit Price',
    category: 'Snacks',
    badge: 'Deceptive Packaging',
    expectedStatus: 'SEVERE_VIOLATION',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    presetData: {
      productName: 'Crunchy Wave Potato Chips (Pouch)',
      brand: 'CrispCraze Snacks',
      complianceScore: 35,
      overallStatus: 'SEVERE_VIOLATION',
      statutoryFineEstimate: '₹25,000 to ₹50,000'
    }
  },
  {
    id: 'preset_imported_chocolate',
    title: 'Swiss Dark Cocoa Bar (100g)',
    subtitle: 'Imported without Indian Importer / Origin',
    category: 'Confectionery',
    badge: 'Missing Declarations',
    expectedStatus: 'MINOR_VIOLATION',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    presetData: {
      productName: 'Swiss Alpine Dark Cocoa Bar 100g',
      brand: 'Alpine Delights Zurich',
      complianceScore: 48,
      overallStatus: 'MINOR_VIOLATION',
      statutoryFineEstimate: '₹25,000 + Consignment Hold'
    }
  },
  {
    id: 'preset_gold_standard',
    title: 'Sunflower Cooking Oil (1L)',
    subtitle: '100% Compliant Benchmark Label',
    category: 'Edible Oils',
    badge: '100% Compliant',
    expectedStatus: 'COMPLIANT',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    presetData: {
      productName: 'SunGold Refined Sunflower Oil 1L Pouch',
      brand: 'SunGold AgriFoods',
      complianceScore: 98,
      overallStatus: 'COMPLIANT',
      statutoryFineEstimate: 'Nil (Fully Compliant)'
    }
  }
];
