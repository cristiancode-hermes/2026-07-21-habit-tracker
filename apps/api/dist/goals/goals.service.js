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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const goal_entity_1 = require("./entities/goal.entity");
let GoalsService = class GoalsService {
    constructor(goalRepository) {
        this.goalRepository = goalRepository;
    }
    async findAll(userId, status) {
        const where = { userId };
        if (status)
            where.status = status;
        return this.goalRepository.find({ where, order: { createdAt: 'DESC' } });
    }
    async findOne(id, userId) {
        const goal = await this.goalRepository.findOne({ where: { id, userId } });
        if (!goal)
            throw new common_1.NotFoundException('Goal not found');
        return goal;
    }
    async create(userId, data) {
        const goal = this.goalRepository.create({ ...data, userId, currentCount: 0, status: 'active' });
        return this.goalRepository.save(goal);
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        await this.goalRepository.update(id, data);
        return this.findOne(id, userId);
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.goalRepository.delete(id);
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_entity_1.Goal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GoalsService);
//# sourceMappingURL=goals.service.js.map