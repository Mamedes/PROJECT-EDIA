import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Classes from './Classes';

@Entity('class_schedule')
class ClassesSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string; 

  @Column()
  week_day: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @ManyToOne(type => Classes, classes => classes.class_schedule) 
  @JoinColumn({ name: 'class_id' })
  classes: Classes;
 
}

export default ClassesSchedule;
