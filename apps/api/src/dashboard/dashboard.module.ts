import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitEntry, Goal])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
