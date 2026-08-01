"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const habit_entity_1 = require("../habits/entities/habit.entity");
const habit_entry_entity_1 = require("../entries/entities/habit-entry.entity");
const goal_entity_1 = require("../goals/entities/goal.entity");
let DashboardService = class DashboardService {
    constructor(habitRepository, entryRepository, goalRepository) {
        this.habitRepository = habitRepository;
        this.entryRepository = entryRepository;
        this.goalRepository = goalRepository;
    }
    async getDashboard(userId) {
        const habits = await this.habitRepository.find({ where: { userId, archived: false } });
        const habitIds = habits.map(h => h.id);
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = habitIds.length > 0
            ? await this.entryRepository.find({ where: habitIds.map(id => ({ habitId: id, date: today })) })
            : [];
        const todayEntryMap = new Map(todayEntries.map(e => [e.habitId, e]));
        const habitsWithStreaks = await Promise.all(habits.map(async (habit) => {
            const entries = await this.entryRepository.find({
                where: { habitId: habit.id },
                order: { date: 'DESC' },
            });
            let currentStreak = 0;
            let longestStreak = 0;
            let streak = 0;
            const sortedDates = [...new Set(entries.filter(e => e.status === 'done').map(e => e.date))].sort().reverse();
            const todayStr = today;
            for (let i = 0; i < sortedDates.length; i++) {
                const expectedDate = new Date();
                expectedDate.setDate(expectedDate.getDate() - i);
                const expected = expectedDate.toISOString().split('T')[0];
                if (sortedDates[i] === expected) {
                    currentStreak++;
                }
                else {
                    break;
                }
            }
            let tempStreak = 0;
            for (let i = 0; i < sortedDates.length; i++) {
                if (i === 0) {
                    tempStreak = 1;
                }
                else {
                    const prev = new Date(sortedDates[i - 1]);
                    const curr = new Date(sortedDates[i]);
                    const diffDays = Math.round((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
                    if (diffDays === 1) {
                        tempStreak++;
                    }
                    else {
                        tempStreak = 1;
                    }
                }
                longestStreak = Math.max(longestStreak, tempStreak);
            }
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
        const goals = await this.goalRepository.find({ where: { userId, status: 'active' } });
        const goalsWithProgress = goals.map(g => ({
            ...g,
            progressPercent: Math.min(100, Math.round((g.currentCount / g.targetCount) * 100)),
        }));
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
    async getHeatmap(userId, days = 90) {
        const habits = await this.habitRepository.find({ where: { userId, archived: false } });
        const habitIds = habits.map(h => h.id);
        if (habitIds.length === 0)
            return [];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const entries = await this.entryRepository.find({
            where: { habitId: habitIds.length === 1 ? habitIds[0] : undefined },
            order: { date: 'ASC' },
        });
        const dateMap = new Map();
        for (const entry of entries) {
            if (habitIds.includes(entry.habitId)) {
                const existing = dateMap.get(entry.date) || { total: 0, done: 0 };
                existing.total++;
                if (entry.status === 'done')
                    existing.done++;
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(habit_entity_1.Habit)),
    __param(1, (0, typeorm_1.InjectRepository)(habit_entry_entity_1.HabitEntry)),
    __param(2, (0, typeorm_1.InjectRepository)(goal_entity_1.Goal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map