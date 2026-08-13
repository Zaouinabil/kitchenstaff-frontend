import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  itemId: number;
  itemName: string;
  categoryId: number;
  categoryName: string;
  quantity: number;
  unit: string;
  priority: string;
  status: string;
  comment: string;
  taskDate: string;
  assignedUserId: number;
  assignedUserName: string;
}

export type TaskPriority = 'BASSE' | 'NORMALE' | 'HAUTE' | 'URGENTE';

export interface CreateTaskRequest {
  itemId: number;
  assignedUserId: number;
  quantity: number;
  priority: TaskPriority;
  comment: string;
  taskDate: string;
}

export type UpdateTaskRequest = CreateTaskRequest;

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private apiUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  findAll(status?: string, date?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    if (date) {
      params = params.set('date', date);
    }

    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params: params
    });
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, request, {
      headers: this.getHeaders()
    });
  }

  updateTask(id: number, request: UpdateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, request, {
      headers: this.getHeaders()
    });
  }

  startTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/start`, {}, {
      headers: this.getHeaders()
    });
  }

  completeTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/done`, {}, {
      headers: this.getHeaders()
    });
  }

  cancelTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/cancel`, {}, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
