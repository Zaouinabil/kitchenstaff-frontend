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
  actionMessage = '';

  constructor(private tasksService: Tasks) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = 'Connectez-vous pour afficher les tâches.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.actionMessage = '';

    this.tasksService.findAll().subscribe({
      next: (response) => {
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

  startTask(taskId: number) {
    this.actionMessage = '';
    this.errorMessage = '';

    this.tasksService.startTask(taskId).subscribe({
      next: () => {
        this.actionMessage = 'Tâche démarrée avec succès.';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Erreur démarrage tâche:', error);
        this.errorMessage = 'Impossible de démarrer la tâche.';
      }
    });
  }

  completeTask(taskId: number) {
    this.actionMessage = '';
    this.errorMessage = '';

    this.tasksService.completeTask(taskId).subscribe({
      next: () => {
        this.actionMessage = 'Tâche terminée avec succès.';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Erreur fin tâche:', error);
        this.errorMessage = 'Impossible de terminer la tâche.';
      }
    });
  }

  cancelTask(taskId: number) {
    this.actionMessage = '';
    this.errorMessage = '';

    this.tasksService.cancelTask(taskId).subscribe({
      next: () => {
        this.actionMessage = 'Tâche annulée avec succès.';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Erreur annulation tâche:', error);
        this.errorMessage = 'Impossible d’annuler la tâche.';
      }
    });
  }
}