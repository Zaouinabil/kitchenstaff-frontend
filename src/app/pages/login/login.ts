import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    console.log('Formulaire envoyé');

    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Veuillez remplir l’email et le mot de passe.';
      return;
    }

    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}