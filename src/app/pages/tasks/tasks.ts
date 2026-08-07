import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
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

  private currentRequest?: Subscription;

  statusFilters = [
    { label: 'Toutes', value: '' },
    { label: 'À faire', value: 'A_FAIRE' },
    { label: 'En cours', value: 'EN_COURS' },
    { label: 'Terminées', value: 'TERMINEE' },
    { label: 'Annulées', value: 'ANNULEE' }
  ];

  constructor(private tasksService: Tasks) {}

  ngOnInit() {
    this.loadTasks();
  }

  ngOnDestroy() {
    this.currentRequest?.unsubscribe();
  }

  loadTasks() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.tasks = [];
      this.loading = false;
      this.errorMessage = 'Connectez-vous pour afficher les tâches.';
      return;
    }

    this.currentRequest?.unsubscribe();

    this.loading = true;
    this.errorMessage = '';
    this.actionMessage = '';

    this.currentRequest = this.tasksService.findAll(this.selectedStatus)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.tasks = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur chargement tâches:', error);
          this.tasks = [];
          this.errorMessage = 'Impossible de charger les tâches.';
          this.loading = false;
        }
      });
  }

  changeStatusFilter(status: string) {
    this.selectedStatus = status;
    this.loadTasks();
  }

  startTask(taskId: number) {
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
