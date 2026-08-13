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
  userRole = '';
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';
  actionMessage = '';
  formErrorMessage = '';
  optionsLoading = false;
  creatingTask = false;
  editingTaskId: number | null = null;

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
  selectedDate = this.getTodayDate();
  searchQuery = '';

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
    const normalizedSearch = this.searchQuery.trim().toLocaleLowerCase();

    return this.tasks.filter((task) => {
      const matchesPriority = !this.selectedPriority || task.priority === this.selectedPriority;

      if (!matchesPriority || !normalizedSearch) {
        return matchesPriority;
      }

      return [
        task.itemName,
        task.categoryName,
        task.assignedUserName,
        task.comment
      ].some((value) => value?.toLocaleLowerCase().includes(normalizedSearch));
    });
  }

  get emptyTasksMessage(): string {
    if (this.summary.total === 0) {
      return 'Aucune tâche trouvée pour cette date.';
    }

    if (this.searchQuery.trim()) {
      return 'Aucune tâche ne correspond à votre recherche.';
    }

    if (this.selectedStatus || this.selectedPriority) {
      return 'Aucune tâche ne correspond aux filtres sélectionnés.';
    }

    return 'Aucune tâche trouvée.';
  }

  get canCreateTask(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'CHEF';
  }

  get canCancelTask(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'CHEF';
  }

  get canDeleteTask(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'CHEF';
  }

  get isCommis(): boolean {
    return this.userRole === 'COMMIS';
  }

  constructor(
    private tasksService: Tasks,
    private itemsService: Items,
    private usersService: Users
  ) {}

  ngOnInit() {
    this.userRole = (localStorage.getItem('userRole') ?? '').toUpperCase();

    if (this.canCreateTask) {
      this.loadFormData();
    }

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

  submitTask() {
    if (!this.canCreateTask) {
      this.formErrorMessage = 'La gestion des tâches est réservée au chef.';
      return;
    }

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

    const taskId = this.editingTaskId;
    const taskRequest = taskId === null
      ? this.tasksService.createTask(request)
      : this.tasksService.updateTask(taskId, request);

    this.createRequest = taskRequest
      .pipe(finalize(() => {
        this.creatingTask = false;
      }))
      .subscribe({
        next: () => {
          this.resetTaskForm();
          this.loadTasks();
          this.actionMessage = taskId !== null
            ? 'Tâche mise à jour avec succès.'
            : 'Tâche créée avec succès.';
        },
        error: (error) => {
          console.error('Erreur enregistrement tâche:', error);
          this.formErrorMessage = taskId === null
            ? 'Impossible de créer la tâche.'
            : 'Impossible de mettre à jour la tâche.';
        }
      });
  }

  editTask(task: Task) {
    if (!this.canCreateTask) {
      this.errorMessage = 'Vous n’êtes pas autorisé à modifier une tâche.';
      return;
    }

    this.editingTaskId = task.id;
    this.newTask = {
      itemId: task.itemId,
      assignedUserId: task.assignedUserId,
      quantity: task.quantity,
      priority: task.priority as TaskPriority,
      comment: task.comment ?? '',
      taskDate: task.taskDate
    };
    this.formErrorMessage = '';
    this.actionMessage = '';
  }

  cancelEdit() {
    this.resetTaskForm();
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
          tasks: this.tasksService.findAll(this.selectedStatus, this.selectedDate),
          summaryTasks: this.tasksService.findAll('', this.selectedDate)
        })
      : this.tasksService.findAll('', this.selectedDate).pipe(
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

  clearSearch() {
    this.searchQuery = '';
  }

  changeDateFilter(date: string) {
    if (!date) {
      return;
    }

    this.selectedDate = date;
    this.loadTasks();
  }

  resetDateFilter() {
    const today = this.getTodayDate();

    if (this.selectedDate === today) {
      return;
    }

    this.selectedDate = today;
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
    if (!this.canCancelTask) {
      this.errorMessage = 'Vous n’êtes pas autorisé à annuler une tâche.';
      return;
    }

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

  deleteTask(taskId: number) {
    if (!this.canDeleteTask) {
      this.errorMessage = 'Vous n’êtes pas autorisé à supprimer une tâche.';
      return;
    }

    if (!confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      return;
    }

    this.errorMessage = '';
    this.actionMessage = '';

    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        if (this.editingTaskId === taskId) {
          this.resetTaskForm();
        }

        this.loadTasks();
        this.actionMessage = 'Tâche supprimée avec succès.';
      },
      error: (error) => {
        console.error('Erreur suppression tâche:', error);
        this.errorMessage = 'Impossible de supprimer la tâche.';
      }
    });
  }

  private getEmptyTaskForm() {
    return {
      itemId: null as number | null,
      assignedUserId: null as number | null,
      quantity: 1,
      priority: 'NORMALE' as TaskPriority,
      comment: '',
      taskDate: this.getTodayDate()
    };
  }

  private resetTaskForm() {
    this.editingTaskId = null;
    this.newTask = this.getEmptyTaskForm();
    this.formErrorMessage = '';
  }

  private getTodayDate(): string {
    const today = new Date();

    return new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 10);
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
