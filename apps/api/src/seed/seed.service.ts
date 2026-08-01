import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Organization } from '../auth/entities/organization.entity';
import { User } from '../auth/entities/user.entity';
import { Habit } from '../habits/entities/habit.entity';
import { HabitEntry } from '../entries/entities/habit-entry.entity';
import { Goal } from '../goals/entities/goal.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(HabitEntry)
    private entryRepository: Repository<HabitEntry>,
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  async seed() {
    this.logger.log('Seeding database...');

    // Create organization
    let org = await this.orgRepository.findOne({ where: { name: 'Demo Org' } });
    if (!org) {
      org = this.orgRepository.create({ name: 'Demo Org', description: 'Demo organization for testing' });
      org = await this.orgRepository.save(org);
    }

    // Create demo user
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

    // Create habits
    const habitData = [
      { name: 'Drink Water', description: 'Drink 8 glasses of water', frequency: 'daily', color: '#3B82F6', icon: 'droplet' },
      { name: 'Morning Exercise', description: '30 min exercise', frequency: 'daily', color: '#22C55E', icon: 'zap' },
      { name: 'Read Books', description: 'Read for 20 minutes', frequency: 'daily', color: '#A855F7', icon: 'book' },
      { name: 'Meditate', description: '10 min meditation', frequency: 'daily', color: '#F59E0B', icon: 'heart' },
      { name: 'Write Journal', description: 'Write daily journal entry', frequency: 'daily', color: '#EC4899', icon: 'edit' },
      { name: 'Code Practice', description: 'Practice coding for 1 hour', frequency: 'daily', color: '#6366F1', icon: 'code' },
    ];

    const habits: Habit[] = [];
    for (const data of habitData) {
      let habit = await this.habitRepository.findOne({ where: { name: data.name, userId: user.id } });
      if (!habit) {
        habit = this.habitRepository.create({ ...data, userId: user.id });
        habit = await this.habitRepository.save(habit);
      }
      habits.push(habit);
    }

    // Create entries for last 30 days
    const today = new Date();
    for (const habit of habits) {
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const existing = await this.entryRepository.findOne({ where: { habitId: habit.id, date: dateStr } });
        if (!existing) {
          // 80% chance of being done
          const status = Math.random() < 0.8 ? 'done' : 'skipped';
          await this.entryRepository.save(
            this.entryRepository.create({ habitId: habit.id, date: dateStr, status })
          );
        }
      }
    }

    // Create goals
    const goalData = [
      { title: '30-Day Water Streak', targetCount: 30, habitId: habits[0].id, startDate: new Date(today.getTime() - 30*86400000).toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] },
      { title: 'Read 10 Books This Month', targetCount: 10, habitId: habits[2].id, startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0], endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] },
      { title: 'Meditate 20 Times', targetCount: 20, habitId: habits[3].id, startDate: new Date(today.getTime() - 20*86400000).toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] },
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
}
