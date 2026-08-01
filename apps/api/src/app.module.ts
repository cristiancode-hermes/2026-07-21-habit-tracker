import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HabitsModule } from './habits/habits.module';
import { EntriesModule } from './entries/entries.module';
import { GoalsModule } from './goals/goals.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SeedModule } from './seed/seed.module';
import { Organization } from './auth/entities/organization.entity';
import { User } from './auth/entities/user.entity';
import { Habit } from './habits/entities/habit.entity';
import { HabitEntry } from './entries/entities/habit-entry.entity';
import { Goal } from './goals/entities/goal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/habit-tracker.db',
      entities: [Organization, User, Habit, HabitEntry, Goal],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    HabitsModule,
    EntriesModule,
    GoalsModule,
    DashboardModule,
    SeedModule,
  ],
})
export class AppModule {}
