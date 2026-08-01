import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';
export declare class HabitsService {
    private habitRepository;
    constructor(habitRepository: Repository<Habit>);
    findAll(userId: string, includeArchived?: boolean): Promise<Habit[]>;
    findOne(id: string, userId: string): Promise<Habit>;
    create(userId: string, data: Partial<Habit>): Promise<Habit>;
    update(id: string, userId: string, data: Partial<Habit>): Promise<Habit>;
    archive(id: string, userId: string): Promise<Habit>;
    remove(id: string, userId: string): Promise<import("typeorm").DeleteResult>;
}
