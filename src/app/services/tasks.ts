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

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private apiUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  findAll(status?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params: params
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