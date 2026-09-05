import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Habits
  getHabits(includeArchived = false) {
    return this.http.get<any[]>(`${this.apiUrl}/habits${includeArchived ? '?includeArchived=true' : ''}`);
  }

  getHabit(id: string) {
    return this.http.get<any>(`${this.apiUrl}/habits/${id}`);
  }

  createHabit(data: any) {
    return this.http.post<any>(`${this.apiUrl}/habits`, data);
  }

  updateHabit(id: string, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/habits/${id}`, data);
  }

  archiveHabit(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/habits/${id}`);
  }

  // Entries
  upsertEntry(habitId: string, date: string, status: string, notes?: string) {
    return this.http.post<any>(`${this.apiUrl}/entries/${habitId}/${date}`, { status, notes });
  }

  getEntries(habitId: string, startDate?: string, endDate?: string) {
    let url = `${this.apiUrl}/entries/${habitId}`;
    if (startDate && endDate) url += `?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any[]>(url);
  }

  // Goals
  getGoals(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.http.get<any[]>(`${this.apiUrl}/goals${params}`);
  }

  createGoal(data: any) {
    return this.http.post<any>(`${this.apiUrl}/goals`, data);
  }

  updateGoal(id: string, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/goals/${id}`, data);
  }

  deleteGoal(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/goals/${id}`);
  }

  // Dashboard
  getDashboard() {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

  getHeatmap(days = 90) {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/heatmap?days=${days}`);
  }
}
