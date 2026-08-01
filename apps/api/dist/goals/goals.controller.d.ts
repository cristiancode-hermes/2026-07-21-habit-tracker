import { GoalsService } from './goals.service';
export declare class GoalsController {
    private goalsService;
    constructor(goalsService: GoalsService);
    findAll(req: any, status?: string): Promise<import("./entities/goal.entity").Goal[]>;
    findOne(req: any, id: string): Promise<import("./entities/goal.entity").Goal>;
    create(req: any, body: {
        title: string;
        description?: string;
        targetCount: number;
        habitId: string;
        startDate: string;
        endDate: string;
    }): Promise<import("./entities/goal.entity").Goal>;
    update(req: any, id: string, body: Partial<{
        title: string;
        description: string;
        targetCount: number;
        currentCount: number;
        status: string;
    }>): Promise<import("./entities/goal.entity").Goal>;
    remove(req: any, id: string): Promise<import("typeorm").DeleteResult>;
}
