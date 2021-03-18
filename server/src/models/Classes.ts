import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import User from './User';
import ClassesSchedule from './ClassesSchedule';

@Entity('classes')
class Classes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  subject: string;

  @Column()
  cost: number;

  @ManyToOne(type => User, user => user.classes) 
  @JoinColumn({ name: 'user_id' })
  user: User;

 @OneToMany(type => ClassesSchedule, class_schedule => class_schedule.classes)
 class_schedule: ClassesSchedule[];
}

export default Classes;
