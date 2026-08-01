import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Goals</h1>
        <button (click)="showForm = !showForm"
                class="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style="background-color: #6366F1;">
          + New Goal
        </button>
      </div>

      <!-- Create form -->
      <div *ngIf="showForm" class="p-6 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
        <h2 class="text-lg font-semibold mb-4">New Goal</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium">Title</label>
            <input [(ngModel)]="newGoal.title" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Target Count</label>
            <input type="number" [(ngModel)]="newGoal.targetCount" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">Start Date</label>
            <input type="date" [(ngModel)]="newGoal.startDate" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div>
            <label class="text-sm font-medium">End Date</label>
            <input type="date" [(ngModel)]="newGoal.endDate" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-medium">Habit</label>
            <select [(ngModel)]="newGoal.habitId" class="w-full px-3 py-2 rounded-lg border text-sm" style="background-color: var(--bg); border-color: var(--border); color: var(--text);">
              <option value="">Select a habit...</option>
              <option *ngFor="let habit of habits()" [value]="habit.id">{{ habit.name }}</option>
            </select>
          </div>
        </div>
        <button (click)="createGoal()" class="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style="background-color: #6366F1;">
          Create Goal
        </button>
      </div>

      <!-- Goals list -->
      <div *ngIf="goals().length === 0" class="text-center py-12" style="color: var(--text-secondary);">
        <div class="text-4xl mb-3">🎯</div>
        <p class="font-medium">No goals yet</p>
        <p class="text-sm">Set measurable targets for your habits</p>
      </div>
      <div class="space-y-4">
        <div *ngFor="let goal of goals()" 
             class="p-5 rounded-xl shadow-sm" style="background-color: var(--card-bg);">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-semibold">{{ goal.title }}</h3>
              <p class="text-xs mt-1" style="color: var(--text-secondary);">
                {{ goal.startDate }} → {{ goal.endDate }}
              </p>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold"
                  [style.backgroundColor]="goal.status === 'completed' ? '#DCFCE7' : goal.status === 'active' ? '#DBEAFE' : '#F3F4F6'"
                  [style.color]="goal.status === 'completed' ? '#166534' : goal.status === 'active' ? '#1E40AF' : '#6B7280'">
              {{ goal.status }}
            </span>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span class="font-medium">{{ goal.currentCount }} / {{ goal.targetCount }}</span>
            </div>
            <div class="w-full h-3 rounded-full" style="background-color: var(--border);">
              <div class="h-3 rounded-full transition-all duration-500 flex items-center justify-center text-xs text-white font-semibold"
                   [style.width.%]="goal.progressPercent"
                   [style.backgroundColor]="goal.progressPercent >= 100 ? '#22C55E' : '#6366F1'">
                <span *ngIf="goal.progressPercent >= 30">{{ goal.progressPercent }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GoalsComponent implements OnInit {
  goals = signal<any[]>([]);
  habits = signal<any[]>([]);
  showForm = false;
  newGoal: any = { title: '', targetCount: 10, startDate: '', endDate: '', habitId: '' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getGoals().subscribe(data => this.goals.set(data || []));
    this.api.getDashboard().subscribe(d => this.habits.set(d.habits || []));
  }

  createGoal() {
    if (!this.newGoal.habitId) return;
    this.api.createGoal(this.newGoal).subscribe(() => {
      this.showForm = false;
      this.newGoal = { title: '', targetCount: 10, startDate: '', endDate: '', habitId: '' };
      this.loadData();
    });
  }
}
