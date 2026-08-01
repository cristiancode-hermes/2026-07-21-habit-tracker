import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
export declare class GoalsService {
    private goalRepository;
    constructor(goalRepository: Repository<Goal>);
    findAll(userId: string, status?: string): Promise<Goal[]>;
    findOne(id: string, userId: string): Promise<Goal>;
    create(userId: string, data: Partial<Goal>): Promise<Goal>;
    update(id: string, userId: string, data: Partial<Goal>): Promise<Goal>;
    remove(id: string, userId: string): Promise<import("typeorm").DeleteResult>;
}
