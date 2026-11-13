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

    zone.run(() => element.querySelector<HTMLButtonElement>('.logout-button')!.click());
    await fixture.whenStable();
    expect(element.querySelector('app-tasks')).toBeNull();
    expect(element.querySelector('.login-form')).not.toBeNull();
  });
});
