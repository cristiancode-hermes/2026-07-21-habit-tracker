import { User } from '../../auth/entities/user.entity';
import { HabitEntry } from '../../entries/entities/habit-entry.entity';
import { Goal } from '../../goals/entities/goal.entity';
export declare class Habit {
    id: string;
    name: string;
    description: string;
    frequency: string;
    color: string;
    icon: string;
    archived: boolean;
    userId: string;
    user: User;
    entries: HabitEntry[];
    goals: Goal[];
    createdAt: Date;
    updatedAt: Date;
}
