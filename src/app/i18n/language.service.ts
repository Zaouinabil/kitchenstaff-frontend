import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Language, TRANSLATIONS, TranslationKey } from './translations';

const STORAGE_KEY = 'kitchenstaff.language';
const LOCALES: Record<Language, string> = { fr: 'fr-BE', en: 'en-GB', nl: 'nl-BE' };
const STATUS_KEYS: Record<string, TranslationKey> = {
  A_FAIRE: 'common.status.todo',
  EN_COURS: 'common.status.inProgress',
  TERMINEE: 'common.status.completed',
  ANNULEE: 'common.status.cancelled'
};
const PRIORITY_KEYS: Record<string, TranslationKey> = {
  BASSE: 'common.priority.low',
  NORMALE: 'common.priority.normal',
  HAUTE: 'common.priority.high',
  URGENTE: 'common.priority.urgent'
};
const ROLE_KEYS: Record<string, TranslationKey> = {
  ADMIN: 'common.role.admin',
  CHEF: 'common.role.chef',
  COMMIS: 'common.role.commis'
};

function isLanguage(value: unknown): value is Language {
  return value === 'fr' || value === 'en' || value === 'nl';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly currentLanguage = signal<Language>(this.readLanguage());
  readonly language = this.currentLanguage.asReadonly();

  constructor() {
    this.document.documentElement.lang = this.language();
  }

  setLanguage(language: string): void {
    if (!isLanguage(language)) return;

    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }

  t(key: TranslationKey | '' | undefined, params: Record<string, string | number> = {}): string {
    if (!key) return '';
    const text = TRANSLATIONS[this.language()][key] ?? TRANSLATIONS.fr[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (placeholder: string, name: string) =>
      Object.hasOwn(params, name) ? String(params[name]) : placeholder
    );
  }

  statusLabel(code: string): string {
    return Object.hasOwn(STATUS_KEYS, code) ? this.t(STATUS_KEYS[code]) : code;
  }

  priorityLabel(code: string): string {
    return Object.hasOwn(PRIORITY_KEYS, code) ? this.t(PRIORITY_KEYS[code]) : code;
  }

  roleLabel(code: string): string {
    return Object.hasOwn(ROLE_KEYS, code) ? this.t(ROLE_KEYS[code]) : code;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat(LOCALES[this.language()], { maximumFractionDigits: 20 }).format(value);
  }

  private readLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isLanguage(stored) ? stored : 'fr';
    } catch {
      return 'fr';
    }
  }
}
