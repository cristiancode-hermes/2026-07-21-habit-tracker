import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { StreakBadgeComponent } from '../../shared/components/streak-badge/streak-badge.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule, StreakBadgeComponent],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">My Habits</h1>
        <button (click)="showForm = !showForm"
                class="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style="background-color: #6366F1;">
          + New Habit
        </button>
      </div>

      <!-- Create form -->
      <div *ngIf="showForm" class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">New Habit</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium">Name</label>
            <input [(ngModel)]="newHabit.name" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Description</label>
            <input [(ngModel)]="newHabit.description" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Color</label>
            <input type="color" [(ngModel)]="newHabit.color" class="w-full h-10 rounded-lg border" style="border-color: var(--border);">
          </div>
          <div>
            <label class="text-sm font-medium">Icon</label>
            <select [(ngModel)]="newHabit.icon" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
              <option value="check">✓ Check</option>
              <option value="zap">⚡ Zap</option>
              <option value="heart">❤️ Heart</option>
              <option value="book">📚 Book</option>
              <option value="edit">✏️ Edit</option>
              <option value="code">💻 Code</option>
              <option value="droplet">💧 Droplet</option>
              <option value="star">⭐ Star</option>
            </select>
          </div>
        </div>
        <button (click)="createHabit()" class="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style="background-color: #6366F1;">
          Create Habit
        </button>
      </div>

      <!-- Habits grid -->
      <div *ngIf="habits().length === 0" class="text-center py-12" style="color: var(--text-secondary);">
        <div class="text-4xl mb-3">📋</div>
        <p class="font-medium">No habits yet</p>
        <p class="text-sm">Create your first habit to start tracking</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let habit of habits()" 
             class="p-4 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer"
             style="background-color: var(--card-bg);"
             [routerLink]="['/habits', habit.id]">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                 [style.backgroundColor]="habit.color + '20'">
              <span *ngIf="habit.icon === 'check'">✓</span>
              <span *ngIf="habit.icon === 'zap'">⚡</span>
              <span *ngIf="habit.icon === 'heart'">❤️</span>
              <span *ngIf="habit.icon === 'book'">📚</span>
              <span *ngIf="habit.icon === 'edit'">✏️</span>
              <span *ngIf="habit.icon === 'code'">💻</span>
              <span *ngIf="habit.icon === 'droplet'">💧</span>
              <span *ngIf="habit.icon === 'star'">⭐</span>
            </div>
            <app-streak-badge [streak]="habit.currentStreak || 0" />
          </div>
          <h3 class="font-semibold text-sm">{{ habit.name }}</h3>
          <p class="text-xs mt-1" style="color: var(--text-secondary);">{{ habit.description || 'No description' }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-xs" style="color: var(--text-secondary);">{{ habit.frequency }}</span>
            <span class="text-xs font-medium" style="color: #6366F1;">View →</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HabitsComponent implements OnInit {
  habits = signal<any[]>([]);
  showForm = false;
  newHabit: any = { name: '', description: '', color: '#6366F1', icon: 'check', frequency: 'daily' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    this.api.getDashboard().subscribe(data => {
      this.habits.set(data.habits || []);
    });
  }

  createHabit() {
    this.api.createHabit(this.newHabit).subscribe(() => {
      this.showForm = false;
      this.newHabit = { name: '', description: '', color: '#6366F1', icon: 'check', frequency: 'daily' };
      this.loadHabits();
    });
  }
}
