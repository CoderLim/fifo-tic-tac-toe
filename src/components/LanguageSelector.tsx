'use client';

import { Language, languageNames } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages: Language[] = ['zh', 'en', 'ja', 'ko', 'pt', 'es'];

  return (
    <div className="relative w-full">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="appearance-none w-full bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 
                   px-4 py-2.5 pr-10 rounded-xl border border-slate-600 shadow-lg
                   hover:border-cyan-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                   transition-all duration-300 cursor-pointer font-semibold"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang} className="bg-slate-900">
            {languageNames[lang]}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

