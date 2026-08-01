import { Habit } from '../../habits/entities/habit.entity';
export declare class HabitEntry {
    id: string;
    date: string;
    status: string;
    notes: string;
    habitId: string;
    habit: Habit;
    createdAt: Date;
    updatedAt: Date;
}
