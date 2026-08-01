import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { HabitEntry } from '../../entries/entities/habit-entry.entity';
import { Goal } from '../../goals/entities/goal.entity';

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'daily' })
  frequency: string; // daily, weekly, monthly

  @Column({ default: '#6366F1' })
  color: string;

  @Column({ default: 'check' })
  icon: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => HabitEntry, (entry) => entry.habit)
  entries: HabitEntry[];

  @OneToMany(() => Goal, (goal) => goal.habit)
  goals: Goal[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
