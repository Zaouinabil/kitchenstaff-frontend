import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Tasks, Task } from '../../services/tasks';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';
  actionMessage = '';

  selectedStatus = '';

  statusFilters = [
    { label: 'Toutes', value: '' },
    { label: 'À faire', value: 'A_FAIRE' },
    { label: 'En cours', value: 'EN_COURS' },
    { label: 'Terminées', value: 'TERMINEE' },
    { label: 'Annulées', value: 'ANNULEE' }
  ];

  private authListener = () => {
    this.loadTasks();
  };

  constructor(private tasksService: Tasks) {}

  ngOnInit() {
    window.addEventListener('auth-changed', this.authListener);
    this.loadTasks();
  }

  ngOnDestroy() {
    window.removeEventListener('auth-changed', this.authListener);
  }

  loadTasks() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.tasks = [];
      this.errorMessage = 'Connectez-vous pour afficher les tâches.';
      this.actionMessage = '';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.tasks = [];
    this.errorMessage = '';
    this.actionMessage = '';

    this.tasksService.findAll(this.selectedStatus)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.tasks = response;
        },
        error: (error) => {
          console.error('Erreur chargement tâches:', error);
          this.errorMessage = 'Impossible de charger les tâches.';
        }
      });
  }

  changeStatusFilter(status: string) {
    this.selectedStatus = status;
    this.loadTasks();
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