import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  findAll(): Observable<Task[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Task[]>(this.apiUrl, { headers });
  }
}