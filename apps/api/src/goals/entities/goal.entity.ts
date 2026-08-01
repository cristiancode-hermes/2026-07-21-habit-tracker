import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Habit } from '../../habits/entities/habit.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int' })
  targetCount: number;

  @Column({ type: 'int', default: 0 })
  currentCount: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ default: 'active' })
  status: string; // active, completed, expired

  @Column({ type: 'uuid' })
  habitId: string;

  @ManyToOne(() => Habit, (habit) => habit.goals)
  @JoinColumn({ name: 'habitId' })
  habit: Habit;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
