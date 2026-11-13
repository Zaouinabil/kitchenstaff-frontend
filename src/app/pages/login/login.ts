import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  isLoggedIn = false;
  userName = '';
  userRole = '';

  constructor(private auth: Auth) {
    this.loadSession();
  }

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Veuillez remplir l’email et le mot de passe.';
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

          this.successMessage = `Connexion réussie. Bienvenue ${response.name}.`;
        },
        error: (error) => {
          console.error('Erreur login:', error);

          if (error.status === 0) {
            this.errorMessage = 'Le serveur ne répond pas ou la connexion a expiré. Vérifiez que le backend est démarré et ouvrez l’application sur http://localhost:4200.';
          } else if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Connexion impossible. Vérifiez vos identifiants.';
          } else {
            this.errorMessage = 'Une erreur du serveur empêche la connexion. Réessayez dans un instant.';
          }
        }
      });
  }

  logout() {
  this.auth.logout();

  this.isLoggedIn = false;
  this.userName = '';
  this.userRole = '';
  this.successMessage = '';
  this.errorMessage = '';
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
