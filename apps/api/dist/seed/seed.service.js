"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const organization_entity_1 = require("../auth/entities/organization.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const habit_entity_1 = require("../habits/entities/habit.entity");
const habit_entry_entity_1 = require("../entries/entities/habit-entry.entity");
const goal_entity_1 = require("../goals/entities/goal.entity");
let SeedService = SeedService_1 = class SeedService {
    constructor(orgRepository, userRepository, habitRepository, entryRepository, goalRepository) {
        this.orgRepository = orgRepository;
        this.userRepository = userRepository;
        this.habitRepository = habitRepository;
        this.entryRepository = entryRepository;
        this.goalRepository = goalRepository;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async seed() {
        this.logger.log('Seeding database...');
        let org = await this.orgRepository.findOne({ where: { name: 'Demo Org' } });
        if (!org) {
            org = this.orgRepository.create({ name: 'Demo Org', description: 'Demo organization for testing' });
            org = await this.orgRepository.save(org);
        }
        let user = await this.userRepository.findOne({ where: { email: 'demo@example.com' } });
        if (!user) {
            const passwordHash = await bcrypt.hash('demo1234', 10);
            user = this.userRepository.create({
                email: 'demo@example.com',
                passwordHash,
                displayName: 'Demo User',
                organizationId: org.id,
            });
            user = await this.userRepository.save(user);
        }
        const habitData = [
            { name: 'Drink Water', description: 'Drink 8 glasses of water', frequency: 'daily', color: '#3B82F6', icon: 'droplet' },
            { name: 'Morning Exercise', description: '30 min exercise', frequency: 'daily', color: '#22C55E', icon: 'zap' },
            { name: 'Read Books', description: 'Read for 20 minutes', frequency: 'daily', color: '#A855F7', icon: 'book' },
            { name: 'Meditate', description: '10 min meditation', frequency: 'daily', color: '#F59E0B', icon: 'heart' },
            { name: 'Write Journal', description: 'Write daily journal entry', frequency: 'daily', color: '#EC4899', icon: 'edit' },
            { name: 'Code Practice', description: 'Practice coding for 1 hour', frequency: 'daily', color: '#6366F1', icon: 'code' },
        ];
        const habits = [];
        for (const data of habitData) {
            let habit = await this.habitRepository.findOne({ where: { name: data.name, userId: user.id } });
            if (!habit) {
                habit = this.habitRepository.create({ ...data, userId: user.id });
                habit = await this.habitRepository.save(habit);
            }
            habits.push(habit);
        }
        const today = new Date();
        for (const habit of habits) {
            for (let i = 0; i < 30; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const existing = await this.entryRepository.findOne({ where: { habitId: habit.id, date: dateStr } });
                if (!existing) {
                    const status = Math.random() < 0.8 ? 'done' : 'skipped';
                    await this.entryRepository.save(this.entryRepository.create({ habitId: habit.id, date: dateStr, status }));
                }
            }
        }
        const goalData = [
            { title: '30-Day Water Streak', targetCount: 30, habitId: habits[0].id, startDate: new Date(today.getTime() - 30 * 86400000).toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] },
            { title: 'Read 10 Books This Month', targetCount: 10, habitId: habits[2].id, startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0], endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] },
            { title: 'Meditate 20 Times', targetCount: 20, habitId: habits[3].id, startDate: new Date(today.getTime() - 20 * 86400000).toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] },
        ];
        for (const data of goalData) {
            const existing = await this.goalRepository.findOne({ where: { title: data.title, userId: user.id } });
            if (!existing) {
                const entries = await this.entryRepository.find({ where: { habitId: data.habitId, status: 'done' } });
                const goal = this.goalRepository.create({ ...data, userId: user.id, currentCount: entries.length, status: 'active' });
                await this.goalRepository.save(goal);
            }
        }
        this.logger.log('Seed completed successfully');
        return { message: 'Database seeded', orgId: org.id, userId: user.id };
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(habit_entity_1.Habit)),
    __param(3, (0, typeorm_1.InjectRepository)(habit_entry_entity_1.HabitEntry)),
    __param(4, (0, typeorm_1.InjectRepository)(goal_entity_1.Goal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map