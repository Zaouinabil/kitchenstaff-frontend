import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoginResponse {
  userId: number;
  name: string;
  email: string;
  role: string;
  token: string;
  tokenType: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private authenticatedSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  readonly authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

saveSession(response: LoginResponse): void {
  localStorage.setItem('token', response.token);
  localStorage.setItem('userName', response.name);
  localStorage.setItem('userRole', response.role);
  localStorage.setItem('userEmail', response.email);

  this.authenticatedSubject.next(true);
  window.dispatchEvent(new Event('auth-changed'));
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');

  this.authenticatedSubject.next(false);
  window.dispatchEvent(new Event('auth-changed'));
}
}
