import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4" style="background-color: var(--bg);">
      <div class="w-full max-w-sm p-8 rounded-2xl shadow-lg" style="background-color: var(--card-bg);">
        <div class="text-center mb-8">
          <div class="text-4xl mb-2">📊</div>
          <h1 class="text-2xl font-bold">Habit Tracker</h1>
          <p class="text-sm mt-1" style="color: var(--text-secondary);">Track your daily habits</p>
        </div>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="text-sm font-medium">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required
                   class="w-full px-3 py-2 rounded-lg border text-sm"
                   style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required
                   class="w-full px-3 py-2 rounded-lg border text-sm"
                   style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <button type="submit" disabled="{{ loading }}"
                  class="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style="background-color: #6366F1; color: white; opacity: {{ loading ? 0.7 : 1 }};">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
          <p class="text-center text-sm" style="color: var(--text-secondary);">
            Don't have an account? <a routerLink="/register" style="color: #6366F1;" class="font-medium">Sign up</a>
          </p>
          <p *ngIf="error" class="text-center text-sm text-red-500">{{ error }}</p>
        </form>
        <div class="mt-6 pt-4 border-t text-center" style="border-color: var(--border);">
          <p class="text-xs" style="color: var(--text-secondary);">Demo: demo@example.com / demo1234</p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.message || 'Invalid credentials';
        this.loading = false;
      },
    });
  }
}
