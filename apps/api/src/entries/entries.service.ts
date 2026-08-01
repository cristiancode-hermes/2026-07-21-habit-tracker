import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { HabitEntry } from './entities/habit-entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(HabitEntry)
    private entryRepository: Repository<HabitEntry>,
  ) {}

  async findByHabitAndDate(habitId: string, date: string) {
    return this.entryRepository.findOne({ where: { habitId, date } });
  }

  async findByHabitAndRange(habitId: string, startDate: string, endDate: string) {
    return this.entryRepository.find({
      where: { habitId, date: Between(startDate, endDate) },
      order: { date: 'ASC' },
    });
  }

  async findByDateRange(userHabitIds: string[], startDate: string, endDate: string) {
    return this.entryRepository.find({
      where: { habitId: userHabitIds.length === 1 ? userHabitIds[0] : undefined as any, date: Between(startDate, endDate) },
      order: { date: 'ASC' },
    });
  }

  async upsert(habitId: string, date: string, status: string, notes?: string) {
    const existing = await this.findByHabitAndDate(habitId, date);
    if (existing) {
      existing.status = status;
      if (notes !== undefined) existing.notes = notes;
      return this.entryRepository.save(existing);
    }
    const entry = this.entryRepository.create({ habitId, date, status, notes });
    return this.entryRepository.save(entry);
  }

  async getTodayEntries(userHabitIds: string[]) {
    const today = new Date().toISOString().split('T')[0];
    return this.entryRepository.find({
      where: { habitId: userHabitIds.length === 1 ? userHabitIds[0] : undefined as any, date: today },
    });
  }
}
