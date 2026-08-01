import { Repository } from 'typeorm';
import { HabitEntry } from './entities/habit-entry.entity';
export declare class EntriesService {
    private entryRepository;
    constructor(entryRepository: Repository<HabitEntry>);
    findByHabitAndDate(habitId: string, date: string): Promise<HabitEntry>;
    findByHabitAndRange(habitId: string, startDate: string, endDate: string): Promise<HabitEntry[]>;
    findByDateRange(userHabitIds: string[], startDate: string, endDate: string): Promise<HabitEntry[]>;
    upsert(habitId: string, date: string, status: string, notes?: string): Promise<HabitEntry>;
    getTodayEntries(userHabitIds: string[]): Promise<HabitEntry[]>;
}
