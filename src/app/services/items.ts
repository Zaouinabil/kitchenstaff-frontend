import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  unit: string;
  categoryId: number;
  categoryName: string;
  active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Items {
  private apiUrl = 'http://localhost:8080/api/v1/items';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl, {
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
