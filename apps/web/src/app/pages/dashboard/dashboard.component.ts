import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { StreakBadgeComponent } from '../../shared/components/streak-badge/streak-badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, StreakBadgeComponent],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>

      <!-- Summary cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
          <p class="text-xs font-medium uppercase tracking-wide" style="color: var(--text-secondary);">Total Habits</p>
          <p class="text-3xl font-bold mt-1">{{ dashboard()?.summary?.totalHabits || 0 }}</p>
        </div>
        <div class="p-4 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
          <p class="text-xs font-medium uppercase tracking-wide" style="color: var(--text-secondary);">Done Today</p>
          <p class="text-3xl font-bold mt-1" style="color: #22C55E;">{{ dashboard()?.summary?.doneToday || 0 }}</p>
        </div>
        <div class="p-4 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
          <p class="text-xs font-medium uppercase tracking-wide" style="color: var(--text-secondary);">On Streak (7+ days)</p>
          <p class="text-3xl font-bold mt-1" style="color: #F59E0B;">{{ dashboard()?.summary?.onStreak || 0 }}</p>
        </div>
        <div class="p-4 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
          <p class="text-xs font-medium uppercase tracking-wide" style="color: var(--text-secondary);">Active Goals</p>
          <p class="text-3xl font-bold mt-1" style="color: #6366F1;">{{ dashboard()?.summary?.activeGoals || 0 }}</p>
        </div>
      </div>

      <!-- Today's habits -->
      <div class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">Today's Habits</h2>
        <div *ngIf="dashboard()?.habits?.length === 0" class="text-center py-8" style="color: var(--text-secondary);">
          <p>No habits yet. <a routerLink="/habits" style="color: #6366F1;">Create your first habit</a></p>
        </div>
        <div class="space-y-3">
          <div *ngFor="let habit of dashboard()?.habits" 
               class="flex items-center justify-between p-3 rounded-lg transition-colors"
               style="background-color: var(--bg);">
            <div class="flex items-center gap-3">
              <button (click)="toggleHabit(habit)"
                      class="w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all"
                      [style.backgroundColor]="habit.todayEntry?.status === 'done' ? habit.color + '30' : 'transparent'"
                      [style.border]="'2px solid ' + habit.color">
                {{ habit.todayEntry?.status === 'done' ? '✓' : '' }}
              </button>
              <div>
                <a [routerLink]="['/habits', habit.id]" class="font-medium text-sm hover:underline">{{ habit.name }}</a>
                <p class="text-xs" style="color: var(--text-secondary);">{{ habit.description || '' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <app-streak-badge [streak]="habit.currentStreak" />
              <span class="text-xs" style="color: var(--text-secondary);">{{ habit.weeklyConsistency }}% this week</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Goals -->
      <div class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">Active Goals</h2>
        <div *ngIf="dashboard()?.goals?.length === 0" class="text-center py-8" style="color: var(--text-secondary);">
          <p>No active goals. <a routerLink="/goals" style="color: #6366F1;">Set a goal</a></p>
        </div>
        <div class="space-y-4">
          <div *ngFor="let goal of dashboard()?.goals" class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ goal.title }}</span>
              <span class="text-xs" style="color: var(--text-secondary);">{{ goal.currentCount }}/{{ goal.targetCount }}</span>
            </div>
            <div class="w-full h-2 rounded-full" style="background-color: var(--border);">
              <div class="h-2 rounded-full transition-all duration-500"
                   [style.width.%]="goal.progressPercent"
                   [style.backgroundColor]="goal.progressPercent >= 100 ? '#22C55E' : '#6366F1'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  dashboard = signal<any>(null);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.api.getDashboard().subscribe(data => this.dashboard.set(data));
  }

  toggleHabit(habit: any) {
    const today = new Date().toISOString().split('T')[0];
    const newStatus = habit.todayEntry?.status === 'done' ? 'skipped' : 'done';
    this.api.upsertEntry(habit.id, today, newStatus).subscribe(() => {
      this.loadDashboard();
    });
  }
}
