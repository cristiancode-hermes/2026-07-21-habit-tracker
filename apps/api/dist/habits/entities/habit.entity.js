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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habit = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const habit_entry_entity_1 = require("../../entries/entities/habit-entry.entity");
const goal_entity_1 = require("../../goals/entities/goal.entity");
let Habit = class Habit {
};
exports.Habit = Habit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Habit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Habit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Habit.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'daily' }),
    __metadata("design:type", String)
], Habit.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '#6366F1' }),
    __metadata("design:type", String)
], Habit.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'check' }),
    __metadata("design:type", String)
], Habit.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Habit.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Habit.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.habits),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Habit.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => habit_entry_entity_1.HabitEntry, (entry) => entry.habit),
    __metadata("design:type", Array)
], Habit.prototype, "entries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goal_entity_1.Goal, (goal) => goal.habit),
    __metadata("design:type", Array)
], Habit.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Habit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Habit.prototype, "updatedAt", void 0);
exports.Habit = Habit = __decorate([
    (0, typeorm_1.Entity)('habits')
], Habit);
//# sourceMappingURL=habit.entity.js.map