import { HabitsService } from './habits.service';
export declare class HabitsController {
    private habitsService;
    constructor(habitsService: HabitsService);
    findAll(req: any, includeArchived?: string): Promise<import("./entities/habit.entity").Habit[]>;
    findOne(req: any, id: string): Promise<import("./entities/habit.entity").Habit>;
    create(req: any, body: {
        name: string;
        description?: string;
        frequency?: string;
        color?: string;
        icon?: string;
    }): Promise<import("./entities/habit.entity").Habit>;
    update(req: any, id: string, body: Partial<{
        name: string;
        description: string;
        frequency: string;
        color: string;
        icon: string;
    }>): Promise<import("./entities/habit.entity").Habit>;
    remove(req: any, id: string): Promise<import("typeorm").DeleteResult>;
}
