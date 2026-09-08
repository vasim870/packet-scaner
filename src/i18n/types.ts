export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  scriptBadge: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', scriptBadge: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', scriptBadge: 'हि' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', scriptBadge: 'த' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', scriptBadge: 'తె' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', scriptBadge: 'বা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', scriptBadge: 'म' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', scriptBadge: 'ગુ' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', scriptBadge: 'ಕ' }
];
