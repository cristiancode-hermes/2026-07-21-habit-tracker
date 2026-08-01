import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  async findAll(userId: string, includeArchived = false) {
    const where: any = { userId };
    if (!includeArchived) where.archived = false;
    return this.habitRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, userId: string) {
    const habit = await this.habitRepository.findOne({ where: { id, userId } });
    if (!habit) throw new NotFoundException('Habit not found');
    return habit;
  }

  async create(userId: string, data: Partial<Habit>) {
    const habit = this.habitRepository.create({ ...data, userId });
    return this.habitRepository.save(habit);
  }

  async update(id: string, userId: string, data: Partial<Habit>) {
    await this.findOne(id, userId);
    await this.habitRepository.update(id, data);
    return this.findOne(id, userId);
  }

  async archive(id: string, userId: string) {
    return this.update(id, userId, { archived: true } as any);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.habitRepository.delete(id);
  }
}
