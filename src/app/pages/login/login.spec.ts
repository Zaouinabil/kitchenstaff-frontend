import { createTestStorage } from '../../../testing/local-storage';
import 'zone.js';

import { NgZone, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let http: HttpTestingController;
  let zone: NgZone;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
    zone = TestBed.inject(NgZone);
    fixture = TestBed.createComponent(Login);
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function submitLogin() {
    const element = fixture.nativeElement as HTMLElement;
    const email = element.querySelector<HTMLInputElement>('#email')!;
    const password = element.querySelector<HTMLInputElement>('#password')!;
    const button = element.querySelector<HTMLButtonElement>('.login-form button')!;

    zone.run(() => {
      email.value = 'chef@kitchenstaff.test';
      email.dispatchEvent(new Event('input'));
      password.value = 'password';
      password.dispatchEvent(new Event('input'));
      button.click();
    });

    // Let the click render before the simulated HTTP response arrives.
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Connexion...');

    return http.expectOne('http://localhost:8080/api/v1/auth/login');
  }

  it('renders the session when the login response arrives without another click', async () => {
    const request = await submitLogin();

    zone.run(() => request.flush({
      userId: 2,
      name: 'Chef Cuisine',
      email: 'chef@kitchenstaff.test',
      role: 'CHEF',
      token: 'test-token',
      tokenType: 'Bearer',
      message: 'Connexion réussie'
    }));
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.session-box')?.textContent).toContain('Chef Cuisine');
    expect(element.querySelector('.login-form')).toBeNull();
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('shows invalid credentials and re-enables the button after a rejected login', async () => {
    const request = await submitLogin();

    zone.run(() => request.flush({}, { status: 401, statusText: 'Unauthorized' }));
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.login-form button')!;
    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain('Se connecter');
    expect(element.querySelector('.error')?.textContent).toMatch(/identifiants|mot de passe/i);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('shows a connection error and re-enables the button when the backend cannot be reached', async () => {
    const request = await submitLogin();

    zone.run(() => request.error(new ProgressEvent('error')));
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector<HTMLButtonElement>('.login-form button')?.disabled).toBe(false);
    expect(element.querySelector('.error')?.textContent).toMatch(/serveur|backend/i);
    expect(localStorage.getItem('token')).toBeNull();
  });
});
