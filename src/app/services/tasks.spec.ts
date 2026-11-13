import { createTestStorage } from '../../testing/local-storage';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Tasks } from './tasks';

describe('Tasks', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('uses the saved session when fetching tasks', () => {
    localStorage.setItem('token', 'test-token');
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    const http = TestBed.inject(HttpTestingController);

    TestBed.inject(Tasks).findAll('', '2026-11-13').subscribe();
    const request = http.expectOne('http://localhost:8080/api/v1/tasks?date=2026-11-13');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
    request.flush([]);
    http.verify();
  });
});
