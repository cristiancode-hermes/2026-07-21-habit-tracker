import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(req: any): Promise<{
        summary: {
            totalHabits: number;
            doneToday: number;
            onStreak: number;
            activeGoals: number;
        };
        habits: {
            todayEntry: import("../entries/entities/habit-entry.entity").HabitEntry;
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
            entries: import("../entries/entities/habit-entry.entity").HabitEntry[];
            goals: import("../goals/entities/goal.entity").Goal[];
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
            habit: import("../habits/entities/habit.entity").Habit;
            userId: string;
            user: import("../auth/entities/user.entity").User;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getHeatmap(req: any, days?: string): Promise<any[]>;
}
