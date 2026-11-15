import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from './pages/login/login';
import { TasksPage } from './pages/tasks/tasks';
import { LanguageService } from './i18n/language.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [Login, TasksPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'kitchenstaff-frontend';
  isLoggedIn = false;

  constructor(public readonly i18n: LanguageService) {}

  private authListener = () => {
    this.checkLogin();
  };

  ngOnInit() {
    this.checkLogin();
    window.addEventListener('auth-changed', this.authListener);
  }

  ngOnDestroy() {
    window.removeEventListener('auth-changed', this.authListener);
  }

  private checkLogin() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}
