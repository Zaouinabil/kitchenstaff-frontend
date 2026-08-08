import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, finalize, forkJoin } from 'rxjs';
import { Item, Items } from '../../services/items';
import { CreateTaskRequest, Tasks, Task, TaskPriority } from '../../services/tasks';
import { User, Users } from '../../services/users';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';
  actionMessage = '';
  formErrorMessage = '';
  optionsLoading = false;
  creatingTask = false;

  items: Item[] = [];
  users: User[] = [];

  newTask = this.getEmptyTaskForm();

  priorities: { label: string; value: TaskPriority }[] = [
    { label: 'Basse', value: 'BASSE' },
    { label: 'Normale', value: 'NORMALE' },
    { label: 'Haute', value: 'HAUTE' },
    { label: 'Urgente', value: 'URGENTE' }
  ];

  selectedStatus = '';

  private currentRequest?: Subscription;
  private formDataRequest?: Subscription;
  private createRequest?: Subscription;

  statusFilters = [
    { label: 'Toutes', value: '' },
    { label: 'À faire', value: 'A_FAIRE' },
    { label: 'En cours', value: 'EN_COURS' },
    { label: 'Terminées', value: 'TERMINEE' },
    { label: 'Annulées', value: 'ANNULEE' }
  ];

  constructor(
    private tasksService: Tasks,
    private itemsService: Items,
    private usersService: Users
  ) {}

  ngOnInit() {
    this.loadFormData();
    this.loadTasks();
  }

  ngOnDestroy() {
    this.currentRequest?.unsubscribe();
    this.formDataRequest?.unsubscribe();
    this.createRequest?.unsubscribe();
  }

  loadFormData() {
    this.optionsLoading = true;
    this.formErrorMessage = '';

    this.formDataRequest = forkJoin({
      items: this.itemsService.findAll(),
      users: this.usersService.findActive()
    })
      .pipe(finalize(() => {
        this.optionsLoading = false;
      }))
      .subscribe({
        next: ({ items, users }) => {
          this.items = items.filter((item) => item.active);
          this.users = users;
        },
        error: (error) => {
          console.error('Erreur chargement données formulaire:', error);
          this.formErrorMessage = 'Impossible de charger les données du formulaire.';
        }
      });
  }

  createTask() {
    const { itemId, assignedUserId, quantity, priority, comment, taskDate } = this.newTask;

    if (itemId === null || assignedUserId === null || quantity <= 0 || !taskDate) {
      this.formErrorMessage = 'Veuillez compléter tous les champs obligatoires.';
      return;
    }

    const request: CreateTaskRequest = {
      itemId,
      assignedUserId,
      quantity,
      priority,
      comment: comment.trim(),
      taskDate
    };

    this.creatingTask = true;
    this.formErrorMessage = '';
    this.actionMessage = '';

    this.createRequest = this.tasksService.createTask(request)
      .pipe(finalize(() => {
        this.creatingTask = false;
      }))
      .subscribe({
        next: () => {
          this.newTask = this.getEmptyTaskForm();
          this.loadTasks();
          this.actionMessage = 'Tâche créée avec succès.';
        },
        error: (error) => {
          console.error('Erreur création tâche:', error);
          this.formErrorMessage = 'Impossible de créer la tâche.';
        }
      });
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

  private getEmptyTaskForm() {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 10);

    return {
      itemId: null as number | null,
      assignedUserId: null as number | null,
      quantity: 1,
      priority: 'NORMALE' as TaskPriority,
      comment: '',
      taskDate: localDate
    };
  }
}
