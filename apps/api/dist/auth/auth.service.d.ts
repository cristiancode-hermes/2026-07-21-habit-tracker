import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Organization } from './entities/organization.entity';
import { User } from './entities/user.entity';
export declare class AuthService {
    private orgRepository;
    private userRepository;
    private jwtService;
    constructor(orgRepository: Repository<Organization>, userRepository: Repository<User>, jwtService: JwtService);
    register(email: string, password: string, displayName: string, orgName: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            organizationId: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            organizationId: string;
            isDarkMode: boolean;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        displayName: string;
        isDarkMode: boolean;
        organizationId: string;
        organization: Organization;
        habits: import("../habits/entities/habit.entity").Habit[];
        goals: import("../goals/entities/goal.entity").Goal[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, data: Partial<User>): Promise<{
        id: string;
        email: string;
        displayName: string;
        isDarkMode: boolean;
        organizationId: string;
        organization: Organization;
        habits: import("../habits/entities/habit.entity").Habit[];
        goals: import("../goals/entities/goal.entity").Goal[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
