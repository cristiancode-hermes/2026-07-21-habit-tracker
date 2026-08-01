import { User } from './user.entity';
export declare class Organization {
    id: string;
    name: string;
    description: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
