import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, Subscription, finalize, forkJoin, map, of } from 'rxjs';
import { Item, Items } from '../../services/items';
import { CreateTaskRequest, Tasks, Task, TaskPriority } from '../../services/tasks';
import { User, Users } from '../../services/users';

interface TaskSummary {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

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

  summary: TaskSummary = this.getEmptySummary();

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
  selectedPriority: TaskPriority | '' = '';

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

  priorityFilters: { label: string; value: TaskPriority | '' }[] = [
    { label: 'Toutes', value: '' },
    { label: 'BASSE', value: 'BASSE' },
    { label: 'NORMALE', value: 'NORMALE' },
    { label: 'HAUTE', value: 'HAUTE' },
    { label: 'URGENTE', value: 'URGENTE' }
  ];

  get filteredTasks(): Task[] {
    if (!this.selectedPriority) {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.priority === this.selectedPriority);
  }

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
      items: this.itemsService.findAll().pipe(
        catchError((error) => {
          console.error('Erreur chargement items:', error);
          return of([] as Item[]);
        })
      ),
      users: this.usersService.findActive().pipe(
        catchError((error) => {
          if (error.status === 403) {
            console.error(
              'Accès refusé aux utilisateurs (403). Testez avec un compte ADMIN.'
            );
          } else {
            console.error('Erreur chargement utilisateurs:', error);
          }

          return of([] as User[]);
        })
      )
    })
      .pipe(finalize(() => {
        this.optionsLoading = false;
      }))
      .subscribe({
        next: ({ items, users }) => {
          this.items = items;
          this.users = users;
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
      this.summary = this.getEmptySummary();
      this.loading = false;
      this.errorMessage = 'Connectez-vous pour afficher les tâches.';
      return;
    }

    this.currentRequest?.unsubscribe();

    this.loading = true;
    this.errorMessage = '';
    this.actionMessage = '';

    const tasksRequest = this.selectedStatus
      ? forkJoin({
          tasks: this.tasksService.findAll(this.selectedStatus),
          summaryTasks: this.tasksService.findAll()
        })
      : this.tasksService.findAll().pipe(
          map((tasks) => ({ tasks, summaryTasks: tasks }))
        );

    this.currentRequest = tasksRequest
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: ({ tasks, summaryTasks }) => {
          this.tasks = tasks;
          this.summary = this.calculateSummary(summaryTasks);
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur chargement tâches:', error);
          this.tasks = [];
          this.summary = this.getEmptySummary();
          this.errorMessage = 'Impossible de charger les tâches.';
          this.loading = false;
        }
      });
  }

  changeStatusFilter(status: string) {
    this.selectedStatus = status;
    this.loadTasks();
  }

  changePriorityFilter(priority: TaskPriority | '') {
    this.selectedPriority = priority;
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

  private calculateSummary(tasks: Task[]): TaskSummary {
    return tasks.reduce<TaskSummary>((summary, task) => {
      summary.total += 1;

      if (task.status === 'A_FAIRE') {
        summary.todo += 1;
      } else if (task.status === 'EN_COURS') {
        summary.inProgress += 1;
      } else if (task.status === 'TERMINEE') {
        summary.completed += 1;
      } else if (task.status === 'ANNULEE') {
        summary.cancelled += 1;
      }

      return summary;
    }, this.getEmptySummary());
  }

  private getEmptySummary(): TaskSummary {
    return {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0
    };
  }
}
