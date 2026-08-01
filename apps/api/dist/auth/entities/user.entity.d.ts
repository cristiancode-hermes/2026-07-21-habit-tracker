import { Organization } from './organization.entity';
import { Habit } from '../../habits/entities/habit.entity';
import { Goal } from '../../goals/entities/goal.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    displayName: string;
    isDarkMode: boolean;
    organizationId: string;
    organization: Organization;
    habits: Habit[];
    goals: Goal[];
    createdAt: Date;
    updatedAt: Date;
}
