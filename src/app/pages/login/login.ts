import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
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
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Veuillez remplir l’email et le mot de passe.';
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.saveSession(response);

        this.isLoggedIn = true;
        this.userName = response.name;
        this.userRole = response.role;

        this.successMessage = `Connexion réussie. Bienvenue ${response.name}.`;
        this.loading = false;

        console.log('Token JWT:', response.token);
      },
      error: (error) => {
        console.error('Erreur login:', error);

        this.errorMessage = 'Connexion impossible. Vérifiez vos identifiants.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');

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