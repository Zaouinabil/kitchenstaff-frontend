import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from './pages/login/login';
import { TasksPage } from './pages/tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [Login, TasksPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'kitchenstaff-frontend';
  isLoggedIn = false;

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