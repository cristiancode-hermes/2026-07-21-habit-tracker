import { Repository } from 'typeorm';
import { Organization } from '../auth/entities/organization.entity';
import { User } from '../auth/entities/user.entity';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';
export declare class SeedService {
    private orgRepository;
    private userRepository;
    private habitRepository;
    private entryRepository;
    private goalRepository;
    private readonly logger;
    constructor(orgRepository: Repository<Organization>, userRepository: Repository<User>, habitRepository: Repository<Habit>, entryRepository: Repository<HabitEntry>, goalRepository: Repository<Goal>);
    seed(): Promise<{
        message: string;
        orgId: string;
        userId: string;
    }>;
}
