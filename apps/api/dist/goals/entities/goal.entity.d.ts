import { User } from '../../auth/entities/user.entity';
import { Habit } from '../../habits/entities/habit.entity';
export declare class Goal {
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
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
