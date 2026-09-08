import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full' | 'pill';
  className?: string;
  id?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  className = '',
  id = 'language-selector'
}) => {
  const { language, setLanguage, languages, currentLanguageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {variant === 'pill' ? (
        <button
          id={`${id}-btn-pill`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Select language"
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 whitespace-nowrap"
          title="Change language / भाषा बदलें"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{currentLanguageInfo.nativeName}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : variant === 'full' ? (
        <button
          id={`${id}-btn-full`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Select language"
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700"
          title="Change language / भाषा बदलें"
        >
          <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{currentLanguageInfo.nativeName}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <button
          id={`${id}-btn-compact`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Select language"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 border border-slate-700 active:scale-95 transition-all cursor-pointer"
          title="Change language / भाषा बदलें"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-bold">{currentLanguageInfo.scriptBadge}</span>
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-emerald-500 font-mono">8 Languages</span>
          </div>

          <div className="max-h-64 overflow-y-auto py-1 divide-y divide-slate-100/50 dark:divide-slate-800/50">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  id={`lang-opt-${lang.code}`}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold flex items-center justify-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {lang.scriptBadge}
                    </span>
                    <div>
                      <div className="text-xs">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{lang.name}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
