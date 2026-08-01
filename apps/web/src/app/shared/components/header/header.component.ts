import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="border-b" style="border-color: var(--border); background-color: var(--card-bg);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <a routerLink="/dashboard" class="flex items-center gap-2 font-bold text-xl" style="color: #6366F1;">
              <span class="text-2xl">📊</span>
              <span>Habit Tracker</span>
            </a>
            <nav class="hidden md:flex items-center gap-6">
              <a routerLink="/dashboard" routerLinkActive="font-semibold" class="text-sm transition-colors" style="color: var(--text-secondary);" [style.color]="'var(--text-secondary)'">Dashboard</a>
              <a routerLink="/habits" routerLinkActive="font-semibold" class="text-sm transition-colors" style="color: var(--text-secondary);">Habits</a>
              <a routerLink="/goals" routerLinkActive="font-semibold" class="text-sm transition-colors" style="color: var(--text-secondary);">Goals</a>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <button (click)="auth.toggleDarkMode()" class="p-2 rounded-lg transition-colors" style="background-color: var(--bg);" title="Toggle dark mode">
              <span>{{ auth.user()?.isDarkMode ? '☀️' : '🌙' }}</span>
            </button>
            <span class="text-sm font-medium">{{ auth.user()?.displayName }}</span>
            <button (click)="auth.logout()" class="text-sm px-3 py-1.5 rounded-lg transition-colors" style="background-color: #6366F1; color: white;">Logout</button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}
