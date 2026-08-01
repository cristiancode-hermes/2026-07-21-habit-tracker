import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        displayName: string;
        orgName: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            organizationId: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            organizationId: string;
            isDarkMode: boolean;
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        displayName: string;
        isDarkMode: boolean;
        organizationId: string;
        organization: import("./entities/organization.entity").Organization;
        habits: import("../habits/entities/habit.entity").Habit[];
        goals: import("../goals/entities/goal.entity").Goal[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, body: {
        displayName?: string;
        isDarkMode?: boolean;
    }): Promise<{
        id: string;
        email: string;
        displayName: string;
        isDarkMode: boolean;
        organizationId: string;
        organization: import("./entities/organization.entity").Organization;
        habits: import("../habits/entities/habit.entity").Habit[];
        goals: import("../goals/entities/goal.entity").Goal[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
