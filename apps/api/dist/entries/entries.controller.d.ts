import { EntriesService } from './entries.service';
export declare class EntriesController {
    private entriesService;
    constructor(entriesService: EntriesService);
    upsert(habitId: string, date: string, body: {
        status: string;
        notes?: string;
    }): Promise<import("./entities/habit-entry.entity").HabitEntry>;
    findByHabit(habitId: string, startDate?: string, endDate?: string): Promise<import("./entities/habit-entry.entity").HabitEntry> | Promise<import("./entities/habit-entry.entity").HabitEntry[]>;
}
