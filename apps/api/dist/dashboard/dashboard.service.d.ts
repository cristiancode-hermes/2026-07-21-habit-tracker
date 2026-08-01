import { Repository } from 'typeorm';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';
export declare class DashboardService {
    private habitRepository;
    private entryRepository;
    private goalRepository;
    constructor(habitRepository: Repository<Habit>, entryRepository: Repository<HabitEntry>, goalRepository: Repository<Goal>);
    getDashboard(userId: string): Promise<{
        summary: {
            totalHabits: number;
            doneToday: number;
            onStreak: number;
            activeGoals: number;
        };
        habits: {
            todayEntry: HabitEntry;
            currentStreak: number;
            longestStreak: number;
            weeklyConsistency: number;
            id: string;
            name: string;
            description: string;
            frequency: string;
            color: string;
            icon: string;
            archived: boolean;
            userId: string;
            user: import("../auth/entities/user.entity").User;
            entries: HabitEntry[];
            goals: Goal[];
            createdAt: Date;
            updatedAt: Date;
        }[];
        goals: {
            progressPercent: number;
            id: string;
            title: string;
            description: string;
            targetCount: number;
            currentCount: number;
            startDate: string;
            endDate: string;
            status: string;
            habitId: string;
            habit: Habit;
            userId: string;
            user: import("../auth/entities/user.entity").User;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getHeatmap(userId: string, days?: number): Promise<any[]>;
}
