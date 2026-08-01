import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { StreakBadgeComponent } from '../../shared/components/streak-badge/streak-badge.component';
import { HeatmapComponent } from '../../shared/components/heatmap/heatmap.component';

@Component({
  selector: 'app-habit-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule, StreakBadgeComponent, HeatmapComponent],
  template: `
    <div class="space-y-6" *ngIf="habit()">
      <div class="flex items-center gap-3">
        <a routerLink="/habits" class="text-sm" style="color: var(--text-secondary);">← Back</a>
      </div>

      <div class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                 [style.backgroundColor]="habit().color + '20'">
              <span *ngIf="habit().icon === 'check'">✓</span>
              <span *ngIf="habit().icon === 'zap'">⚡</span>
              <span *ngIf="habit().icon === 'heart'">❤️</span>
              <span *ngIf="habit().icon === 'book'">📚</span>
              <span *ngIf="habit().icon === 'edit'">✏️</span>
              <span *ngIf="habit().icon === 'code'">💻</span>
              <span *ngIf="habit().icon === 'droplet'">💧</span>
              <span *ngIf="habit().icon === 'star'">⭐</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ habit().name }}</h1>
              <p class="text-sm" style="color: var(--text-secondary);">{{ habit().description }}</p>
            </div>
          </div>
          <app-streak-badge [streak]="habit().currentStreak || 0" />
        </div>

        <div class="grid grid-cols-3 gap-4 mt-6">
          <div class="text-center p-3 rounded-lg" style="background-color: var(--bg);">
            <p class="text-xs" style="color: var(--text-secondary);">Current Streak</p>
            <p class="text-xl font-bold">{{ habit().currentStreak || 0 }} days</p>
          </div>
          <div class="text-center p-3 rounded-lg" style="background-color: var(--bg);">
            <p class="text-xs" style="color: var(--text-secondary);">Best Streak</p>
            <p class="text-xl font-bold">{{ habit().longestStreak || 0 }} days</p>
          </div>
          <div class="text-center p-3 rounded-lg" style="background-color: var(--bg);">
            <p class="text-xs" style="color: var(--text-secondary);">Weekly</p>
            <p class="text-xl font-bold">{{ habit().weeklyConsistency || 0 }}%</p>
          </div>
        </div>
      </div>

      <!-- 7-day log -->
      <div class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">Last 7 Days</h2>
        <div class="grid grid-cols-7 gap-2">
          <div *ngFor="let day of last7Days" class="text-center">
            <p class="text-xs mb-1" style="color: var(--text-secondary);">{{ day.dayName }}</p>
            <button (click)="toggleDay(day.date)"
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium mx-auto transition-all"
                    [style.backgroundColor]="getDayColor(day.date)"
                    [style.color]="getDayText(day.date)"
                    [style.border]="'2px solid ' + (day.isToday ? habit().color : 'transparent')">
              {{ day.dateNum }}
            </button>
          </div>
        </div>
      </div>

      <!-- Heatmap -->
      <div class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">Activity (Last 90 Days)</h2>
        <app-heatmap [data]="heatmapData()" />
      </div>
    </div>
  `,
})
export class HabitDetailComponent implements OnInit {
  habit = signal<any>(null);
  heatmapData = signal<any[]>([]);
  last7Days: any[] = [];
  habitId = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.habitId = this.route.snapshot.paramMap.get('id') || '';
    this.computeLast7Days();
    this.loadData();
  }

  loadData() {
    this.api.getDashboard().subscribe(data => {
      const h = (data.habits || []).find((h: any) => h.id === this.habitId);
      if (h) this.habit.set(h);
    });
    this.api.getHeatmap(90).subscribe(data => this.heatmapData.set(data));
  }

  computeLast7Days() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    this.last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      this.last7Days.push({
        dayName: days[d.getDay()],
        dateNum: d.getDate(),
        date: d.toISOString().split('T')[0],
        isToday: i === 0,
      });
    }
  }

  getDayColor(date: string): string {
    const habit = this.habit();
    if (!habit) return 'var(--bg)';
    const entry = habit.todayEntry && date === new Date().toISOString().split('T')[0] ? habit.todayEntry : null;
    if (entry?.status === 'done') return habit.color + '40';
    return 'var(--bg)';
  }

  getDayText(date: string): string {
    const habit = this.habit();
    if (!habit) return 'var(--text)';
    const entry = habit.todayEntry && date === new Date().toISOString().split('T')[0] ? habit.todayEntry : null;
    if (entry?.status === 'done') return habit.color;
    return 'var(--text)';
  }

  toggleDay(date: string) {
    const habit = this.habit();
    if (!habit) return;
    const today = new Date().toISOString().split('T')[0];
    if (date !== today) return;
    const newStatus = habit.todayEntry?.status === 'done' ? 'skipped' : 'done';
    this.api.upsertEntry(this.habitId, date, newStatus).subscribe(() => this.loadData());
  }
}
