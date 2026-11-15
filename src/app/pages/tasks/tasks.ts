import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, Subscription, finalize, forkJoin, map, of } from 'rxjs';
import { Item, Items } from '../../services/items';
import { CreateTaskRequest, Tasks, Task, TaskPriority } from '../../services/tasks';
import { User, Users } from '../../services/users';
import { LanguageService } from '../../i18n/language.service';
import type { TasksTranslationKey } from '../../i18n/tasks.translations';

interface TaskSummary {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

@Component({
  selector: 'app-tasks',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksPage implements OnInit, OnDestroy {
  userRole = '';
  tasks: Task[] = [];
  loading = false;
  private errorMessageKey: TasksTranslationKey | '' = '';
  private actionMessageKey: TasksTranslationKey | '' = '';
  private formErrorMessageKey: TasksTranslationKey | '' = '';
  fieldErrors: Partial<Record<keyof CreateTaskRequest, TasksTranslationKey>> = {};
  optionsLoading = false;
  creatingTask = false;
  editingTaskId: number | null = null;

  summary: TaskSummary = this.getEmptySummary();

  items: Item[] = [];
  users: User[] = [];

  newTask = this.getEmptyTaskForm();

  get priorities(): { label: string; value: TaskPriority }[] {
    return (['BASSE', 'NORMALE', 'HAUTE', 'URGENTE'] as const).map((value) => ({
      label: this.i18n.priorityLabel(value),
      value
    }));
  }

  selectedStatus = '';
  selectedPriority: TaskPriority | '' = '';
  selectedDate = this.getTodayDate();
  searchQuery = '';

  private currentRequest?: Subscription;
  private formDataRequest?: Subscription;
  private createRequest?: Subscription;

  get statusFilters(): { label: string; value: string }[] {
    return [
      { label: this.i18n.t('tasks.filters.all'), value: '' },
      ...['A_FAIRE', 'EN_COURS', 'TERMINEE', 'ANNULEE'].map((value) => ({
        label: this.i18n.statusLabel(value),
        value
      }))
    ];
  }

  get priorityFilters(): { label: string; value: TaskPriority | '' }[] {
    return [
      { label: this.i18n.t('tasks.filters.all'), value: '' },
      ...this.priorities
    ];
  }

  get errorMessage(): string {
    return this.i18n.t(this.errorMessageKey);
  }

  get actionMessage(): string {
    return this.i18n.t(this.actionMessageKey);
  }

  get formErrorMessage(): string {
    return this.i18n.t(this.formErrorMessageKey);
  }

  get filteredTasks(): Task[] {
    const language = this.i18n.language();
    const normalizedSearch = this.searchQuery.trim().toLocaleLowerCase(language);

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
      ].some((value) => value?.toLocaleLowerCase(language).includes(normalizedSearch));
    });
  }

  get emptyTasksMessage(): string {
    if (this.summary.total === 0) {
      return this.i18n.t('tasks.empty.date');
    }

    if (this.searchQuery.trim()) {
      return this.i18n.t('tasks.empty.search');
    }

    if (this.selectedStatus || this.selectedPriority) {
      return this.i18n.t('tasks.empty.filters');
    }

    return this.i18n.t('tasks.empty.all');
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
    private usersService: Users,
    public readonly i18n: LanguageService
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
    this.formErrorMessageKey = '';

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
      this.formErrorMessageKey = 'tasks.error.managementForbidden';
      return;
    }

    const { itemId, assignedUserId, quantity, priority, comment, taskDate } = this.newTask;

    // Reset previous errors
    this.fieldErrors = {};
    this.formErrorMessageKey = '';

    if (itemId === null) {
      this.fieldErrors.itemId = 'tasks.validation.itemRequired';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
      return;
    }

    if (assignedUserId === null) {
      this.fieldErrors.assignedUserId = 'tasks.validation.userRequired';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
      return;
    }

    if (quantity === null || quantity === undefined || Number.isNaN(quantity)) {
      this.fieldErrors.quantity = 'tasks.validation.quantityRequired';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
      return;
    }

    if (quantity <= 0) {
      this.fieldErrors.quantity = 'tasks.validation.quantityPositive';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
      return;
    }

    if (!priority) {
      this.fieldErrors.priority = 'tasks.validation.priorityRequired';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
      return;
    }

    if (!taskDate) {
      this.fieldErrors.taskDate = 'tasks.validation.dateRequired';
      this.formErrorMessageKey = 'tasks.validation.invalidForm';
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
    this.formErrorMessageKey = '';
    this.actionMessageKey = '';

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
          this.actionMessageKey = taskId !== null
            ? 'tasks.success.update'
            : 'tasks.success.create';
        },
        error: (error) => {
          console.error('Erreur enregistrement tâche:', error);
          this.formErrorMessageKey = taskId === null
            ? 'tasks.error.create'
            : 'tasks.error.update';
        }
      });
  }

  editTask(task: Task) {
    if (!this.canCreateTask) {
      this.errorMessageKey = 'tasks.error.editForbidden';
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
    this.formErrorMessageKey = '';
    this.fieldErrors = {};
    this.actionMessageKey = '';
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
      this.errorMessageKey = 'tasks.error.loginRequired';
      return;
    }

    this.currentRequest?.unsubscribe();

    this.loading = true;
    this.errorMessageKey = '';
    this.actionMessageKey = '';

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
          this.errorMessageKey = 'tasks.error.load';
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
        this.loadTasks();
        this.actionMessageKey = 'tasks.success.start';
      },
      error: (error) => {
        console.error('Erreur démarrage tâche:', error);
        this.errorMessageKey = 'tasks.error.start';
      }
    });
  }

  completeTask(taskId: number) {
    this.tasksService.completeTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
        this.actionMessageKey = 'tasks.success.complete';
      },
      error: (error) => {
        console.error('Erreur fin tâche:', error);
        this.errorMessageKey = 'tasks.error.complete';
      }
    });
  }

  cancelTask(taskId: number) {
    if (!this.canCancelTask) {
      this.errorMessageKey = 'tasks.error.cancelForbidden';
      return;
    }

    this.tasksService.cancelTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
        this.actionMessageKey = 'tasks.success.cancel';
      },
      error: (error) => {
        console.error('Erreur annulation tâche:', error);
        this.errorMessageKey = 'tasks.error.cancel';
      }
    });
  }

  deleteTask(taskId: number) {
    if (!this.canDeleteTask) {
      this.errorMessageKey = 'tasks.error.deleteForbidden';
      return;
    }

    if (!confirm(this.i18n.t('tasks.confirm.delete'))) {
      return;
    }

    this.errorMessageKey = '';
    this.actionMessageKey = '';

    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        if (this.editingTaskId === taskId) {
          this.resetTaskForm();
        }

        this.loadTasks();
        this.actionMessageKey = 'tasks.success.delete';
      },
      error: (error) => {
        console.error('Erreur suppression tâche:', error);
        this.errorMessageKey = 'tasks.error.delete';
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
    this.formErrorMessageKey = '';
    this.fieldErrors = {};
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
