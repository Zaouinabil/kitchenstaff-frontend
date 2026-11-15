import { createTestStorage } from '../testing/local-storage';
import 'zone.js';

import { NgZone, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('shows the login form before authentication', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Kitchenstaff');
    expect(element.querySelector('.login-form')).not.toBeNull();
    expect(element.querySelector('app-tasks')).toBeNull();
  });

  it('switches all three languages before login, including an error already on screen', async () => {
    const fixture = TestBed.createComponent(App);
    const zone = TestBed.inject(NgZone);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const selector = element.querySelector<HTMLSelectElement>('#language')!;

    expect(selector).not.toBeNull();
    expect(Array.from(selector.options, (option) => option.value)).toEqual(['fr', 'en', 'nl']);
    zone.run(() => element.querySelector<HTMLButtonElement>('.login-form button')!.click());
    await fixture.whenStable();

    const expectations = [
      { language: 'en', label: 'Language', title: 'Sign in', password: 'Password',
        placeholder: 'Your password', error: 'Please enter your email and password.' },
      { language: 'nl', label: 'Taal', title: 'Aanmelden', password: 'Wachtwoord',
        placeholder: 'Uw wachtwoord', error: 'Vul uw e-mailadres en wachtwoord in.' },
      { language: 'fr', label: 'Langue', title: 'Connexion', password: 'Mot de passe',
        placeholder: 'Votre mot de passe', error: 'Veuillez remplir l’email et le mot de passe.' }
    ];

    for (const expected of expectations) {
      zone.run(() => {
        selector.value = expected.language;
        selector.dispatchEvent(new Event('change'));
      });
      await fixture.whenStable();

      expect(element.querySelector('label[for="language"]')?.textContent?.trim()).toBe(expected.label);
      expect(element.querySelector('.login-card h2')?.textContent?.trim()).toBe(expected.title);
      expect(element.querySelector('label[for="password"]')?.textContent?.trim()).toBe(expected.password);
      expect(element.querySelector<HTMLInputElement>('#password')?.placeholder).toBe(expected.placeholder);
      expect(element.querySelector('.login-card .error')?.textContent?.trim()).toBe(expected.error);
      expect(document.documentElement.lang).toBe(expected.language);
      expect(localStorage.getItem('kitchenstaff.language')).toBe(expected.language);
    }
    http.expectNone('http://localhost:8080/api/v1/auth/login');
  });

  it('shows the tasks after login and renders their asynchronous response', async () => {
    const fixture = TestBed.createComponent(App);
    const zone = TestBed.inject(NgZone);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    zone.run(() => {
      const email = element.querySelector<HTMLInputElement>('#email')!;
      const password = element.querySelector<HTMLInputElement>('#password')!;
      email.value = 'commis@kitchenstaff.test';
      email.dispatchEvent(new Event('input'));
      password.value = 'password';
      password.dispatchEvent(new Event('input'));
      element.querySelector<HTMLButtonElement>('.login-form button')!.click();
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    const login = http.expectOne('http://localhost:8080/api/v1/auth/login');
    zone.run(() => login.flush({
      userId: 3,
      name: 'Commis Cuisine',
      email: 'commis@kitchenstaff.test',
      role: 'COMMIS',
      token: 'test-token',
      tokenType: 'Bearer',
      message: 'Connexion réussie'
    }));
    // Wait for the login event to reveal the tasks component and start its request.
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    expect(element.querySelector('app-tasks')).not.toBeNull();
    const tasks = http.expectOne((request) => request.url === 'http://localhost:8080/api/v1/tasks');
    expect(tasks.request.headers.get('Authorization')).toBe('Bearer test-token');

    zone.run(() => tasks.flush([{
      id: 1,
      itemId: 1,
      itemName: 'Préparer les carottes',
      categoryId: 1,
      categoryName: 'Légumes',
      quantity: 2,
      unit: 'kg',
      priority: 'NORMALE',
      status: 'A_FAIRE',
      comment: '',
      taskDate: '2026-11-13',
      assignedUserId: 3,
      assignedUserName: 'Commis Cuisine'
    }]));
    await fixture.whenStable();

    expect(element.querySelector('.task-card')?.textContent).toContain('Préparer les carottes');
    expect(element.querySelector('.summary-total strong')?.textContent).toBe('1');

    // The same global control remains available with an authenticated session.
    const selector = element.querySelector<HTMLSelectElement>('#language')!;
    zone.run(() => {
      selector.value = 'nl';
      selector.dispatchEvent(new Event('change'));
    });
    await fixture.whenStable();
    expect(element.querySelector('.logout-button')?.textContent?.trim()).toBe('Afmelden');
    expect(element.querySelector('.task-card h3')?.textContent).toBe('Préparer les carottes');
    expect(element.querySelector('.task-card .status')?.textContent?.trim()).toBe('Te doen');
    expect(element.querySelector('.session-box h3')?.textContent).toBe('Commis Cuisine');

    zone.run(() => element.querySelector<HTMLButtonElement>('.logout-button')!.click());
    await fixture.whenStable();
    expect(element.querySelector('app-tasks')).toBeNull();
    expect(element.querySelector('.login-form')).not.toBeNull();
    expect(element.querySelector<HTMLSelectElement>('#language')?.value).toBe('nl');
    expect(element.querySelector('.login-card h2')?.textContent?.trim()).toBe('Aanmelden');
    expect(localStorage.getItem('kitchenstaff.language')).toBe('nl');
  });
});
