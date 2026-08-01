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
exports.EntriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const habit_entry_entity_1 = require("./entities/habit-entry.entity");
let EntriesService = class EntriesService {
    constructor(entryRepository) {
        this.entryRepository = entryRepository;
    }
    async findByHabitAndDate(habitId, date) {
        return this.entryRepository.findOne({ where: { habitId, date } });
    }
    async findByHabitAndRange(habitId, startDate, endDate) {
        return this.entryRepository.find({
            where: { habitId, date: (0, typeorm_2.Between)(startDate, endDate) },
            order: { date: 'ASC' },
        });
    }
    async findByDateRange(userHabitIds, startDate, endDate) {
        return this.entryRepository.find({
            where: { habitId: userHabitIds.length === 1 ? userHabitIds[0] : undefined, date: (0, typeorm_2.Between)(startDate, endDate) },
            order: { date: 'ASC' },
        });
    }
    async upsert(habitId, date, status, notes) {
        const existing = await this.findByHabitAndDate(habitId, date);
        if (existing) {
            existing.status = status;
            if (notes !== undefined)
                existing.notes = notes;
            return this.entryRepository.save(existing);
        }
        const entry = this.entryRepository.create({ habitId, date, status, notes });
        return this.entryRepository.save(entry);
    }
    async getTodayEntries(userHabitIds) {
        const today = new Date().toISOString().split('T')[0];
        return this.entryRepository.find({
            where: { habitId: userHabitIds.length === 1 ? userHabitIds[0] : undefined, date: today },
        });
    }
};
exports.EntriesService = EntriesService;
exports.EntriesService = EntriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(habit_entry_entity_1.HabitEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EntriesService);
//# sourceMappingURL=entries.service.js.map