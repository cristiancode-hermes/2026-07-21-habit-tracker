import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(HabitEntry)
    private entryRepository: Repository<HabitEntry>,
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  async getDashboard(userId: string) {
    const habits = await this.habitRepository.find({ where: { userId, archived: false } });
    const habitIds = habits.map(h => h.id);
    const today = new Date().toISOString().split('T')[0];

    // Today's entries
    const todayEntries = habitIds.length > 0
      ? await this.entryRepository.find({ where: habitIds.map(id => ({ habitId: id, date: today })) })
      : [];

    const todayEntryMap = new Map(todayEntries.map(e => [e.habitId, e]));

    // Compute streaks
    const habitsWithStreaks = await Promise.all(habits.map(async (habit) => {
      const entries = await this.entryRepository.find({
        where: { habitId: habit.id },
        order: { date: 'DESC' },
      });

      let currentStreak = 0;
      let longestStreak = 0;
      let streak = 0;
      const sortedDates = [...new Set(entries.filter(e => e.status === 'done').map(e => e.date))].sort().reverse();

      // Current streak
      const todayStr = today;
      for (let i = 0; i < sortedDates.length; i++) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        const expected = expectedDate.toISOString().split('T')[0];
        if (sortedDates[i] === expected) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Longest streak
      let tempStreak = 0;
      for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
          tempStreak = 1;
        } else {
          const prev = new Date(sortedDates[i - 1]);
          const curr = new Date(sortedDates[i]);
          const diffDays = Math.round((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      // Weekly consistency (last 7 days)
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split('T')[0]);
      }
      const weekEntries = entries.filter(e => last7Days.includes(e.date) && e.status === 'done');
      const weeklyConsistency = Math.round((weekEntries.length / 7) * 100);

      return {
        ...habit,
        todayEntry: todayEntryMap.get(habit.id) || null,
        currentStreak,
        longestStreak,
        weeklyConsistency,
      };
    }));

    // Goals
    const goals = await this.goalRepository.find({ where: { userId, status: 'active' } });
    const goalsWithProgress = goals.map(g => ({
      ...g,
      progressPercent: Math.min(100, Math.round((g.currentCount / g.targetCount) * 100)),
    }));

    // Summary stats
    const totalHabits = habits.length;
    const doneToday = todayEntries.filter(e => e.status === 'done').length;
    const onStreak = habitsWithStreaks.filter(h => h.currentStreak >= 7).length;
    const activeGoals = goals.filter(g => g.status === 'active').length;

    return {
      summary: { totalHabits, doneToday, onStreak, activeGoals },
      habits: habitsWithStreaks,
      goals: goalsWithProgress,
    };
  }

  async getHeatmap(userId: string, days = 90) {
    const habits = await this.habitRepository.find({ where: { userId, archived: false } });
    const habitIds = habits.map(h => h.id);
    if (habitIds.length === 0) return [];

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const entries = await this.entryRepository.find({
      where: { habitId: habitIds.length === 1 ? habitIds[0] : undefined as any },
      order: { date: 'ASC' },
    });

    // Group by date
    const dateMap = new Map<string, { total: number; done: number }>();
    for (const entry of entries) {
      if (habitIds.includes(entry.habitId)) {
        const existing = dateMap.get(entry.date) || { total: 0, done: 0 };
        existing.total++;
        if (entry.status === 'done') existing.done++;
        dateMap.set(entry.date, existing);
      }
    }

    const result = [];
    for (let i = days; i >= 0; i--) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const data = dateMap.get(dateStr);
      result.push({
        date: dateStr,
        count: data ? data.done : 0,
        total: data ? data.total : 0,
      });
    }

    return result;
  }
}
