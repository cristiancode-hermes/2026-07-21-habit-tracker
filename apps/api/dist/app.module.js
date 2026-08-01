"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const habits_module_1 = require("./habits/habits.module");
const entries_module_1 = require("./entries/entries.module");
const goals_module_1 = require("./goals/goals.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const seed_module_1 = require("./seed/seed.module");
const organization_entity_1 = require("./auth/entities/organization.entity");
const user_entity_1 = require("./auth/entities/user.entity");
const habit_entity_1 = require("./habits/entities/habit.entity");
const habit_entry_entity_1 = require("./entries/entities/habit-entry.entity");
const goal_entity_1 = require("./goals/entities/goal.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'data/habit-tracker.db',
                entities: [organization_entity_1.Organization, user_entity_1.User, habit_entity_1.Habit, habit_entry_entity_1.HabitEntry, goal_entity_1.Goal],
                synchronize: true,
                autoLoadEntities: true,
            }),
            auth_module_1.AuthModule,
            habits_module_1.HabitsModule,
            entries_module_1.EntriesModule,
            goals_module_1.GoalsModule,
            dashboard_module_1.DashboardModule,
            seed_module_1.SeedModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map