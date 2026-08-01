import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  async findAll(userId: string, status?: string) {
    const where: any = { userId };
    if (status) where.status = status;
    return this.goalRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, userId: string) {
    const goal = await this.goalRepository.findOne({ where: { id, userId } });
    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async create(userId: string, data: Partial<Goal>) {
    const goal = this.goalRepository.create({ ...data, userId, currentCount: 0, status: 'active' });
    return this.goalRepository.save(goal);
  }

  async update(id: string, userId: string, data: Partial<Goal>) {
    await this.findOne(id, userId);
    await this.goalRepository.update(id, data);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.goalRepository.delete(id);
  }
}
