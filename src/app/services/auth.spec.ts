import { createTestStorage } from '../../testing/local-storage';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  let http: HttpTestingController;

  beforeEach(() => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(Auth);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('sends the login credentials with a bounded response timeout', () => {
    const response = vi.fn();
    service.login('chef@kitchenstaff.test', 'password').subscribe(response);

    const request = http.expectOne('http://localhost:8080/api/v1/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ email: 'chef@kitchenstaff.test', password: 'password' });
    expect(request.request.timeout).toBe(15_000);

    const session = {
      userId: 2,
      name: 'Chef Cuisine',
      email: 'chef@kitchenstaff.test',
      role: 'CHEF',
      token: 'test-token',
      tokenType: 'Bearer',
      message: 'Connexion réussie'
    };
    request.flush(session);
    expect(response).toHaveBeenCalledWith(session);
  });
});
