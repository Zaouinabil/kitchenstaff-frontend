import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';
import { LanguageService } from '../../i18n/language.service';
import type { loginFr } from '../../i18n/login.translations';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly i18n = inject(LanguageService);
  email = '';
  password = '';
  private errorKey: keyof typeof loginFr | '' = '';
  private loginSucceeded = false;
  loading = false;

  isLoggedIn = false;
  userName = '';
  userRole = '';

  constructor(private auth: Auth) {
    this.loadSession();
  }

  get errorMessage(): string {
    return this.i18n.t(this.errorKey);
  }

  get successMessage(): string {
    return this.loginSucceeded ? this.i18n.t('login.success', { name: this.userName }) : '';
  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.errorKey = '';
    this.loginSucceeded = false;

    if (!this.email.trim() || !this.password.trim()) {
      this.errorKey = 'login.error.required';
      return;
    }

    this.loading = true;

    this.auth.login(this.email.trim(), this.password)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: (response) => {
          this.auth.saveSession(response);

          this.isLoggedIn = true;
          this.userName = response.name;
          this.userRole = response.role;

          this.loginSucceeded = true;
        },
        error: (error) => {
          console.error('Erreur login:', error);

          if (error.status === 0) {
            this.errorKey = 'login.error.connection';
          } else if (error.status === 401 || error.status === 403) {
            this.errorKey = 'login.error.credentials';
          } else {
            this.errorKey = 'login.error.server';
          }
        }
      });
  }

  logout() {
    this.auth.logout();

    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.loginSucceeded = false;
    this.errorKey = '';
    this.password = '';
  }

  private loadSession() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');

    if (token && name && role) {
      this.isLoggedIn = true;
      this.userName = name;
      this.userRole = role;
    }
  }
}
