import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Habit } from '../../habits/entities/habit.entity';

@Entity('habit_entries')
export class HabitEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 'done' })
  status: string; // done, skipped

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'uuid' })
  habitId: string;

  @ManyToOne(() => Habit, (habit) => habit.entries)
  @JoinColumn({ name: 'habitId' })
  habit: Habit;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
