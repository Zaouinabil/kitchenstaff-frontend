import { Component } from '@angular/core';
import { Login } from './pages/login/login';
import { TasksPage } from './pages/tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [Login, TasksPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'kitchenstaff-frontend';
}