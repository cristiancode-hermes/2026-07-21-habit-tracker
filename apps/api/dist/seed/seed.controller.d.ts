import { SeedService } from './seed.service';
export declare class SeedController {
    private seedService;
    constructor(seedService: SeedService);
    seed(): Promise<{
        message: string;
        orgId: string;
        userId: string;
    }>;
}
