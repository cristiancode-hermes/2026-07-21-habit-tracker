import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Organization } from '../auth/entities/organization.entity';
import { User } from '../auth/entities/user.entity';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, User, Habit, HabitEntry, Goal])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
