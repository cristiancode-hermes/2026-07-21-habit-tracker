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
exports.EntriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const entries_service_1 = require("./entries.service");
let EntriesController = class EntriesController {
    constructor(entriesService) {
        this.entriesService = entriesService;
    }
    upsert(habitId, date, body) {
        return this.entriesService.upsert(habitId, date, body.status, body.notes);
    }
    findByHabit(habitId, startDate, endDate) {
        if (startDate && endDate) {
            return this.entriesService.findByHabitAndRange(habitId, startDate, endDate);
        }
        return this.entriesService.findByHabitAndDate(habitId, new Date().toISOString().split('T')[0]);
    }
};
exports.EntriesController = EntriesController;
__decorate([
    (0, common_1.Post)(':habitId/:date'),
    __param(0, (0, common_1.Param)('habitId')),
    __param(1, (0, common_1.Param)('date')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], EntriesController.prototype, "upsert", null);
__decorate([
    (0, common_1.Get)(':habitId'),
    __param(0, (0, common_1.Param)('habitId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], EntriesController.prototype, "findByHabit", null);
exports.EntriesController = EntriesController = __decorate([
    (0, swagger_1.ApiTags)('entries'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('entries'),
    __metadata("design:paramtypes", [entries_service_1.EntriesService])
], EntriesController);
//# sourceMappingURL=entries.controller.js.map