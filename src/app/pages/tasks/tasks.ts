import { Component } from '@angular/core';
import { Tasks, Task } from '../../services/tasks';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksPage {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';

  constructor(private tasksService: Tasks) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const token = localStorage.getItem('token');

    console.log('Token utilisé pour charger les tâches:', token);

    if (!token) {
      this.errorMessage = 'Connectez-vous pour afficher les tâches.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.tasksService.findAll().subscribe({
      next: (response) => {
        console.log('Tâches reçues:', response);

        this.tasks = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur chargement tâches:', error);

        this.errorMessage = 'Impossible de charger les tâches.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}