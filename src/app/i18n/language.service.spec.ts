import { TestBed } from '@angular/core/testing';
import { createTestStorage } from '../../testing/local-storage';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from './translations';

describe('LanguageService', () => {
  let originalDocumentLanguage: string;

  beforeEach(() => {
    originalDocumentLanguage = document.documentElement.lang;
    vi.stubGlobal('localStorage', createTestStorage());
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.documentElement.lang = originalDocumentLanguage;
  });

  it.each([null, 'de', 'EN', ''])('falls back to French for preference %s', (preference) => {
    if (preference !== null) localStorage.setItem('kitchenstaff.language', preference);
    const service = TestBed.inject(LanguageService);

    expect(service.language()).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
    expect(service.t('common.language')).toBe('Langue');
  });

  it.each(['en', 'nl'] as const)('restores %s from storage in a new application instance', (language) => {
    const initialService = TestBed.inject(LanguageService);
    initialService.setLanguage(language);
    expect(localStorage.getItem('kitchenstaff.language')).toBe(language);

    // Recreate the injector while retaining storage, as a reload would do.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    document.documentElement.lang = 'fr';
    const reloadedService = TestBed.inject(LanguageService);

    expect(reloadedService).not.toBe(initialService);
    expect(reloadedService.language()).toBe(language);
    expect(document.documentElement.lang).toBe(language);
    expect(reloadedService.t('common.language')).toBe(language === 'en' ? 'Language' : 'Taal');
  });

  it('ignores an unsupported selection without replacing the saved preference', () => {
    const service = TestBed.inject(LanguageService);
    service.setLanguage('nl');
    service.setLanguage('de');

    expect(service.language()).toBe('nl');
    expect(localStorage.getItem('kitchenstaff.language')).toBe('nl');
    expect(document.documentElement.lang).toBe('nl');
  });

  it('still starts and switches languages when browser storage is unavailable', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });

    const service = TestBed.inject(LanguageService);
    expect(service.language()).toBe('fr');
    expect(() => service.setLanguage('en')).not.toThrow();
    expect(service.language()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('provides a non-empty translation and the same placeholders for every language key', () => {
    const frenchKeys = Object.keys(TRANSLATIONS.fr).sort();
    const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)]
      .map((match) => match[1]).sort();

    for (const language of ['en', 'nl'] as const) {
      expect(Object.keys(TRANSLATIONS[language]).sort()).toEqual(frenchKeys);
      for (const key of frenchKeys as Array<keyof typeof TRANSLATIONS.fr>) {
        const translated = TRANSLATIONS[language][key];
        expect(translated.trim(), `${language}: ${key}`).not.toBe('');
        expect(placeholders(translated), `${language}: ${key}`)
          .toEqual(placeholders(TRANSLATIONS.fr[key]));
      }
    }
  });

  it('interpolates a user name without treating replacement characters as instructions', () => {
    const service = TestBed.inject(LanguageService);
    service.setLanguage('en');

    expect(service.t('login.success', { name: 'Alex $& {name}' }))
      .toBe('Successfully signed in. Welcome Alex $& {name}.');
  });
});
