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
exports.HabitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const habit_entity_1 = require("./entities/habit.entity");
let HabitsService = class HabitsService {
    constructor(habitRepository) {
        this.habitRepository = habitRepository;
    }
    async findAll(userId, includeArchived = false) {
        const where = { userId };
        if (!includeArchived)
            where.archived = false;
        return this.habitRepository.find({ where, order: { createdAt: 'DESC' } });
    }
    async findOne(id, userId) {
        const habit = await this.habitRepository.findOne({ where: { id, userId } });
        if (!habit)
            throw new common_1.NotFoundException('Habit not found');
        return habit;
    }
    async create(userId, data) {
        const habit = this.habitRepository.create({ ...data, userId });
        return this.habitRepository.save(habit);
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        await this.habitRepository.update(id, data);
        return this.findOne(id, userId);
    }
    async archive(id, userId) {
        return this.update(id, userId, { archived: true });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.habitRepository.delete(id);
    }
};
exports.HabitsService = HabitsService;
exports.HabitsService = HabitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(habit_entity_1.Habit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HabitsService);
//# sourceMappingURL=habits.service.js.map