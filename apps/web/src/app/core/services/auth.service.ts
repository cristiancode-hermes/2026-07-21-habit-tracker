import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export interface User {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  isDarkMode?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api';
  readonly user = signal<User | null>(null);
  readonly isAuthenticated = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      this.user.set(JSON.parse(savedUser));
      this.isAuthenticated.set(true);
    }
    this.initTheme();
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.setSession(res)));
  }

  register(email: string, password: string, displayName: string, orgName: string) {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/auth/register`, { email, password, displayName, orgName })
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(res: { token: string; user: User }) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.user.set(res.user);
    this.isAuthenticated.set(true);
    this.applyTheme(res.user.isDarkMode ?? false);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  updateProfile(data: Partial<User>) {
    return this.http.patch<User>(`${this.apiUrl}/auth/profile`, data)
      .pipe(tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
      }));
  }

  toggleDarkMode() {
    const current = this.user();
    if (current) {
      const newMode = !(current.isDarkMode ?? false);
      this.updateProfile({ isDarkMode: newMode } as any).subscribe();
      this.applyTheme(newMode);
    }
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private initTheme() {
    const user = this.user();
    if (user?.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }
}
