import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4" style="background-color: var(--bg);">
      <div class="w-full max-w-sm p-8 rounded-2xl shadow-lg" style="background-color: var(--card-bg);">
        <div class="text-center mb-8">
          <div class="text-4xl mb-2">📊</div>
          <h1 class="text-2xl font-bold">Create Account</h1>
          <p class="text-sm mt-1" style="color: var(--text-secondary);">Start tracking your habits</p>
        </div>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="text-sm font-medium">Name</label>
            <input type="text" [(ngModel)]="displayName" name="displayName" required
                   class="w-full px-3 py-2 rounded-lg border text-sm"
                   style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required
                   class="w-full px-3 py-2 rounded-lg border text-sm"
                   style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Organization</label>
            <input type="text" [(ngModel)]="orgName" name="orgName" required
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
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
          <p class="text-center text-sm" style="color: var(--text-secondary);">
            Already have an account? <a routerLink="/login" style="color: #6366F1;" class="font-medium">Sign in</a>
          </p>
          <p *ngIf="error" class="text-center text-sm text-red-500">{{ error }}</p>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  displayName = '';
  email = '';
  orgName = '';
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
    this.auth.register(this.email, this.password, this.displayName, this.orgName).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
        this.loading = false;
      },
    });
  }
}
